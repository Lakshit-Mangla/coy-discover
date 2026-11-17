const names = [
  "Avery", "Jordan", "Riya", "Mateo", "Elena", "Sam", "Priya", "Noah",
  "Isla", "Leo", "Mia", "Kabir", "Zoe", "Ethan", "Ananya", "Lucas",
  "Harper", "Dev", "Chloe", "Arjun", "Maya", "Finn", "Nina", "Owen",
  "Tara", "Jay", "Lily", "Rohan", "Sofia", "Kai",
];

const cities = [
  "UC Berkeley", "NYU", "Ashoka University", "Stanford", "Delhi University",
  "University of Michigan", "IIT Bombay", "UCLA", "University of Toronto",
  "BITS Pilani",
];

const interestsPool = [
  "hiking", "indie music", "cooking", "photography", "startups", "chess",
  "yoga", "sci-fi novels", "coffee", "stand-up comedy", "basketball",
  "painting", "travel", "board games", "dogs", "running", "film",
  "poetry", "cycling", "rock climbing",
];

function pick(arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function buildProfiles() {
  return names.map((name, i) => {
    const id = i + 1;
    return {
      id,
      name,
      age: 19 + (i % 10),
      photo: `https://i.pravatar.cc/500?img=${(i % 70) + 1}`,
      bio: `${pick(["Probably", "Usually", "Often", "Lowkey"], 1)[0]} overthinking my ${pick(interestsPool, 1)[0]} playlist.`,
      location: cities[i % cities.length],
      interests: pick(interestsPool, 3),
      // some profiles have already liked the logged-in user, so matches
      // can happen live during a demo once the user swipes right on them
      likedMe: [2, 5, 9, 13, 18, 22, 27].includes(id),
    };
  });
}

module.exports = { buildProfiles };
