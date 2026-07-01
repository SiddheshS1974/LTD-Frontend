import { useState, useEffect } from "react";
import "./Step1.css";
import "./Information.css";
import { openProtectedFile } from "./protectedFile";

const sections = [
  {
    id: "license",
    icon: "card_membership",
    title: "License Registration",
    desc: "Steps to complete after passing your state license exam.",
    docs: [
      {
        title: "License Registration Process",
        subtitle: "Steps to apply for license after passing the state exam",
        slug: "license-registration-process",
      },
      {
        title: "Setting up SureLC",
        subtitle: "Steps to add your license in the back office",
        slug: "setup-surelc",
      },
      {
        title: "How to Apply for Non-Resident License",
        subtitle: "Steps to apply for a non-resident license from Sircon",
        slug: "non-resident-license",
      },
    ],
  },
  {
    id: "trainings",
    icon: "school",
    title: "Product Trainings",
    desc: "Complete these steps after receiving appointments with the companies.",
    docs: [
      {
        title: "Athene Product Trainings",
        subtitle: "Follow the steps to complete Athene product trainings",
        slug: "athene-product-training",
      },
      {
        title: "Best Interest Annuity Suitability",
        subtitle: "Required before submitting annuity applications",
        slug: "annuity-suitability",
        badge: "Required",
        badgeColor: "amber",
      },
      {
        title: "North American IUL Product Training",
        subtitle: "Follow the steps to complete North American IUL product trainings",
        slug: "na-iul-training",
      },
      {
        title: "Nationwide-Annexus Annuity Product Training",
        subtitle: "Follow the steps to complete Nationwide/Annexus product training",
        slug: "nationwide-annexus-training",
      },
    ],
  },
];

function SetupDocCard({ doc }) {
  const [opening, setOpening] = useState(false);
  return (
    <div
      className="setup-doc-card"
      role="button"
      tabIndex={0}
      style={{ cursor: opening ? "wait" : "pointer" }}
      onClick={() => openProtectedFile(doc.slug, setOpening)}
      onKeyDown={(e) => e.key === "Enter" && openProtectedFile(doc.slug, setOpening)}
    >
      <span className="material-icons info-doc-icon">description</span>
      <div className="setup-doc-text">
        <span className="setup-doc-title">{doc.title}</span>
        <span className="setup-doc-subtitle">{doc.subtitle}</span>
      </div>
      {doc.badge && (
        <span className={`setup-doc-badge setup-doc-badge--${doc.badgeColor}`}>{doc.badge}</span>
      )}
      <span className="material-icons info-doc-open">
        {opening ? "hourglass_empty" : "open_in_new"}
      </span>
    </div>
  );
}

export default function Setups() {
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
          <span className="step-number-badge">More</span>
          <h1 className="step-title">Setups</h1>
          <p className="step-subtitle">
            License registration, back office setup, and product training guides.
          </p>
        </div>
      </header>

      <main className="info-main">
        {sections.map((section) => (
          <section key={section.id} className="ro-section">
            <div className="ro-section-header">
              <div className="ro-type-icon-wrap">
                <span className="material-icons">{section.icon}</span>
              </div>
              <div>
                <h2 className="ro-section-title">{section.title}</h2>
                <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.2rem 0 0" }}>{section.desc}</p>
              </div>
            </div>

            <div className="info-docs">
              {section.docs.map((doc) => (
                <SetupDocCard key={doc.slug} doc={doc} />
              ))}
            </div>
          </section>
        ))}

        <div className="info-disclaimer">
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
