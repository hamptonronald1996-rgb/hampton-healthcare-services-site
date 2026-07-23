import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const coreFields = new Set([
  "type", "full_name", "phone", "email", "service_needed",
  "preferred_start_date", "experience", "certifications", "message"
]);

function clean(value, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body || {};
    if (!clean(body.full_name) || !clean(body.phone)) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const details = Object.entries(body)
      .filter(([key, value]) => !coreFields.has(key) && value !== "" && value !== false && key !== "resume_data")
      .map(([key, value]) => `${key.replaceAll("_", " ")}: ${clean(value, 1000)}`);

    if (body.resume_name && body.resume_data) {
      const resumeData = clean(body.resume_data, 700000);
      if (!resumeData.startsWith("data:")) return res.status(400).json({ error: "Invalid resume attachment" });
      details.push(`resume name: ${clean(body.resume_name, 200)}`);
      details.push(`resume attachment: ${resumeData}`);
    }

    const originalMessage = clean(body.message, 6000);
    const message = details.length
      ? `${originalMessage}\n\n--- SUBMISSION DETAILS ---\n${details.join("\n")}`
      : originalMessage;

    const payload = {
      type: clean(body.type || "care_request", 50),
      full_name: clean(body.full_name, 200),
      phone: clean(body.phone, 100),
      email: clean(body.email, 300),
      service_needed: clean(body.service_needed, 500),
      preferred_start_date: clean(body.preferred_start_date, 100),
      experience: clean(body.experience, 1000),
      certifications: clean(body.certifications, 1000),
      message
    };

    const { error } = await supabase.from("submissions").insert(payload);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
