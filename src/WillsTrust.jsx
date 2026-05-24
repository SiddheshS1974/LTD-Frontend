import { useEffect } from "react";
import "./Step1.css";
import "./WillsTrust.css";

const presentations = [
  {
    id: "1Q4N5PsyNG6mx_w6Tnx3k6hhrE9au1siY",
    title: "Estate Planning",
    desc: "Covers Wills, Trusts, Power of Attorney, HIPAA Authorization, and Living Will — following the law of the land.",
    icon: "gavel",
  },
  {
    id: "1beBOGXJSltAtuQlRnIQpI5TX7HKZqC4J",
    title: "Estate Planning — Nominee Roles",
    desc: "Detailed breakdown of Executor, Trustee, and Guardian duties for estate planning clients.",
    icon: "manage_accounts",
  },
];

const concepts = [
  { icon: "description",      title: "Will",                  desc: "Legal document directing how assets are distributed and who cares for minor children." },
  { icon: "account_tree",     title: "Trust",                 desc: "Holds assets for beneficiaries, bypasses probate, and maintains privacy." },
  { icon: "edit_note",        title: "Power of Attorney",     desc: "Authorizes a trusted person to handle your finances if you become incapacitated." },
  { icon: "health_and_safety",title: "Health Care Surrogate", desc: "Names someone to make healthcare decisions if you are unable to do so yourself." },
  { icon: "lock_person",      title: "HIPAA Authorization",   desc: "Grants a designated person access to your protected medical information." },
  { icon: "volunteer_activism",title: "Living Will",          desc: "Documents your wishes for end-of-life medical care and treatment preferences." },
];

export default function WillsTrust() {
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
          <h1 className="step-title">Wills &amp; Trust</h1>
          <p className="step-subtitle">
            Estate planning protects your family, bypasses probate, and ensures
            your wishes are followed. Use these resources to educate and guide
            your clients.
          </p>
        </div>
      </header>

      <main className="wt-main">

        {/* ── Key Concepts ── */}
        <section className="wt-section">
          <div className="wt-section-header">
            <span className="material-icons wt-section-icon">auto_stories</span>
            <h2 className="wt-section-title">Key Concepts</h2>
          </div>
          <div className="wt-concepts-grid">
            {concepts.map((c) => (
              <div key={c.title} className="wt-concept-card">
                <span className="material-icons wt-concept-icon">{c.icon}</span>
                <div>
                  <p className="wt-concept-title">{c.title}</p>
                  <p className="wt-concept-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Presentations ── */}
        <section className="wt-section">
          <div className="wt-section-header">
            <span className="material-icons wt-section-icon">slideshow</span>
            <h2 className="wt-section-title">Presentations</h2>
          </div>
          <div className="wt-cards-grid">
            {presentations.map((p) => (
              <div key={p.id} className="wt-pres-card">
                <div className="wt-iframe-clip">
                  <iframe
                    src={`https://drive.google.com/file/d/${p.id}/preview`}
                    title={p.title}
                    className="wt-drive-iframe"
                    allow="autoplay"
                  />
                </div>
                <div className="wt-pres-body">
                  <div className="wt-pres-tag">
                    <span className="material-icons">{p.icon}</span>
                    {p.title}
                  </div>
                  <p className="wt-pres-desc">{p.desc}</p>
                  <a
                    href={`https://drive.google.com/file/d/${p.id}/view`}
                    target="_blank"
                    rel="noreferrer"
                    className="wt-open-btn"
                  >
                    <span className="material-icons">open_in_new</span>
                    Open Full Screen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
