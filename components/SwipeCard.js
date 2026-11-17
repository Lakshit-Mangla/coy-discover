import { motion, useMotionValue, useTransform } from "framer-motion";

const cardVariants = {
  // exit direction comes from AnimatePresence's `custom` prop, so the card
  // flies right on like and left on pass (also when the buttons are used)
  exit: (dir) => ({
    x: dir === "like" ? 500 : -500,
    rotate: dir === "like" ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export default function SwipeCard({ profile, onSwiped, isTop, zIndex, exitDir }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);

  function handleDragEnd(_, info) {
    if (info.offset.x > 120) {
      onSwiped(profile.id, "like");
    } else if (info.offset.x < -120) {
      onSwiped(profile.id, "pass");
    }
  }

  return (
    <motion.div
      className="profile-card"
      style={{ x, rotate, zIndex }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.6 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10, opacity: isTop ? 1 : 0.6 }}
      variants={cardVariants}
      custom={exitDir}
      exit="exit"
    >
      {isTop && (
        <>
          <motion.div className="swipe-stamp stamp-like" style={{ opacity: likeOpacity }}>
            LIKE
          </motion.div>
          <motion.div className="swipe-stamp stamp-pass" style={{ opacity: passOpacity }}>
            PASS
          </motion.div>
        </>
      )}
      <img src={profile.photo} alt={profile.name} draggable={false} />
      <div className="profile-info">
        <h2>
          {profile.name}, {profile.age}
        </h2>
        <div className="location">{profile.location}</div>
        <div className="bio">{profile.bio}</div>
        <div className="interests">
          {profile.interests.map((i) => (
            <span className="interest-chip" key={i}>
              {i}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
