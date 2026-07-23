import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body || {};

    const payload = {
      type: body.type || "care_request",
      full_name: body.full_name || "",
      phone: body.phone || "",
      email: body.email || "",
      service_needed: body.service_needed || "",
      preferred_start_date: body.preferred_start_date || "",
      experience: body.experience || "",
      certifications: body.certifications || "",
      message: body.message || ""
    };

    const { error } = await supabase.from("submissions").insert(payload);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
