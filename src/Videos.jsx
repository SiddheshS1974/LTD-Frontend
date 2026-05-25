import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Step1.css";

const pages = {
  "/videos/illustrations": {
    badge: "Solutions Videos",
    title: "Illustrations",
    subtitle: "Step-by-step illustration videos to support your presentations.",
    icon: "auto_stories",
  },
  "/videos/application": {
    badge: "Solutions Videos",
    title: "Application",
    subtitle: "Walkthroughs for completing and submitting applications correctly.",
    icon: "app_registration",
  },
  "/videos/stories": {
    badge: "Solutions Videos",
    title: "Stories",
    subtitle: "Client success stories and testimonials to use in your business.",
    icon: "menu_book",
  },
};

export default function Videos() {
  const { pathname } = useLocation();
  const page = pages[pathname] ?? pages["/videos/illustrations"];

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
