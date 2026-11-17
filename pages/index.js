import { useState } from "react";
import DiscoverTab from "../components/DiscoverTab";

export default function Home() {
  const [tab, setTab] = useState("discover");

  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>Coy</h1>
      </div>

      <div className="tab-content">
        {tab === "home" ? (
          <div className="home-placeholder">
            <p>Home tab — placeholder.</p>
          </div>
        ) : (
          <DiscoverTab />
        )}
      </div>

      <div className="tab-bar">
        <button
          className={tab === "home" ? "active" : ""}
          onClick={() => setTab("home")}
        >
          Home
        </button>
        <button
          className={tab === "discover" ? "active" : ""}
          onClick={() => setTab("discover")}
        >
          Discover
        </button>
      </div>
    </div>
  );
}
