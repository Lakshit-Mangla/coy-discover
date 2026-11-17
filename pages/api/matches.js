const { read } = require("../../lib/db");

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const db = read();

  const matches = db.matches
    .map((m) => {
      const profile = db.profiles.find((p) => p.id === m.profileId);
      if (!profile) return null;
      const { likedMe, ...safeProfile } = profile;
      return { ...safeProfile, matchedAt: m.matchedAt };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.matchedAt) - new Date(a.matchedAt));

  res.status(200).json({ matches });
}
