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

      <main className="step-content">
        <div className="step-section-label">
          <span className="material-icons step-section-icon">ondemand_video</span>
          Pretik's Early Retirement
        </div>
        <div style={{ width: "100%", maxWidth: "720px" }}>
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://www.youtube.com/embed/EvmpIpbNjQU"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="Pretik's Early Retirement"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
}
