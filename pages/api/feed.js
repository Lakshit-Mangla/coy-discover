const { read } = require("../../lib/db");

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const db = read();
  const swipedIds = new Set(db.swipes.map((s) => s.profileId));

  // never reveal who has liked the user — strip likedMe before sending
  const feed = db.profiles
    .filter((p) => !swipedIds.has(p.id))
    .map(({ likedMe, ...rest }) => rest);

  res.status(200).json({ profiles: feed });
}
