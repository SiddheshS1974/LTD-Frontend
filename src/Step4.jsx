import { useState, useEffect } from "react";
import "./Step1.css";
import "./Brochures.css";
import { openProtectedFile } from "./protectedFile";
import { hasTabAccess } from "./pageAccess";

const flsResources = [
  { title: "Financial Needs Analysis Excel Sheet Template", description: "Put data from Financial Needs Analysis pdf in this spreadsheet", slug: "fna-excel-sheet" },
  { title: "Financial Lifestyle Strategy Client Presentation", description: "Use for presenting the Financial Lifestyle Strategy to client", slug: "fls-presentation" },
  { title: "Saving vs Investing", description: "Use to compare saving and investing in IUL", slug: "saving-vs-investing" },
  { title: "Tax Calculation for 401K Overfunding", description: "Use if client is investing more than company match in 401K to show how and why to diversify in IUL", slug: "tax-401k-overfunding" },
];

function FlsCard({ item }) {
  const [opening, setOpening] = useState(false);
  return (
    <div className="brochure-card">
      <div className="brochure-preview-wrap" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#9ca3af", background: "#f9f6f3" }}>
        <span className="material-icons" style={{ fontSize: 48 }}>description</span>
        <span style={{ fontSize: "0.8rem", textAlign: "center", padding: "0 1rem" }}>{item.title}</span>
      </div>
      <div className="brochure-card-body fls-card-body">
        <div className="fls-card-text">
          <p className="brochure-card-title">{item.title}</p>
          <p className="brochure-card-desc">{item.description}</p>
        </div>
        <button className="brochure-open-btn" disabled={opening} onClick={() => openProtectedFile(item.slug, setOpening)}>
          <span className="material-icons">open_in_new</span>
          {opening ? "Opening…" : "Open"}
        </button>
      </div>
    </div>
  );
}

export default function Step4() {
  const canFna = hasTabAccess("/step4#fna");
  const canFls = hasTabAccess("/step4#fls");
  const canBusiness = hasTabAccess("/step4#business");
  const [activeTab, setActiveTab] = useState(
    canFna ? "fna" : canFls ? "fls" : "business"
  );

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
          <h1 className="step-title">Follow Up</h1>
          <p className="step-subtitle">
            Consistent follow-up is what separates average producers from top performers.
          </p>
        </div>
      </header>

      <main className="step-content">

        <div className="step-tabs">
          {canFna && (
            <button
              className={`step-tab ${activeTab === "fna" ? "active" : ""}`}
              onClick={() => setActiveTab("fna")}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>assignment</span>
              FNA
            </button>
          )}
          {canFls && (
            <button
              className={`step-tab ${activeTab === "fls" ? "active" : ""}`}
              onClick={() => setActiveTab("fls")}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>trending_up</span>
              FLS
            </button>
          )}
          {canBusiness && (
            <button
              className={`step-tab ${activeTab === "business" ? "active" : ""}`}
              onClick={() => setActiveTab("business")}
            >
              <span className="material-icons" style={{ fontSize: 18 }}>handshake</span>
              Business
            </button>
          )}
        </div>

        {activeTab === "fna" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>assignment</span>
            <p>FNA content coming soon.</p>
          </div>
        )}

        {activeTab === "fls" && (
          <>
            <div className="step-section-label">
              <span className="material-icons step-section-icon">folder_open</span>
              FLS Resources
            </div>
            <div className="brochure-grid" style={{ maxWidth: "960px", width: "100%" }}>
              {flsResources.map((item) => (
                <FlsCard key={item.slug} item={item} />
              ))}
            </div>

            <div className="step-section-label" style={{ marginTop: "2rem" }}>
              <span className="material-icons step-section-icon">ondemand_video</span>
              Training Video
            </div>
            <div style={{ width: "100%", maxWidth: "720px" }}>
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1196162123?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="FLS Training Video"
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "business" && (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>handshake</span>
            <p>Business content coming soon.</p>
          </div>
        )}

      </main>
    </div>
  );
}
