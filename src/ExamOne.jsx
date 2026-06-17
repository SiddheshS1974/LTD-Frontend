import { useEffect } from "react";
import "./Step1.css";
import "./ExamOne.css";
import imgRegister from "./assets/examone-register.png";
import imgCreateCase from "./assets/examone-create-case.png";
import imgAIG from "./assets/examone-aig.png";
import imgAllianz from "./assets/examone-allianz.png";
import imgNorthAmerican from "./assets/examone-northamerican.png";

const companies = [
  "American General Life and Accident",
  "North American Company for Life and Health",
  "Allianz Life",
];

const selections = [
  {
    carrier: "AIG",
    tag: "AIG",
    tagColor: "blue",
    note: 'Add the following in the Other Notes field for AIG: "Please complete Part B application for AIG"',
    noteIcon: "edit_note",
  },
  {
    carrier: "Allianz",
    tag: "Allianz",
    tagColor: "purple",
    note: null,
  },
  {
    carrier: "North American Company",
    tag: "North American",
    tagColor: "green",
    note: null,
  },
];

const selectionImages = [imgAIG, imgAllianz, imgNorthAmerican];

export default function ExamOne() {
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
          <span className="step-number-badge">ExamOne</span>
          <h1 className="step-title">ExamOne Guide</h1>
          <p className="step-subtitle">
            How to register, sign up, and order medical exam cases on ExamOne.
          </p>
        </div>
      </header>

      <main className="eo-main">

        {/* ── Login ── */}
        <section className="eo-section">
          <div className="eo-section-header">
            <div className="eo-icon-wrap">
              <span className="material-icons">login</span>
            </div>
            <h2 className="eo-section-title">ExamOne Login</h2>
          </div>
          <a
            href="https://www.examone.com"
            target="_blank"
            rel="noopener noreferrer"
            className="eo-action-btn"
          >
            <span className="material-icons" style={{ fontSize: 17 }}>open_in_new</span>
            Go to ExamOne
          </a>
        </section>

        {/* ── Register / Signup ── */}
        <section className="eo-section">
          <div className="eo-section-header">
            <div className="eo-icon-wrap">
              <span className="material-icons">app_registration</span>
            </div>
            <h2 className="eo-section-title">Registering &amp; Signing Up</h2>
          </div>

          {/* Company */}
          <div className="eo-field-block">
            <p className="eo-field-label">
              <span className="material-icons eo-field-icon">business</span>
              Company
            </p>
            <p className="eo-field-desc">
              In the <strong>Company</strong> search field, type the full company name exactly as shown below — partial names may not return the correct result.
            </p>
            <div className="eo-company-list">
              {companies.map((c, i) => (
                <div key={i} className="eo-company-chip">
                  <span className="eo-company-num">{i + 1}</span>
                  <span className="eo-company-name">{c}</span>
                </div>
              ))}
            </div>
            <img src={imgRegister} alt="Register/Signup form" className="eo-screenshot" />
          </div>

          {/* Agency */}
          <div className="eo-field-block">
            <p className="eo-field-label">
              <span className="material-icons eo-field-icon">domain</span>
              Agency
            </p>
            <div className="eo-field-callout eo-field-callout--muted">
              <span className="material-icons" style={{ fontSize: 17, color: "#9ca3af", flexShrink: 0 }}>block</span>
              <span>Leave this field <strong>blank</strong>.</span>
            </div>
          </div>

          {/* Agent Code */}
          <div className="eo-field-block">
            <p className="eo-field-label">
              <span className="material-icons eo-field-icon">badge</span>
              Agent Code
            </p>
            <div className="eo-field-callout">
              <span className="material-icons" style={{ fontSize: 17, color: "#8b6340", flexShrink: 0 }}>info</span>
              <span>
                This is your <strong>HGI code</strong>. Log in to HGI and find it under{" "}
                <strong>Account Info</strong>.
              </span>
            </div>
          </div>
        </section>

        {/* ── Ordering New Case ── */}
        <section className="eo-section">
          <div className="eo-section-header">
            <div className="eo-icon-wrap">
              <span className="material-icons">add_circle_outline</span>
            </div>
            <h2 className="eo-section-title">Ordering a New Case</h2>
          </div>
          <div className="eo-field-callout">
            <span className="material-icons" style={{ fontSize: 17, color: "#8b6340", flexShrink: 0 }}>touch_app</span>
            <span>
              Click <strong>Create Case</strong> to open the new case form.
            </span>
          </div>
          <img src={imgCreateCase} alt="Create Case form" className="eo-screenshot" />
        </section>

        {/* ── Selections ── */}
        <section className="eo-section">
          <div className="eo-section-header">
            <div className="eo-icon-wrap">
              <span className="material-icons">checklist</span>
            </div>
            <h2 className="eo-section-title">Selections by Carrier</h2>
          </div>

          <div className="eo-callout-note">
            <span className="material-icons" style={{ fontSize: 17, color: "#8b6340", flexShrink: 0, marginTop: 1 }}>lightbulb</span>
            <span>
              The selections below work for most applications, but they may change based on the specific application
              or the insurance company's request. Adjust accordingly.
            </span>
          </div>

          <div className="eo-carriers">
            {selections.map((sel, i) => (
              <div key={sel.carrier} className="eo-carrier-card">
                <div className="eo-carrier-header">
                  <span className="eo-carrier-name">{sel.carrier}</span>
                  <span className={`eo-tag eo-tag--${sel.tagColor}`}>{sel.tag}</span>
                </div>

                <img src={selectionImages[i]} alt={`${sel.carrier} selections`} className="eo-screenshot" />

                {sel.note && (
                  <div className="eo-carrier-note">
                    <span className="material-icons" style={{ fontSize: 17, color: "#8b6340", flexShrink: 0, marginTop: 1 }}>{sel.noteIcon}</span>
                    <span>{sel.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="eo-disclaimer">
          <span className="material-icons" style={{ fontSize: 17, color: "#9ca3af", flexShrink: 0, marginTop: 1 }}>policy</span>
          <span>
            These templates do not provide any tax or legal advice. The details shown are strictly for
            educational purposes only and should not be treated as a recommendation or any tax/legal advice.
            The concepts explained are hypothetical in nature and for illustration purposes only.
          </span>
        </div>

      </main>
    </div>
  );
}
