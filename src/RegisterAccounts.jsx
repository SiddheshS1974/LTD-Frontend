import { useEffect } from "react";
import "./Step1.css";
import "./Information.css";
import { useFileViewer } from "./FileViewerContext";

const carriers = [
  {
    name: "North American Company",
    icon: "account_balance",
    tag: "Life & Annuity",
    tagColor: "blue",
    subtitle: "Steps to register the client's online account with North American Company",
    slug: "register-north-american",
  },
  {
    name: "Athene",
    icon: "business",
    tag: "Annuity",
    tagColor: "amber",
    subtitle: "Steps to register the client's online account with Athene",
    slug: "register-athene",
  },
  {
    name: "Fidelity & Guaranty",
    icon: "verified",
    tag: "F&G",
    tagColor: "green",
    subtitle: "Steps to register the client's online account with Fidelity and Guaranty",
    slug: "register-fg",
  },
];

function CarrierCard({ carrier }) {
  const openFile = useFileViewer();
  return (
    <div
      className="reg-carrier-card"
      role="button"
      tabIndex={0}
      onClick={() => openFile(carrier.slug, carrier.name)}
      onKeyDown={(e) => e.key === "Enter" && openFile(carrier.slug, carrier.name)}
    >
      <div className="reg-carrier-icon-wrap">
        <span className="material-icons">{carrier.icon}</span>
      </div>
      <div className="setup-doc-text">
        <div className="reg-carrier-top">
          <span className="setup-doc-title">{carrier.name}</span>
          <span className={`setup-doc-badge setup-doc-badge--${carrier.tagColor}`}>{carrier.tag}</span>
        </div>
        <span className="setup-doc-subtitle">{carrier.subtitle}</span>
      </div>
      <span className="material-icons info-doc-open">open_in_new</span>
    </div>
  );
}

export default function RegisterAccounts() {
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
          <h1 className="step-title">Register Accounts</h1>
          <p className="step-subtitle">
            Send these steps to your client after their policies are issued so they can create their online account.
          </p>
        </div>
      </header>

      <main className="info-main">

        <div className="ro-section">
          <div className="ro-section-header">
            <div className="ro-type-icon-wrap">
              <span className="material-icons">how_to_reg</span>
            </div>
            <h2 className="ro-section-title">Client Account Registration</h2>
          </div>

          <div className="info-callout">
            <span className="material-icons info-callout-icon">send</span>
            <span>
              Once a policy is issued, send the relevant document below to your client so they can set up their online account with the carrier.
            </span>
          </div>

          <div className="info-docs">
            {carriers.map((carrier) => (
              <CarrierCard key={carrier.slug} carrier={carrier} />
            ))}
          </div>
        </div>

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
