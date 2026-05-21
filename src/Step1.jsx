import { useState, useEffect } from "react";
import "./Step1.css";

export default function Step1() {
  const [activeTab, setActiveTab] = useState("iphone");

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

  // Each step can optionally include an `img` filename (place files in /public/images/)
  const iphoneSteps = [
    {
      n: "01",
      title: "Open Contacts",
      desc: 'Go to your Contacts app, then tap "Lists" in the top left corner.',
      img: "iphone-step1.jpg",
    },
    {
      n: "02",
      title: "Export All Contacts",
      desc: 'Press and hold "All Contacts", then tap "Export" from the menu that appears.',
      img: "iphone-step2.jpg",
    },
    {
      n: "03",
      title: "Select the Right Fields",
      desc: 'Make sure images are NOT checked — this will cause the export to fail. Select only "Names" and "Phone Numbers" (mobile, work, home, etc.).',
      img: "iphone-step3.jpg",
    },
    {
      n: "04",
      title: "Confirm the Export",
      desc: 'Tap "Done" in the top right corner to confirm your selections.',
      img: "iphone-step4.jpg",
    },
    {
      n: "05",
      title: "Send to Your Computer",
      desc: "Choose Gmail or Mail to send the exported file to yourself so it's accessible on your computer.",
      img: "iphone-step5.jpg",
    },
    {
      n: "06",
      title: "Convert the File",
      desc: "The file will be in .VCF format. Search Google for a VCF to CSV converter and convert it to .CSV, .XLS, or .XLSX so it opens as a spreadsheet.",
      img: "iphone-step6.jpg",
    },
  ];

  const androidSteps = [
    {
      n: "01",
      title: "Go to Google Contacts",
      desc: (
        <>
          Open{" "}
          <a href="https://contacts.google.com" target="_blank" rel="noreferrer" className="step-link">
            contacts.google.com
          </a>{" "}
          on your Android device or computer. Make sure you are signed into the correct Google account.
        </>
      ),
      img: "android-step1.png",
    },
    {
      n: "02",
      title: "Click Export",
      desc: 'In the left sidebar, click "Export". On mobile, tap the menu icon first to find it.',
      img: "android-step2.png",
    },
    {
      n: "03",
      title: "Choose CSV Format",
      desc: 'Select any of the CSV options — Google CSV is recommended — then click "Export". Your contacts will download as a spreadsheet-ready file.',
    },
  ];

  const steps = activeTab === "iphone" ? iphoneSteps : androidSteps;

  return (
    <div className="step-page">
      {/* ── Page Header ── */}
      <header className="step-header">
        <div className="step-header-inner">
          <span className="step-number-badge">Step 1 of 6</span>
          <h1 className="step-title">Prospecting &amp; List Building</h1>
          <p className="step-subtitle">
            Your list is the foundation of your business. The larger and more
            intentional your list, the more opportunities you create. Start by
            exporting the contacts already saved on your phone — they are your
            first prospecting pool.
          </p>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="step-content">

        <div className="step-section-label">
          <span className="material-icons step-section-icon">contacts</span>
          Exporting Your Contact List
        </div>
        <p className="step-section-desc">
          The fastest way to build your initial list is to export the contacts
          already saved on your phone. Follow the guide below for your device.
        </p>

        {/* Device tabs */}
        <div className="step-tabs">
          <button
            className={`step-tab ${activeTab === "iphone" ? "active" : ""}`}
            onClick={() => setActiveTab("iphone")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>phone_iphone</span>
            iPhone
          </button>
          <button
            className={`step-tab ${activeTab === "android" ? "active" : ""}`}
            onClick={() => setActiveTab("android")}
          >
            <span className="material-icons" style={{ fontSize: 18 }}>android</span>
            Android
          </button>
        </div>

        {/* Steps */}
        <div className="step-steps-list">
          {steps.map((s) => (
            <div className="step-row" key={s.n}>
              <div className="step-row-number">{s.n}</div>
              <div className="step-row-body">
                <div className="step-row-title">{s.title}</div>
                <div className="step-row-desc">{s.desc}</div>
                {s.img && (
                  <div className="step-img-wrap">
                    <img
                      src={`/images/${s.img}`}
                      alt={s.title}
                      className="step-img"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="step-tip">
          <span className="material-icons step-tip-icon">lightbulb</span>
          <div>
            <strong>Pro Tip:</strong> Once you have your CSV file, open it in
            Excel or Google Sheets and clean it up — remove duplicates, add notes,
            and organize by relationship (family, friends, colleagues, etc.).
            A clean, organized list makes every next step far more effective.
          </div>
        </div>

      </main>
    </div>
  );
}
