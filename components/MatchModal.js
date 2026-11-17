import { motion, AnimatePresence } from "framer-motion";

export default function MatchModal({ profile, onClose, onViewMatches }) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          className="match-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h1>It's a match! 🎉</h1>
          <img src={profile.photo} alt={profile.name} />
          <p>
            You and {profile.name} liked each other.
          </p>
          <div>
            <button onClick={onViewMatches}>View matches</button>
            <button onClick={onClose} style={{ marginLeft: 12, background: "transparent", color: "#fff", border: "2px solid #fff" }}>
              Keep swiping
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
