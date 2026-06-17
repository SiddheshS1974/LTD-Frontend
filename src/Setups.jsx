import { useEffect } from "react";
import "./Step1.css";
import "./Information.css";

const DRIVE_VIEW = (id) => `https://drive.google.com/file/d/${id}/view`;

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
        id: "1ft1bISGL3u3TcmMT13aBNCrbZZt4B_p0",
      },
      {
        title: "Setting up SureLC",
        subtitle: "Steps to add your license in the back office",
        id: "15RkXZUp7YSEboBWv8Io59j0-Q47X1fcB",
      },
      {
        title: "How to Apply for Non-Resident License",
        subtitle: "Steps to apply for a non-resident license from Sircon",
        id: "1H6Pl53OcIPCb4_HIODZL4wYaZ7M9a5LZ",
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
        id: "1LN_fkF4Z_0fkJl0kqQarZk7t03iVBoRZ",
      },
      {
        title: "Best Interest Annuity Suitability",
        subtitle: "Required before submitting annuity applications",
        id: "1LQO6rIvOxiPgBkaw5ftt4LLS8ZL0I5FG",
        badge: "Required",
        badgeColor: "amber",
      },
      {
        title: "North American IUL Product Training",
        subtitle: "Follow the steps to complete North American IUL product trainings",
        id: "1LRT7kUOVGNP7fE0rkME8l-v_x48Z9AU4",
      },
      {
        title: "Nationwide-Annexus Annuity Product Training",
        subtitle: "Follow the steps to complete Nationwide/Annexus product training",
        id: "1LXcKjUkLB2yk-NVxAFN_nVU0jGvSP_rK",
      },
    ],
  },
];

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
                <a
                  key={doc.id}
                  href={DRIVE_VIEW(doc.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="setup-doc-card"
                >
                  <span className="material-icons info-doc-icon">description</span>
                  <div className="setup-doc-text">
                    <span className="setup-doc-title">{doc.title}</span>
                    <span className="setup-doc-subtitle">{doc.subtitle}</span>
                  </div>
                  {doc.badge && (
                    <span className={`setup-doc-badge setup-doc-badge--${doc.badgeColor}`}>{doc.badge}</span>
                  )}
                  <span className="material-icons info-doc-open">open_in_new</span>
                </a>
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
