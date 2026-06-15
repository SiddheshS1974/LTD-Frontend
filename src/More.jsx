import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Step1.css";

const pages = {
  "/more/information": {
    badge: "More",
    title: "Information",
    subtitle: "Reference information and resources.",
    icon: "info",
  },
  "/more/applications": {
    badge: "More",
    title: "Applications & Medical Exams",
    subtitle: "Application guides and medical exam requirements.",
    icon: "assignment",
  },
  "/more/setups": {
    badge: "More",
    title: "Setups",
    subtitle: "Setup guides and configuration resources.",
    icon: "settings",
  },
  "/more/register-accounts": {
    badge: "More",
    title: "Register Accounts",
    subtitle: "Instructions for registering accounts with carriers and platforms.",
    icon: "how_to_reg",
  },
  "/more/address-book": {
    badge: "More",
    title: "Address Book",
    subtitle: "Key contacts, addresses, and carrier information.",
    icon: "contacts",
  },
};

export default function More() {
  const { pathname } = useLocation();
  const page = pages[pathname] ?? pages["/more/information"];

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
          <span className="step-number-badge">{page.badge}</span>
          <h1 className="step-title">{page.title}</h1>
          <p className="step-subtitle">{page.subtitle}</p>
        </div>
      </header>
      <main className="step-content">
        <div className="step-coming-soon">
          <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>{page.icon}</span>
          <p>Content coming soon.</p>
        </div>
      </main>
    </div>
  );
}
