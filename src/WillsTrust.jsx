import { useEffect } from "react";
import "./Step1.css";
import "./WillsTrust.css";
import { useFileViewer } from "./FileViewerContext";

const steps = [
  {
    number: "01",
    icon: "record_voice_over",
    title: "Invitation",
    content: [
      {
        label: "Direct",
        text: `Have you done your Will and Trust? I am doing mine. I have a close friend (if you are working with a field builder) who helps in the process — or (if you are the one who will help) we have a promotion going on.`,
      },
      {
        label: "Indirect",
        text: `Do you know any of your friends or family who want to do a Will? (Most of the time you will get a response that your friend themselves needs to do the Will.)`,
      },
      {
        label: "Key Points to Share",
        text: `There are 5 important documents that protect your family: Will, Trust, Power of Attorney, HIPAA Authorization, and Medical Directive/Living Will. Attorneys can charge thousands for just a Will. With our promotion, your family (husband and wife included) gets all 5 documents — and we help facilitate the entire process.`,
      },
    ],
    action: "Set up an appointment (date, time, and location)",
  },
  {
    number: "02",
    icon: "event",
    title: "Appointment",
    content: [
      {
        label: "Present",
        text: `Use the Introduction to Estate Planning deck below to go over the details of the different documents needed and the process.`,
      },
      {
        label: "Send Nominees Template",
        text: `Let them know you will be sending a template spreadsheet to add names and roles. It is strongly recommended to have 5–7 key people for Executor, Guardian, and Trustee roles. Executors should ideally be local (city/state/country) with immediate availability. Having key people's photo IDs is recommended to avoid mistakes on names and contact info.`,
      },
      {
        label: "Key Info Needed Per Nominee",
        text: `Full legal name, Date of birth, Address, Phone number, and Email. Note: The same person can hold multiple roles (Executor/Guardian/Trustee). There is no limit on the number of nominees — having more is better since the majority's vote is considered.`,
      },
    ],
    action: "In parallel, book an appointment for the Financial Needs Analysis (FNA)",
  },
  {
    number: "03",
    icon: "group",
    title: "Nominees List Ready",
    content: [
      {
        label: "Group Meetings",
        text: `Set up group meetings with the nominees to help them understand their roles. You may use the Estate Planning — Roles deck below. You may need multiple sessions as not all nominees may be available at the same time.`,
      },
      {
        label: "Tip",
        text: `Explain to nominees why your client is doing a Will and Trust. Some of them may be interested in doing their own — follow the same steps to help them through the process.`,
      },
    ],
    action: null,
  },
  {
    number: "04",
    icon: "description",
    title: "Netlaw Will & Trust Preparation",
    content: [
      {
        label: "For HGI Team Members",
        text: `You can watch the tutorial video anytime by logging into your HGI account → Business → Product Providers → Netlaw → watch "Netlaw Legacy Demonstration". You do NOT need to fill any form.`,
      },
      {
        label: "For Clients",
        text: `Once the client's nominees list is ready, send them the link below to fill out the Google form and get access to the video that shows how to create the documents. The client will receive the Netlaw Code and Invited By info via email from Netlaw to create their account.`,
      },
    ],
    action: null,
    link: { label: "Client Google Form — Get Netlaw Access", url: "https://forms.gle/6HkKXyovbLvqEfFM6" },
  },
  {
    number: "05",
    icon: "handshake",
    title: "Close Sale / Recruit",
    content: [
      {
        label: "Close",
        text: `Complete their Financial Lifestyle Strategy (FLS) and close the sale.`,
      },
      {
        label: "Recruit",
        text: `"Wasn't this information valuable? Don't you have better peace of mind — you can sleep peacefully now? How many people would love to have this information? Our mission is to get this information into as many hands as possible. I am looking for more hands. If there is a way where I can teach you what I do and we can share profits, is that something you would like to know?"`,
      },
    ],
    action: "Book a BOP appointment if they say Yes",
  },
];

const resources = [
  {
    slug: "estate-planning-intro",
    title: "Introduction to Estate Planning",
    desc: "First presentation to show the client. Explains the need and facets of Estate Planning. After showing this: book an FNA session and send the Nominees Template.",
    icon: "slideshow",
    type: "presentation",
  },
  {
    slug: "estate-planning-roles",
    title: "Estate Planning — Roles",
    desc: "Explains the responsibilities of different nominee roles (Executor, Trustee, Guardian) to use in group meetings with nominees.",
    icon: "manage_accounts",
    type: "presentation",
  },
];

