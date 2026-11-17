const fs = require("fs");
const path = require("path");
const { buildProfiles } = require("../data/seed");

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function init() {
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      profiles: buildProfiles(),
      swipes: [], // { profileId, action: 'like' | 'pass' }
      matches: [], // { profileId, matchedAt }
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
  }
}

function read() {
  init();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function write(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
