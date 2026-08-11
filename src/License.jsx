import { useState, useEffect } from "react";
import "./Step1.css";
import "./Videos.css";
import { hasTabAccess } from "./pageAccess";

const licensePrepVideos = [
  { title: "Types of Policies 2.0", vimeoId: "1207056144" },
  { title: "Provisions Riders Options 2.0", vimeoId: "1207056182" },
  { title: "Other Concepts 2.0", vimeoId: "1207056242" },
  { title: "Applications, Underwriting and Delivery 2.0", vimeoId: "1207056324" },
  { title: "Annuities 2.0", vimeoId: "1207056374" },
];

function TrainingVideoCard({ v }) {
  return (
    <div className="vid-card">
      <div className="vid-embed">
        <iframe
          src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={v.title}
        />
      </div>
      <div className="vid-title">{v.title}</div>
    </div>
  );
}

export default function License() {
  const role = localStorage.getItem("role");
  const canPrep = role === "Licensed" || hasTabAccess("/license#before");
  const canAfter = role === "Licensed" || hasTabAccess("/license#after");
  const [activeTab, setActiveTab] = useState(canPrep ? "before" : "after");

  useEffect(() => {
    const b = document.body;
    const prev = {
      height: b.style.height, display: b.style.display,
      alignItems: b.style.alignItems, justifyContent: b.style.justifyContent,
      flexDirection: b.style.flexDirection, overflow: b.style.overflow,
    };
    b.style.height = "auto"; b.style.display = "block";
    b.style.alignItems = ""; b.style.justifyContent = "";
    b.style.flexDirection = ""; b.style.overflow = "";
    return () => Object.assign(b.style, prev);
  }, []);

  return (
    <div className="step-page">
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Compliance</span>
          <h1 className="step-title">License</h1>
          <p className="step-subtitle">
            Everything you need before and after getting licensed.
          </p>
        </div>
      </header>

      <main className="step-content">

        <div className="step-tabs">
          {canPrep && (
            <button
              className={`step-tab ${activeTab === "before" ? "active" : ""}`}
              onClick={() => setActiveTab("before")}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>school</span>
              Preparation
            </button>
          )}
          {canAfter && (
            <button
              className={`step-tab ${activeTab === "after" ? "active" : ""}`}
              onClick={() => setActiveTab("after")}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>verified</span>
              After License
            </button>
          )}
        </div>

        {activeTab === "before" && canPrep && (
          <>
            <div className="step-section-label">
              <span className="material-icons step-section-icon">ondemand_video</span>
              Training Videos
            </div>
            <div className="vid-columns fls-vid-columns" style={{ maxWidth: "1100px", width: "100%" }}>
              {licensePrepVideos.map((v) => (
                <TrainingVideoCard key={v.vimeoId} v={v} />
              ))}
            </div>
          </>
        )}

        {activeTab === "after" && canAfter && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>verified</span>
            <p>After License content coming soon.</p>
          </div>
        )}

      </main>
    </div>
  );
}
