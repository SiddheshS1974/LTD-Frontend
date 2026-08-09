import { useEffect } from "react";
import "./Step1.css";
import "./Rollovers.css";
import "./Information.css";
import { useFileViewer } from "./FileViewerContext";

const sections = [
  {
    id: "license",
    icon: "card_membership",
    title: "License Renewal",
    items: [
      {
        type: "text",
        text: "Renew your Georgia insurance continuing education license through BetterCE. This link is Georgia-specific — if you are in another state, use the appropriate state link on the BetterCE site.",
      },
      {
        type: "action",
        label: "Go to BetterCE",
        href: "https://www.betterce.com/georgia-insurance-continuing-education-courses/",
        icon: "open_in_new",
      },
      {
        type: "info",
        icon: "sell",
        text: "Use code happy5 at checkout for $5 off.",
      },
    ],
    docs: [
      { title: "License Registration Process", slug: "license-registration-process" },
      { title: "Applying for Non-Resident License", slug: "non-resident-license" },
    ],
  },
  {
    id: "netlaw",
    icon: "gavel",
    title: "Netlaw",
    items: [
      {
        type: "subheading",
        text: "For Clients",
      },
      {
        type: "text",
        text: "Once your client's nominees list is ready, send them the link below to access Netlaw document preparation services.",
      },
      {
        type: "action",
        label: "Netlaw Client Form",
        href: "https://forms.gle/6HkKXyovbLvqEfFM6",
        icon: "open_in_new",
      },
      {
        type: "subheading",
        text: "For HGI Team Members",
      },
      {
        type: "text",
        text: "To access the Netlaw training video through your HGI account, go to: Account → Business → Product Providers → Netlaw.",
      },
      {
        type: "info",
        icon: "star",
        text: "RMDs: the document below is required reading — it explains how to fill out the form to get clients Netlaw video access.",
      },
    ],
    docs: [
      {
        title: "Form for Netlaw Doc Preparation Video Access (Valued Customer)",
        slug: "netlaw-form",
        badge: "RMD Must Read",
      },
    ],
  },
  {
    id: "ltd-videos",
    icon: "play_circle",
    title: "LTD Videos",
    items: [
      {
        type: "text",
        text: "The document below explains how to get access to and navigate the LTD training video library.",
      },
      {
        type: "info",
        icon: "star",
        text: "RMDs: this document is required reading.",
      },
    ],
    docs: [
      {
        title: "Getting Access to LTD Videos",
        slug: "ltd-videos-access",
        badge: "RMD Must Read",
      },
    ],
  },
  {
    id: "applications",
    icon: "assignment",
    title: "Applications",
    items: [
      {
        type: "text",
        text: "Instructions for getting and submitting application forms for North American and other carriers.",
      },
    ],
    docs: [
      { title: "Getting Forms for Applications — North American", slug: "na-application-forms" },
    ],
  },
  {
    id: "commissions",
    icon: "calculate",
    title: "Commission Calculations",
    items: [
      {
        type: "info",
        icon: "info",
        text: "Back office commission calculations are based on rates effective 12/01/2023.",
      },
    ],
    docs: [
      { title: "Commission Calculations", slug: "commission-calculations" },
    ],
  },
  {
    id: "indexed-contracts",
    icon: "trending_up",
    title: "Power of Indexed Contracts",
    items: [
      {
        type: "disclaimer",
        text: "This information does not provide any tax or legal advice. The details shown are strictly for educational purposes only and should not be treated as a recommendation or any tax/legal advice. The concepts explained are hypothetical in nature and are for illustration purposes only.",
      },
    ],
    docs: [],
  },
];

function InfoDocCard({ doc }) {
  const openFile = useFileViewer();
  return (
    <div
      className="info-doc-card"
      role="button"
      tabIndex={0}
      onClick={() => openFile(doc.slug, doc.title)}
      onKeyDown={(e) => e.key === "Enter" && openFile(doc.slug, doc.title)}
    >
      <span className="material-icons info-doc-icon">description</span>
      <span className="info-doc-title">{doc.title}</span>
      {doc.badge && <span className="info-doc-badge">{doc.badge}</span>}
      <span className="material-icons info-doc-open">open_in_new</span>
    </div>
  );
}

export default function Information() {
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
          <h1 className="step-title">Information</h1>
          <p className="step-subtitle">
            Reference information, resources, and required reading for RMDs.
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
              <h2 className="ro-section-title">{section.title}</h2>
            </div>

            <div className="info-body">
              {section.items.map((item, i) => {
                if (item.type === "subheading") {
                  return (
                    <p key={i} className="info-subheading">{item.text}</p>
                  );
                }
                if (item.type === "text") {
                  return (
                    <p key={i} className="info-text">{item.text}</p>
                  );
                }
                if (item.type === "info") {
                  return (
                    <div key={i} className="info-callout">
                      <span className="material-icons info-callout-icon">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  );
                }
                if (item.type === "disclaimer") {
                  return (
                    <div key={i} className="info-disclaimer">
                      <span className="material-icons info-disclaimer-icon">policy</span>
                      <span>{item.text}</span>
                    </div>
                  );
                }
                if (item.type === "action") {
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="info-action-btn"
                    >
                      <span className="material-icons" style={{ fontSize: 17 }}>{item.icon}</span>
                      {item.label}
                    </a>
                  );
                }
                return null;
              })}

              {section.docs.length > 0 && (
                <div className="info-docs">
                  {section.docs.map((doc) => (
                    <InfoDocCard key={doc.slug} doc={doc} />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
