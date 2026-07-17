import { useState, useEffect } from "react";
import "./Step1.css";

export default function AfterLicenseSetups() {
  const [activeTab, setActiveTab] = useState("setups");

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
          <h1 className="step-title">After License Setups</h1>
          <p className="step-subtitle">
            Everything you need to set up after getting licensed.
          </p>
        </div>
      </header>

      <main className="step-content">

        <div className="step-tabs">
          <button
            className={`step-tab ${activeTab === "setups" ? "active" : ""}`}
            onClick={() => setActiveTab("setups")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>settings</span>
            Setups
          </button>
          <button
            className={`step-tab ${activeTab === "trainings" ? "active" : ""}`}
            onClick={() => setActiveTab("trainings")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>school</span>
            Product Trainings
          </button>
        </div>

        {activeTab === "setups" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>settings</span>
            <p>Setups content coming soon.</p>
          </div>
        )}

        {activeTab === "trainings" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>school</span>
            <p>Product Trainings content coming soon.</p>
          </div>
        )}

      </main>
    </div>
  );
}
