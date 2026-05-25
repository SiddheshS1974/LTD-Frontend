import { useEffect } from "react";
import "./Step1.css";

export default function Step5() {
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
          <h1 className="step-title">Follow Up (Business)</h1>
          <p className="step-subtitle">
            Support your new team members through their first steps and help them get started fast.
          </p>
        </div>
      </header>
      <main className="step-content">
        <div className="step-coming-soon">
          <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>handshake</span>
          <p>Content coming soon.</p>
        </div>
      </main>
    </div>
  );
}
