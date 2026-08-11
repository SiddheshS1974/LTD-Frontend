import { useState, useEffect } from "react";
import "./Step1.css";
import "./Videos.css";

const fastStartVideos = [
  { title: "Filed Builder_  Mindset while doing Fast Start 2.0", vimeoId: "1207094197" },
  { title: "Field Builder_ Why talk about license and 3 3 30 later in Fast Start 2.0", vimeoId: "1207094254" },
  { title: "Field Builder_ Edification and Promotion 2.0", vimeoId: "1207094303" },
  { title: "Field Builder_ Edification & Promotion, EPR, Relationships 2.0", vimeoId: "1207094337" },
  { title: "Field Builder_ Compensation Plan 2.0", vimeoId: "1207094367" },
  { title: "Field Builder_ Active vs Passive &  Keep Small Numbers Small 2.0", vimeoId: "1207094423" },
];

const fastStartTab2Videos = [
  { title: "FIELD BUILDER_ Indices, Index Strategies, Crediting Methods 2.0", vimeoId: "1207092554" },
  { title: "Field Builder_ Athene Agility   Surrender Value 2.0", vimeoId: "1207091223" },
  { title: "FIELD BUILDER_ Annuity 101 - Index Strategies, Crediting Methods 2.0", vimeoId: "1207091525" },
  { title: "FIELD BUILDER_ Annuity - Income Solution - Athene Agility 2.0", vimeoId: "1207091579" },
  { title: "FIELD BUILDER_ Annuity - Charge vs No Charge Indices 2.0", vimeoId: "1207092172" },
  { title: "Field Builder_ Annuities Questions - Taxation of Traditional, ROTH , Cash 2.0", vimeoId: "1207092225" },
  { title: "Field Builder_ Annuities Questions -  IRS RMD and Early Withdrawal Penalties 2.0", vimeoId: "1207092286" },
  { title: "Field Builder_ Annuities Questions -  Immediate income & Surrender Period vs Participation Rate 2.0", vimeoId: "1207092333" },
  { title: "Field Builder_ Annuities - Standard Features + Company Features 2.0", vimeoId: "1207092393" },
  { title: "Netlaw   Creating Documents 2.0", vimeoId: "1207053376" },
];

function TrainingVideoCard({ v }) {
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

export default function FastStart() {
  const [activeTab, setActiveTab] = useState("tab1");

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
          <span className="step-number-badge">Step 5 of 6</span>
          <h1 className="step-title">Fast Start</h1>
          <p className="step-subtitle">
            Everything you need to hit the ground running from day one.
          </p>
        </div>
      </header>

      <main className="step-content">

        <div className="step-tabs">
          <button
            className={`step-tab ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => setActiveTab("tab1")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>rocket_launch</span>
            Tab 1
          </button>
          <button
            className={`step-tab ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => setActiveTab("tab2")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>star</span>
            Tab 2
          </button>
        </div>

        {activeTab === "tab1" && (
          <>
            <div className="step-section-label">
              <span className="material-icons step-section-icon">ondemand_video</span>
              Training Videos
            </div>
            <div className="vid-columns fls-vid-columns" style={{ maxWidth: "1100px", width: "100%" }}>
              {fastStartVideos.map((v) => (
                <TrainingVideoCard key={v.vimeoId} v={v} />
              ))}
            </div>
          </>
        )}

        {activeTab === "tab2" && (
          <>
            <div className="step-section-label">
              <span className="material-icons step-section-icon">ondemand_video</span>
              Training Videos
            </div>
            <div className="vid-columns fls-vid-columns" style={{ maxWidth: "1100px", width: "100%" }}>
              {fastStartTab2Videos.map((v) => (
                <TrainingVideoCard key={v.vimeoId} v={v} />
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}
