import { useEffect } from "react";
import "./Step1.css";
import "./Rollovers.css";

const rolloverTypes = [
  {
    icon: "sync",
    title: "401K Rollover",
    desc: "Move funds from a former employer's 401K into an IRA or new employer plan without tax penalty.",
    tag: "Most Common",
    tagColor: "green",
  },
  {
    icon: "swap_horiz",
    title: "IRA Rollover",
    desc: "Transfer assets between IRAs or from an employer plan into an IRA to consolidate retirement savings.",
    tag: "Flexible",
    tagColor: "blue",
  },
  {
    icon: "currency_exchange",
    title: "Roth Conversion",
    desc: "Convert pre-tax retirement funds into a Roth IRA — pay taxes now for tax-free growth and withdrawals later.",
    tag: "Tax Strategy",
    tagColor: "amber",
  },
  {
    icon: "business_center",
    title: "403(b) Rollover",
    desc: "Roll over funds from a non-profit or school district 403(b) plan when changing employers or retiring.",
    tag: "Non-Profit",
    tagColor: "purple",
  },
];

const reasons = [
  { icon: "lock_open",     text: "Avoid the 10% early withdrawal penalty" },
  { icon: "trending_up",   text: "Maintain tax-deferred or tax-free growth" },
  { icon: "hub",           text: "Consolidate accounts into one place" },
  { icon: "tune",          text: "Gain access to more investment options" },
  { icon: "shield",        text: "Protect assets with better beneficiary options" },
  { icon: "timer",         text: "60-day rule — act fast to avoid taxes" },
];

export default function Rollovers() {
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
          <span className="step-number-badge">Resources</span>
          <h1 className="step-title">Rollovers</h1>
          <p className="step-subtitle">
            Help clients move retirement assets without triggering taxes or
            penalties. Use these resources to explain rollover options and guide
            them to the right solution.
          </p>
        </div>
      </header>

      <main className="ro-main">

        {/* ── Rollover Types ── */}
        <section className="ro-section">
          <div className="ro-section-header">
            <span className="material-icons ro-section-icon">currency_exchange</span>
            <h2 className="ro-section-title">Types of Rollovers</h2>
          </div>
          <div className="ro-types-grid">
            {rolloverTypes.map((r) => (
              <div key={r.title} className="ro-type-card">
                <div className="ro-type-top">
                  <div className="ro-type-icon-wrap">
                    <span className="material-icons">{r.icon}</span>
                  </div>
                  <span className={`ro-tag ro-tag--${r.tagColor}`}>{r.tag}</span>
                </div>
                <p className="ro-type-title">{r.title}</p>
                <p className="ro-type-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Roll Over ── */}
        <section className="ro-section">
          <div className="ro-section-header">
            <span className="material-icons ro-section-icon">help_outline</span>
            <h2 className="ro-section-title">Why Do a Rollover?</h2>
          </div>
          <div className="ro-reasons-grid">
            {reasons.map((r) => (
              <div key={r.text} className="ro-reason">
                <span className="material-icons ro-reason-icon">{r.icon}</span>
                <span className="ro-reason-text">{r.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Resources placeholder ── */}
        <section className="ro-section">
          <div className="ro-section-header">
            <span className="material-icons ro-section-icon">folder_open</span>
            <h2 className="ro-section-title">Resources</h2>
          </div>
          <div className="ro-placeholder">
            <span className="material-icons ro-placeholder-icon">upload_file</span>
            <div>
              <p className="ro-placeholder-title">Add Rollover Resources</p>
              <p className="ro-placeholder-desc">
                Spreadsheets, presentations, and guides for rollover conversations
                will appear here once added.
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