function WtPresCard({ p }) {
  const openFile = useFileViewer();
  return (
    <div className="wt-pres-card">
      <div className="wt-iframe-clip" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#9ca3af", background: "#f9f6f3" }}>
        <span className="material-icons" style={{ fontSize: 48 }}>slideshow</span>
        <span style={{ fontSize: "0.8rem", textAlign: "center", padding: "0 1rem" }}>{p.title}</span>
      </div>
      <div className="wt-pres-body">
        <div className="wt-pres-tag">
          <span className="material-icons">{p.icon}</span>
          {p.title}
        </div>
        <p className="wt-pres-desc">{p.desc}</p>
        <button
          className="wt-open-btn"
          onClick={() => openFile(p.slug, p.title)}
        >
          <span className="material-icons">open_in_new</span>
          Open Full Screen
        </button>
      </div>
    </div>
  );
}

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
            Help families protect what matters most through proper estate planning.
          </p>
        </div>
      </header>

      <main className="wt-main">

        {/* ── Disclaimer ── */}
        <div className="wt-disclaimer">
          <span className="material-icons wt-disclaimer-icon">info</span>
          <p><strong>Important Note:</strong> In your communication, let them know that you are not a CPA, attorney, lawyer, or tax consultant. You are going to help them in the process and will connect them to the right sources.</p>
        </div>

        {/* ── Process Steps ── */}
        <section className="wt-section">
          <div className="wt-section-header">
            <span className="material-icons wt-section-icon">linear_scale</span>
            <h2 className="wt-section-title">The Process</h2>
          </div>

          <div className="wt-steps-list">
            {steps.map((step) => (
              <div key={step.number} className="wt-step">
                <div className="wt-step-left">
                  <div className="wt-step-badge">{step.number}</div>
                  <div className="wt-step-line" />
                </div>
                <div className="wt-step-body">
                  <div className="wt-step-title-row">
                    <span className="material-icons wt-step-icon">{step.icon}</span>
                    <h3 className="wt-step-title">{step.title}</h3>
                  </div>
                  <div className="wt-step-content">
                    {step.content.map((c) => (
                      <div key={c.label} className="wt-step-item">
                        <span className="wt-step-label">{c.label}</span>
                        <p className="wt-step-text">{c.text}</p>
                      </div>
                    ))}
                    {step.link && (
                      <a href={step.link.url} target="_blank" rel="noreferrer" className="wt-form-btn">
                        <span className="material-icons">open_in_new</span>
                        {step.link.label}
                      </a>
                    )}
                  </div>
                  {step.action && (
                    <div className="wt-step-action">
                      <span className="material-icons">arrow_circle_right</span>
                      {step.action}
                    </div>
                  )}
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
            {resources.map((p) => (
              <WtPresCard key={p.slug} p={p} />
            ))}
          </div>
        </section>

        {/* ── Additional Resources ── */}
        <section className="wt-section">
          <div className="wt-section-header">
            <span className="material-icons wt-section-icon">folder_open</span>
            <h2 className="wt-section-title">Additional Resources</h2>
          </div>
          <div className="wt-resources-grid">
            <div className="wt-resource-card">
              <span className="material-icons wt-resource-icon">table_chart</span>
              <div className="wt-resource-info">
                <p className="wt-resource-title">Nominees Template</p>
                <p className="wt-resource-desc">Send this spreadsheet to the client to build their list of nominees and roles.</p>
              </div>
            </div>
            <div className="wt-resource-card">
              <span className="material-icons wt-resource-icon">play_circle</span>
              <div className="wt-resource-info">
                <p className="wt-resource-title">Step by Step Video</p>
                <p className="wt-resource-desc">HGI Members: log into HGI account → Business → Product Providers → Netlaw → "Netlaw Legacy Demonstration". Clients: use the Google form in Step 4 above.</p>
              </div>
            </div>
            <div className="wt-resource-card">
              <span className="material-icons wt-resource-icon">article</span>
              <div className="wt-resource-info">
                <p className="wt-resource-title">Netlaw Estate Planning Brochure</p>
                <p className="wt-resource-desc">Netlaw Estate Planning Brochure — coming soon.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
