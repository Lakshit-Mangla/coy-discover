const { read, write } = require("../../lib/db");

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { profileId, action } = req.body || {};

  if (!profileId || !["like", "pass"].includes(action)) {
    return res.status(400).json({ error: "profileId and valid action are required" });
  }

  const db = read();
  const profile = db.profiles.find((p) => p.id === profileId);

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  const alreadySwiped = db.swipes.some((s) => s.profileId === profileId);
  if (alreadySwiped) {
    return res.status(409).json({ error: "Already swiped on this profile" });
  }

  db.swipes.push({ profileId, action });

  let isMatch = false;
  if (action === "like" && profile.likedMe) {
    const alreadyMatched = db.matches.some((m) => m.profileId === profileId);
    if (!alreadyMatched) {
      db.matches.push({ profileId, matchedAt: new Date().toISOString() });
    }
    isMatch = true;
  }

  write(db);

  const { likedMe, ...safeProfile } = profile;
  res.status(200).json({ match: isMatch, profile: safeProfile });
}
