import { useState, useEffect } from "react";
import "./Step1.css";
import "./Step6.css";

const bopPresentations = [
  {
    id: "1rfoaufbnE5_UhyxBcYdy3EGaprMGgk1t",
    title: "BOP US",
    desc: "Business Opportunity Presentation. Show this to clients who are interested in joining the business.",
    icon: "business_center",
  },
];

const otherPresentations = [
  {
    id: "1Wx3ZsSr8uLdt55ZWYkCeByGIzh-6rcdk",
    title: "Financial Literacy & Estate Planning",
    desc: "In-person group session presentation covering financial literacy and estate planning concepts.",
    icon: "account_balance",
  },
  {
    id: "17TJ1jJezCmUrxpaEemOCl4TYILCYeXtb",
    title: "Retirement Calculations",
    desc: "Spreadsheet for retirement calculations. Walk clients through the numbers to illustrate their retirement gap.",
    icon: "savings",
  },
];

export default function Step6() {
  const [presTab, setPresTab] = useState("bop");

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

  const activePresentations = presTab === "bop" ? bopPresentations : otherPresentations;

  return (
    <div className="step-page">
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Step 6 of 6</span>
          <h1 className="step-title">Miscellaneous</h1>
          <p className="step-subtitle">
            Additional tools, comparisons, and helpful resources to support
            your client conversations and financial planning.
          </p>
        </div>
      </header>

      <main className="s6-main">

        {/* ── Presentations ── */}
        <section className="s6-section">
          <div className="s6-section-header">
            <span className="material-icons s6-section-icon">slideshow</span>
            <h2 className="s6-section-title">Presentations</h2>
          </div>

          {/* Segmented tab switcher */}
          <div className="s6-seg">
            <button
              className={`s6-seg-btn ${presTab === "bop" ? "s6-seg-btn--active" : ""}`}
              onClick={() => setPresTab("bop")}
            >
              BOP
            </button>
            <button
              className={`s6-seg-btn ${presTab === "other" ? "s6-seg-btn--active" : ""}`}
              onClick={() => setPresTab("other")}
            >
              SOP
            </button>
          </div>

          <div className="s6-cards-grid">
            {activePresentations.map((p) => (
              <div key={p.id} className="s6-pres-card">
                <div className="s6-iframe-clip">
                  <iframe
                    src={`https://drive.google.com/file/d/${p.id}/preview`}
                    title={p.title}
                    className="s6-drive-iframe"
                    allow="autoplay"
                  />
                </div>
                <div className="s6-pres-body">
                  <div className="s6-pres-tag">
                    <span className="material-icons">{p.icon}</span>
                    {p.title}
                  </div>
                  <p className="s6-pres-desc">{p.desc}</p>
                  <a
                    href={`https://drive.google.com/file/d/${p.id}/view`}
                    target="_blank"
                    rel="noreferrer"
                    className="s6-open-btn"
                  >
                    <span className="material-icons">open_in_new</span>
                    Open Full Screen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
