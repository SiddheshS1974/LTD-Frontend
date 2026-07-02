import { useState, useEffect } from "react";
import "./Step1.css";

export default function FastStart() {
  const [activeTab, setActiveTab] = useState("tab1");

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
          <span className="step-number-badge">Step 5 of 6</span>
          <h1 className="step-title">Fast Start</h1>
          <p className="step-subtitle">
            Everything you need to hit the ground running from day one.
          </p>
        </div>
      </header>

      <main className="step-content">

        <div className="step-tabs">
          <button
            className={`step-tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>rocket_launch</span>
            Tab 1
          </button>
          <button
            className={`step-tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>star</span>
            Tab 2
          </button>
        </div>

        <div className="step-coming-soon">
          <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>rocket_launch</span>
          <p>Fast Start content coming soon.</p>
        </div>

      </main>
    </div>
  );
}
