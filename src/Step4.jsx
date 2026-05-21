import { useEffect } from "react";
import "./Step1.css";

export default function Step4() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

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
      {/* ── Page Header ── */}
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Step 4 of 6</span>
          <h1 className="step-title">Follow Up (FLS)</h1>
          <p className="step-subtitle">
            Consistent follow-up is what separates average producers from top
            performers. Watch the video below to learn the FLS follow-up system.
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="step-content">
        <div className="step-section-label">
          <span className="material-icons step-section-icon">ondemand_video</span>
          Training Video
        </div>

        <div style={{ width: "100%", maxWidth: "720px" }}>
          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/1068276039?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              title="BOP US Feb 2025"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
