import { useEffect } from "react";
import "./Step1.css";
import "./Brochures.css";

const flsResources = [
  {
    title: "Financial Needs Analysis Excel Sheet Template",
    description: "Put data from Financial Needs Analysis pdf in this spreadsheet",
    driveId: "1enc58SIxXWacwrp5N4pVg7xoD0GgFMOC",
  },
  {
    title: "Financial Lifestyle Strategy Client Presentation",
    description: "Use for presenting the Financial Lifestyle Strategy to client",
    driveId: "1M4FXBYugvdutO-9yqUSYpKuPJUvGp0CX",
  },
  {
    title: "Saving vs Investing",
    description: "Use to compare saving and investing in IUL",
    driveId: "1P4ORFiviz6WdJZb8qP7F7iCx5VZGD--w",
  },
  {
    title: "Tax Calculation for 401K Overfunding",
    description: "Use if client is investing more than company match in 401K to show how and why to diversify in IUL",
    driveId: "1P4d56XfCpxhVMtFX9iWExYUvADseK0Qg",
  },
];

function FlsCard({ item }) {
  const previewUrl = `https://drive.google.com/file/d/${item.driveId}/preview`;
  const viewUrl    = `https://drive.google.com/file/d/${item.driveId}/view`;
  return (
    <div className="brochure-card">
      <div className="brochure-preview-wrap">
        <iframe
          src={previewUrl}
          title={item.title}
          className="brochure-iframe"
          allow="autoplay"
        />
        <div className="brochure-preview-overlay" />
      </div>
      <div className="brochure-card-body fls-card-body">
        <div className="fls-card-text">
          <p className="brochure-card-title">{item.title}</p>
          <p className="brochure-card-desc">{item.description}</p>
        </div>
        <a className="brochure-open-btn" href={viewUrl} target="_blank" rel="noreferrer">
          <span className="material-icons">open_in_new</span>
          Open
        </a>
      </div>
    </div>
  );
}

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
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Step 4 of 6</span>
          <h1 className="step-title">Follow Up (FLS)</h1>
          <p className="step-subtitle">
            Consistent follow-up is what separates average producers from top
            performers. Use the resources below and watch the training video.
          </p>
        </div>
      </header>

      <main className="step-content">
        <div className="step-section-label">
          <span className="material-icons step-section-icon">folder_open</span>
          FLS Resources
        </div>

        <div className="brochure-grid" style={{ maxWidth: "960px", width: "100%" }}>
          {flsResources.map((item) => (
            <FlsCard key={item.driveId} item={item} />
          ))}
        </div>

        <div className="step-section-label" style={{ marginTop: "2rem" }}>
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
