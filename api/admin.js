import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const META = "\n\n---HAMPTON_WORKFLOW---\n";

function authorized(req) {
  const bearer = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const legacy = req.headers["x-admin-password"] || "";
  const expected = process.env.ADMIN_ACCESS_TOKEN || process.env.ADMIN_PASSWORD;
  return Boolean(expected && (bearer === expected || legacy === expected));
}

function parseMessage(value = "") {
  const index = value.lastIndexOf(META);
  const defaults = { status: "New", notes: "", follow_up: "", assigned_to: "" };
  if (index < 0) return { message: value, workflow: defaults };
  try {
    return { message: value.slice(0, index), workflow: { ...defaults, ...JSON.parse(value.slice(index + META.length)) } };
  } catch {
    return { message: value.slice(0, index), workflow: defaults };
  }
}

export default async function handler(req, res) {
  if (!authorized(req)) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false }).limit(500);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ submissions: (data || []).map(row => ({ ...row, ...parseMessage(row.message) })) });
  }

  if (req.method === "PATCH") {
    const { id, status, notes, follow_up, assigned_to } = req.body || {};
    if (!id) return res.status(400).json({ error: "Missing submission id" });
    const { data: current, error: readError } = await supabase.from("submissions").select("message").eq("id", id).single();
    if (readError) return res.status(500).json({ error: readError.message });
    const parsed = parseMessage(current.message || "");
    const workflow = {
      ...parsed.workflow,
      status: status || parsed.workflow.status,
      notes: notes ?? parsed.workflow.notes,
      follow_up: follow_up ?? parsed.workflow.follow_up,
      assigned_to: assigned_to ?? parsed.workflow.assigned_to,
      updated_at: new Date().toISOString()
    };
    const { error } = await supabase.from("submissions").update({ message: `${parsed.message}${META}${JSON.stringify(workflow)}` }).eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, workflow });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
