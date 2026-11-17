# Coy — Discover Tab

A standalone Next.js app with a tab bar (`Home` placeholder + `Discover`), built as a
swipe-based discovery feature for the Coy SDE intern assignment.

## Stack
- Next.js (React, pages router) — frontend + backend in one app, mobile-first CSS
- API routes (`pages/api/*`) act as the Express-style backend
- `data/db.json` (auto-created on first run) as the persistence layer — no external DB needed
- `framer-motion` for the drag-to-swipe gestures and card animations

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. A fresh `data/db.json` with 30 seeded profiles is created
automatically on first request. Seven of those profiles are flagged internally as having
already liked you, so swiping right on them produces an instant match for the demo
(this flag is never sent to the client — see `pages/api/feed.js`).

## API
- `GET /feed` — profiles not yet swiped on (strips any "liked me" info — never leaked)
- `POST /swipe` — body `{ profileId, action: "like" | "pass" }`; records the swipe,
  returns `{ match, profile }`; rejects swiping the same profile twice
- `GET /matches` — mutual matches, newest first

(Also reachable under `/api/feed`, `/api/swipe`, `/api/matches` — `next.config.js` rewrites the short paths to the Next.js API routes.)

All state lives in `data/db.json`, so swipes/matches survive page reloads and server restarts.

## Push to a public GitHub repo
```bash
cd coy-discover
git init
git add .
git commit -m "Coy Discover tab"
gh repo create coy-discover --public --source=. --remote=origin --push
# or, without the gh CLI:
# git remote add origin https://github.com/<you>/coy-discover.git
# git branch -M main
# git push -u origin main
```

## Notes / design decisions
- Photos are placeholder avatars from `i.pravatar.cc`.
- The match flag (`likedMe`) is stored server-side only and stripped from every API
  response until a mutual like turns it into an actual match — per Coy's core promise,
  nobody ever sees who liked them unless it's mutual.
- `Home` tab is intentionally left blank per the assignment (Coy's existing app owns that).
