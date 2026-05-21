import { useState, useEffect } from "react";
import "./Step1.css";
import "./Brochures.css";

const companyInfo = [
  { title: "4Q 2025 Top 20 Annuity Sales Rankings", file: "4Q 2025 Top 20 Annuity Sales Rankings.pdf" },
  { title: "2022 Nationwide Annual Report",          file: "2022-Nationwide-Annual-Report.pdf" },
  { title: "F&G Financial Strength",                 file: "FG Financial Strength.pdf" },
  { title: "Athene",                                 file: "Athene.pdf" },
  { title: "AIG L&R Strengths Flyer 2022",           file: "AIG LR strengths flyer 2022.pdf" },
  { title: "North American Strength & Stability",    file: "North American 339NM Strength and Stability Flyer.pdf" },
];

const solutionsConcepts = [
  { title: "North American IUL Confidence Flyer", file: "North American IUL Confidence Flyer.pdf" },
  { title: "Sequence of Returns Flyer",           file: "Sequence of returns flyer.pdf" },
  { title: "Bear Markets Flyer",                  file: "Bear Markets Flyer.pdf" },
  { title: "Break Even Burden",                   file: "Break Even Burden.pdf" },
];

export default function Brochures() {
  const [activeTab, setActiveTab] = useState("company");

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

  const currentList   = activeTab === "company" ? companyInfo : solutionsConcepts;
  const currentFolder = activeTab === "company" ? "company-info" : "solutions-concepts";

  return (
    <div className="step-page">
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Resources</span>
          <h1 className="step-title">Brochures</h1>
          <p className="step-subtitle">
            Browse company information and solutions materials to support your business.
          </p>
        </div>
      </header>

      <main className="step-content" style={{ maxWidth: "960px" }}>
        <div className="step-tabs" style={{ width: "100%" }}>
          <button
            className={`step-tab ${activeTab === "company" ? "active" : ""}`}
            onClick={() => setActiveTab("company")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>business</span>
            Company Info
          </button>
          <button
            className={`step-tab ${activeTab === "solutions" ? "active" : ""}`}
            onClick={() => setActiveTab("solutions")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>lightbulb</span>
            Solutions &amp; Concepts
          </button>
        </div>

        <div className="brochure-grid">
          {currentList.map((b) => {
            const src = `/brochures/${currentFolder}/${encodeURIComponent(b.file)}`;
            return (
              <div key={b.file} className="brochure-card">
                <div className="brochure-preview-wrap">
                  <iframe
                    src={`${src}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title={b.title}
                    className="brochure-iframe"
                  />
                  <div className="brochure-preview-overlay" />
                </div>
                <div className="brochure-card-body">
                  <p className="brochure-card-title">{b.title}</p>
                  <a
                    className="brochure-open-btn"
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="material-icons">open_in_new</span>
                    Open
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
