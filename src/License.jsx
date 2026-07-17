import { useState, useEffect } from "react";
import "./Step1.css";

export default function License() {
  const [activeTab, setActiveTab] = useState("before");

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
          <button
            className={`step-tab ${activeTab === "before" ? "active" : ""}`}
            onClick={() => setActiveTab("before")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>school</span>
            Preparation
          </button>
          <button
            className={`step-tab ${activeTab === "after" ? "active" : ""}`}
            onClick={() => setActiveTab("after")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>verified</span>
            After License
          </button>
        </div>

        {activeTab === "before" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>school</span>
            <p>Before License content coming soon.</p>
          </div>
        )}

        {activeTab === "after" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>verified</span>
            <p>After License content coming soon.</p>
          </div>
        )}

      </main>
    </div>
  );
}
