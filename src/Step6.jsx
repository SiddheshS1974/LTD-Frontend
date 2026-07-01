import { useState, useEffect } from "react";
import "./Step1.css";
import "./Step6.css";
import { useProtectedBlobUrl, openProtectedFile } from "./protectedFile";

const presentations = [
  {
    slug: "financial-literacy-presentation",
    title: "Effect of Economy",
    desc: "Shows the effects of an economic downturn on various financial vehicles.",
    icon: "show_chart",
  },
  {
    slug: "comparisons",
    title: "Comparisons",
    desc: "Compares features of different financial vehicles to show the value of diversification.",
    icon: "compare_arrows",
  },
];

function PresCard({ p }) {
  const { blobUrl, loading, error } = useProtectedBlobUrl(p.slug);
  const [opening, setOpening] = useState(false);

  return (
    <div className="s6-pres-card">
      <div className="s6-iframe-clip">
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, color: "#9ca3af" }}>
            <span className="material-icons" style={{ fontSize: 36 }}>hourglass_empty</span>
            <span style={{ fontSize: "0.8rem" }}>Loading preview…</span>
          </div>
        )}
        {error && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 8, color: "#9ca3af" }}>
            <span className="material-icons" style={{ fontSize: 36 }}>error_outline</span>
            <span style={{ fontSize: "0.8rem" }}>Preview unavailable</span>
          </div>
        )}
        {blobUrl && (
          <iframe
            src={blobUrl}
            title={p.title}
            className="s6-drive-iframe"
            allow="autoplay"
          />
        )}
      </div>
      <div className="s6-pres-body">
        <div className="s6-pres-tag">
          <span className="material-icons">{p.icon}</span>
          {p.title}
        </div>
        <p className="s6-pres-desc">{p.desc}</p>
        <button
          className="s6-open-btn"
          disabled={opening}
          onClick={() => openProtectedFile(p.slug, setOpening)}
        >
          <span className="material-icons">open_in_new</span>
          {opening ? "Opening…" : "Open Full Screen"}
        </button>
      </div>
    </div>
  );
}

export default function Step6() {
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
          <span className="step-number-badge">Step 6 of 6</span>
          <h1 className="step-title">Miscellaneous</h1>
          <p className="step-subtitle">
            Additional tools, comparisons, and helpful resources to support
            your client conversations and financial planning.
          </p>
        </div>
      </header>

      <main className="s6-main">
        <section className="s6-section">
          <div className="s6-section-header">
            <span className="material-icons s6-section-icon">slideshow</span>
            <h2 className="s6-section-title">Presentations</h2>
          </div>
          <div className="s6-cards-grid">
            {presentations.map((p) => (
              <PresCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
