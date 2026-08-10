import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Step1.css";
import "./Videos.css";

const pages = {
  "/videos/illustrations": {
    badge: "Solutions Videos",
    title: "Illustrations",
    subtitle: "Step-by-step illustration videos to support your presentations.",
    icon: "auto_stories",
    groups: [
      {
        label: "North American",
        icon: "account_balance",
        videos: [
          { title: "Term Illustration Steps 2.0", vimeoId: "1207053833" },
          { title: "REVISED Illustration Steps 2.0", vimeoId: "1207053985" },
          { title: "IUL Illustration Steps in Welis", vimeoId: "1213722075" },
          { title: "Protection Builder Illustration Steps in Welis", vimeoId: "1213722074" },
        ],
      },
      {
        label: "Athene",
        icon: "business",
        videos: [
          { title: "Performance Elite Annuity Illustration Steps 2.0", vimeoId: "1207054318" },
          { title: "Agility Annuity Illustration Steps 2.0", vimeoId: "1207054364" },
        ],
      },
      {
        label: "Nationwide / Annexus",
        icon: "trending_up",
        videos: [
          { title: "New Heights IUL Illustration Steps 2.0", vimeoId: "1207054146" },
          { title: "New Heights Select Annuity Illustration Steps 2.0", vimeoId: "1207054478" },
        ],
      },
      {
        label: "General",
        icon: "calculate",
        videos: [
          { title: "Calculating Death Benefit for Illustrations 2.0", vimeoId: "1207054235" },
        ],
      },
      {
        label: "AIG",
        icon: "verified",
        videos: [
          { title: "Term Illustration Steps 2.0", vimeoId: "1207054527" },
        ],
      },
    ],
  },
  "/videos/application": {
    badge: "Solutions Videos",
    title: "Application",
    subtitle: "Walkthroughs for completing and submitting applications correctly.",
    icon: "app_registration",
    groups: [],
  },
  "/videos/stories": {
    badge: "Solutions Videos",
    title: "Stories",
    subtitle: "Client success stories and testimonials to use in your business.",
    icon: "menu_book",
    groups: [],
  },
};

function VideoCard({ v }) {
  return (
    <div className="vid-card">
      <div className="vid-embed">
        <iframe
          src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title={v.title}
        />
      </div>
      <div className="vid-title">{v.title}</div>
    </div>
  );
}

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
      <main className="step-content vid-content">
        {page.groups.length > 0 ? (
          page.groups.map((group) => (
            <section key={group.label} className="vid-group">
              <div className="vid-group-header">
                <span className="material-icons vid-group-icon">{group.icon}</span>
                <h2 className="vid-group-title">{group.label}</h2>
                <span className="vid-group-count">{group.videos.length}</span>
              </div>
              <div className="vid-grid">
                {group.videos.map((v) => (
                  <VideoCard key={v.vimeoId} v={v} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="step-coming-soon">
            <span className="material-icons" style={{ fontSize: 48, color: "#d8c4ae" }}>{page.icon}</span>
            <p>Content coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
