// GET /api/slots?startDate=<epoch ms>&endDate=<epoch ms>
// Returns live FREE slots only. No names, no booking details.

const GHL_BASE = "https://services.leadconnectorhq.com";
const CALENDAR_ID = "pbnZlteuNymd7g52uqJ3";
const ALLOW_ORIGIN = "https://book.glowaestheticslab.com";
const TIMEZONE = "Europe/London";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!process.env.GHL_TOKEN) return res.status(500).json({ error: "GHL_TOKEN missing" });

  try {
    const startDate = String(req.query.startDate || "").trim();
    const endDate = String(req.query.endDate || "").trim();
    if (!startDate || !endDate) return res.status(400).json({ error: "startDate and endDate required" });

  const url = `${GHL_BASE}/calendars/${CALENDAR_ID}/free-slots` +
    `?startDate=${encodeURIComponent(startDate)}` +
    `&endDate=${encodeURIComponent(endDate)}` +
    `&timezone=${encodeURIComponent(TIMEZONE)}`;

  const r = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GHL_TOKEN}`,
      Version: "2021-04-15",
      "Content-Type": "application/json",
    },
  });

  const data = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json({ error: "GHL rejected", detail: data });

  const clean = {};
    for (const key of Object.keys(data)) {
      const entry = data[key];
      if (entry && Array.isArray(entry.slots)) clean[key] = entry.slots;
    }

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ ok: true, days: clean });
  } catch (e) {
    return res.status(500).json({ error: "Server error", detail: String(e) });
  }
};
