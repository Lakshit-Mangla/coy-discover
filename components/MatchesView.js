export default function MatchesView({ matches, onBack }) {
  return (
    <div className="matches-list">
      <div className="discover-header">
        <h2 style={{ fontSize: 18 }}>Your matches</h2>
        <button className="link-btn" onClick={onBack}>
          Back
        </button>
      </div>
      {matches.length === 0 ? (
        <div className="empty-state">
          <p>No matches yet. Keep swiping — someone out there already liked you.</p>
        </div>
      ) : (
        matches.map((m) => (
          <div className="match-row" key={m.id}>
            <img src={m.photo} alt={m.name} />
            <div>
              <div className="name">
                {m.name}, {m.age}
              </div>
              <div className="sub">{m.location}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
