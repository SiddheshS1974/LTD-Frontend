import { useState, useEffect } from "react";
import "./Step3.css";
import { useFileViewer } from "./FileViewerContext";
import { hasTabAccess } from "./pageAccess";

const bopPresentations = [
  {
    id: "bop",
    icon: "business_center",
    tag: "Feb 2025",
    tagType: "bop",
    title: "BOP US",
    subtitle: "Business Opportunity Presentation",
    color: "maroon",
    audience: "Clients interested in business opportunity",
    description:
      "Show this presentation to clients who are interested in the business opportunity.",
    nextStep:
      "Book a follow-up to answer their questions and help them start their venture. If they ultimately do not want to start their venture, lead them to their Financial Needs Analysis so they have clarity about their finances.",
    slug: "bop-presentation",
    fileType: "Presentation",
  },
];

const bopVideos = [
  { title: "BOP US Feb 2025 2.0", vimeoId: "1207052996" },
  { title: "Certification Questions during BOP 2.0", vimeoId: "1207052905" },
];

const sopPresentations = [
  {
    id: "finlit",
    icon: "account_balance",
    tag: "Jan 2025",
    tagType: "finlit",
    title: "Financial Literacy & Estate Planning",
    subtitle: "In-Person Group Session",
    color: "rose",
    audience: "In-person group session attendees",
    description:
      "Show this in an in-person group session to educate attendees on financial literacy and estate planning concepts.",
    nextStep:
      "After the presentation, take the FNA and book individual appointments to show them the FLS. After FLS and submitting the applications (if any), ask them about the business.",
    slug: "financial-literacy-presentation",
    fileType: "Presentation",
  },
  {
    id: "retirement",
    icon: "savings",
    tag: "Spreadsheet",
    tagType: "sheet",
    title: "Retirement Calculations",
    subtitle: "Retirement Planning Tool",
    color: "amber",
    audience: "Used during Retirement Planning slide",
    description:
      "Spreadsheet for retirement calculations used on the Retirement Planning slide. Walk clients through the numbers to illustrate their retirement gap.",
    nextStep: null,
    slug: "retirement-calculations",
    fileType: "Spreadsheet",
  },
];

export default function Step3() {
  const canBop = hasTabAccess("/step3#bop");
  const canSop = hasTabAccess("/step3#sop");
  const [activeTab, setActiveTab] = useState(canBop ? "bop" : "sop");
  const openFile = useFileViewer();
  const presentations = activeTab === "bop" ? bopPresentations : sopPresentations;

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

      {/* Header */}
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Step 3 of 6</span>
          <h1 className="step-title">Presentation</h1>
          <p className="step-subtitle">
            Use the right presentation for the right audience.
            Each deck has a clear purpose, a defined next step, and a direct link
            to the file so you are always ready to show and tell.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="s3-content">

        {/* Stat pills */}
        <div className="s3-stats">
          <div className="s3-stat">
            <span className="material-icons s3-stat-icon">slideshow</span>
            <div>
              <div className="s3-stat-num">2</div>
              <div className="s3-stat-label">Presentations</div>
            </div>
          </div>
          <div className="s3-stat">
            <span className="material-icons s3-stat-icon">table_chart</span>
            <div>
              <div className="s3-stat-num">1</div>
              <div className="s3-stat-label">Spreadsheet</div>
            </div>
          </div>
          <div className="s3-stat">
            <span className="material-icons s3-stat-icon">arrow_forward</span>
            <div>
              <div className="s3-stat-num">2</div>
              <div className="s3-stat-label">Defined Next Steps</div>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="s3-seg">
          {canBop && (
            <button
              className={`s3-seg-btn ${activeTab === "bop" ? "s3-seg-btn--active" : ""}`}
              onClick={() => setActiveTab("bop")}
            >
              BOP
            </button>
          )}
          {canSop && (
            <button
              className={`s3-seg-btn ${activeTab === "sop" ? "s3-seg-btn--active" : ""}`}
              onClick={() => setActiveTab("sop")}
            >
              SOP
            </button>
          )}
        </div>

        {/* Presentation cards */}
        <div className="s3-cards">
          {presentations.map((p) => (
            <div key={p.id} className={`s3-card s3-card--${p.color}`}>

              {/* Card top */}
              <div className="s3-card-top">
                <div className={`s3-icon-wrap s3-icon-wrap--${p.color}`}>
                  <span className="material-icons">{p.icon}</span>
                </div>
                <div className="s3-card-meta">
                  <span className={`s3-tag s3-tag--${p.tagType}`}>{p.tag}</span>
                  <div className="s3-file-badge">
                    <span className="material-icons s3-file-icon">
                      {p.fileType === "Spreadsheet" ? "table_chart" : "slideshow"}
                    </span>
                    {p.fileType}
                  </div>
                </div>
              </div>

              {/* Card title */}
              <h2 className="s3-card-title">{p.title}</h2>
              <p className="s3-card-subtitle">{p.subtitle}</p>

              {/* Audience pill */}
              <div className="s3-audience">
                <span className="material-icons s3-audience-icon">group</span>
                {p.audience}
              </div>

              {/* Description */}
              <p className="s3-description">{p.description}</p>

              {/* Next Step */}
              {p.nextStep && (
                <div className="s3-nextstep">
                  <div className="s3-nextstep-label">
                    <span className="material-icons s3-nextstep-icon">arrow_circle_right</span>
                    Next Step
                  </div>
                  <p className="s3-nextstep-text">{p.nextStep}</p>
                </div>
              )}

              {/* Divider */}
              <div className="s3-divider" />

              {/* Open button */}
              <button
                className={`s3-open-btn s3-open-btn--${p.color}`}
                onClick={() => openFile(p.slug, p.title)}
              >
                <span className="material-icons s3-btn-icon">open_in_new</span>
                Open Presentation
              </button>

            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="step-tip">
          <span className="material-icons step-tip-icon">lightbulb</span>
          <div>
            <strong>Pro Tip:</strong> Always know your next step before you start the
            presentation — so when it ends, you move forward with confidence instead of
            asking "so what do you think?"
          </div>
        </div>

        {/* Videos section */}
        {activeTab === "bop" && <section className="s3-videos-section">
          <div className="s3-videos-header">
            <span className="material-icons s3-videos-header-icon">ondemand_video</span>
            <div>
              <h2 className="s3-videos-title">Training Videos</h2>
              <p className="s3-videos-subtitle">Step-by-step video walkthroughs for the BOP presentation.</p>
            </div>
          </div>

          <div className="s3-video-grid">
            {bopVideos.map((v) => (
              <div key={v.vimeoId} className="s3-video-card">
                <div className="s3-video-embed">
                  <iframe
                    src={`https://player.vimeo.com/video/${v.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title={v.title}
                  />
                </div>
                <div className="s3-video-info">
                  <div className="s3-video-slot">{v.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>}

      </main>
    </div>
  );
}
