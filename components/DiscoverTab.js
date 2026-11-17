import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "./SwipeCard";
import MatchModal from "./MatchModal";
import MatchesView from "./MatchesView";

export default function DiscoverTab() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showMatches, setShowMatches] = useState(false);
  const [matches, setMatches] = useState([]);
  const [lastAction, setLastAction] = useState("pass");

  useEffect(() => {
    loadFeed();
  }, []);

  async function loadFeed() {
    setLoading(true);
    const res = await fetch("/feed");
    const data = await res.json();
    setProfiles(data.profiles);
    setLoading(false);
  }

  async function loadMatches() {
    const res = await fetch("/matches");
    const data = await res.json();
    setMatches(data.matches);
  }

  async function handleSwipe(profileId, action) {
    // remember direction so the card exits the right way
    setLastAction(action);
    // optimistically remove from the stack
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));

    const res = await fetch("/swipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, action }),
    });
    const data = await res.json();

    if (data.match) {
      setMatchedProfile(data.profile);
    }
  }

  function openMatches() {
    loadMatches();
    setMatchedProfile(null);
    setShowMatches(true);
  }

  if (showMatches) {
    return (
      <MatchesView
        matches={matches}
        onBack={() => setShowMatches(false)}
      />
    );
  }

  return (
    <div className="discover-root">
      <div className="discover-header">
        <span />
        <button
          className="link-btn"
          onClick={() => {
            loadMatches();
            setShowMatches(true);
          }}
        >
          Matches
        </button>
      </div>

      <div className="card-stack">
        {loading ? (
          <p>Loading profiles…</p>
        ) : profiles.length === 0 ? (
          <div className="empty-state">
            <p>You're all caught up! No new profiles right now — check back later.</p>
          </div>
        ) : (
          <AnimatePresence custom={lastAction}>
            {profiles
              .slice(0, 3)
              .reverse()
              .map((p, idx, arr) => (
                <SwipeCard
                  key={p.id}
                  profile={p}
                  isTop={idx === arr.length - 1}
                  zIndex={idx}
                  onSwiped={handleSwipe}
                  exitDir={lastAction}
                />
              ))}
          </AnimatePresence>
        )}

        {!loading && profiles.length > 0 && (
          <div className="swipe-buttons">
            <button
              className="swipe-btn pass"
              onClick={() => handleSwipe(profiles[0].id, "pass")}
            >
              ✕
            </button>
            <button
              className="swipe-btn like"
              onClick={() => handleSwipe(profiles[0].id, "like")}
            >
              ♥
            </button>
          </div>
        )}
      </div>

      <MatchModal
        profile={matchedProfile}
        onClose={() => setMatchedProfile(null)}
        onViewMatches={openMatches}
      />
    </div>
  );
}
