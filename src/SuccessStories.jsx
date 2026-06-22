import { useEffect } from "react";
import "./Step1.css";

export default function SuccessStories() {
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
          <span className="step-number-badge">Inspiration</span>
          <h1 className="step-title">Success Stories</h1>
          <p className="step-subtitle">
            Coming soon — fliers highlighting key leaders in the team: their
            background, business achievements, and future aspirations.
          </p>
        </div>
      </header>

      <main className="step-content" />
    </div>
  );
}
