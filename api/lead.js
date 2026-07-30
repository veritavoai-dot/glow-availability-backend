// POST /api/lead
// Body: { firstName, email, phone }
// Creates or updates the GHL contact and adds the "availability-checker" tag.
// Token is read from the GHL_TOKEN environment variable. Never hard code it.

const GHL_BASE = "https://services.leadconnectorhq.com";
const LOCATION_ID = "feH5QoBPNoNPAqoOpizU";
const ALLOW_ORIGIN = "https://book.glowaestheticslab.com";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.GHL_TOKEN) {
    return res.status(500).json({ error: "Server not configured. GHL_TOKEN is missing." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const firstName = String(body.firstName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();

    if (!firstName || !email || !phone) {
      return res.status(400).json({ error: "Please provide first name, email and phone." });
    }

    const r = await fetch(`${GHL_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_TOKEN}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: LOCATION_ID,
        firstName: firstName,
        email: email,
        phone: phone,
        tags: ["availability-checker"],
        source: "Availability Checker widget",
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(r.status).json({ error: "GHL rejected the contact", detail: data });
    }

    return res.status(200).json({ ok: true, contactId: data && data.contact ? data.contact.id : null });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e) });
  }
};
