import { useEffect } from "react";
import "./Step1.css";
import "./Rollovers.css";

const companies = [
  {
    name: "Athene",
    icon: "business",
    tag: "Annuity",
    tagColor: "blue",
    subject: "401K Rollover Application Approved",
    body: [
      { type: "para", text: "Hi (Client)," },
      { type: "para", text: "Your 401K rollover application is approved!!" },
      { type: "para", text: "Here is what you will need to do for your 401K rollover." },
      { type: "para", text: "Call your custodian and let them know you are ROLLING OVER your 401K and to send the check with following details:" },
      { type: "detail", label: "Check made to", value: "Athene Annuity and Life Company" },
      { type: "detail", label: "Memo", value: "FBO (Client FirstName) (Client LastName) (Policy Number)" },
      { type: "detail", label: "Mailing Address", value: "7700 Mills Civic Parkway, West Des Moines, IA, 50266-3862" },
      { type: "para", text: "Let me know if you have any questions." },
      { type: "para", text: "I will call you today evening." },
    ],
  },
  {
    name: "Fidelity & Guaranty",
    icon: "account_balance",
    tag: "F&G",
    tagColor: "green",
    subject: "401K Rollover Application Approved",
    body: [
      { type: "para", text: "Hi (Client)," },
      { type: "para", text: "Your 401K rollover application is approved!!" },
      { type: "para", text: "Here is what you will need to do for your 401K rollover." },
      { type: "para", text: "Call your custodian and let them know you are ROLLING OVER your 401K and to send the check with following details:" },
      { type: "detail", label: "Check made to", value: "F&G Annuities and Life" },
      { type: "detail", label: "Memo", value: "FBO (Client FirstName) (Client LastName) (Policy Number)" },
      { type: "detail", label: "Mailing Address (Overnight)", value: "F&G Annuity and Life, 777, Research Dr. Lincoln, NE 68521" },
      { type: "detail", label: "Mailing Address (Regular)", value: "F&G Annuity and Life, PO BOX 81497, Lincoln, NE 68501" },
      { type: "para", text: "Let me know if you have any questions." },
      { type: "para", text: "I will call you today evening." },
    ],
  },
  {
    name: "Nationwide",
    icon: "public",
    tag: "Insurance",
    tagColor: "amber",
    subject: "401K Rollover Application Approved",
    body: [
      { type: "para", text: "Hi (Client)," },
      { type: "para", text: "Your application is approved!!" },
      { type: "para", text: "Call your custodian and let them know you are ROLLING OVER your 401K/IRA and to send the check with following details:" },
      { type: "detail", label: "Check made to", value: "Nationwide FBO <Client Name>" },
      { type: "detail", label: "Memo", value: "Contract #" },
      { type: "detail", label: "Mailing Address", value: "Nationwide Financial\nPO Box # 182021, Columbus, OH 43218" },
      { type: "para", text: "Let me know if you have any questions." },
      { type: "para", text: "I will call you today evening." },
    ],
  },
];

export default function Rollovers() {
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
          <h1 className="step-title">Rollovers</h1>
          <p className="step-subtitle">
            Once suitability is approved, email your client the relevant details below based on their annuity provider.
          </p>
        </div>
      </header>

      <main className="ro-main">

        <div className="ro-notes">
          <div className="ro-note">
            <span className="material-icons ro-note-icon">info</span>
            <p><strong>Note 1:</strong> This is a sample format. Main thing is the details for the check.</p>
          </div>
          <div className="ro-note">
            <span className="material-icons ro-note-icon">info</span>
            <p><strong>Note 2:</strong> The same info is for cash annuities as well.</p>
          </div>
        </div>

        {companies.map((company) => (
          <section key={company.name} className="ro-section">
            <div className="ro-section-header">
              <div className="ro-type-icon-wrap">
                <span className="material-icons">{company.icon}</span>
              </div>
              <h2 className="ro-section-title">{company.name}</h2>
              <span className={`ro-tag ro-tag--${company.tagColor}`}>{company.tag}</span>
            </div>

            <div className="ro-email-card">
              <div className="ro-email-subject-row">
                <span className="ro-email-label">Subject</span>
                <span className="ro-email-subject">{company.subject}</span>
              </div>

              <div className="ro-email-body">
                {company.body.map((item, i) =>
                  item.type === "para" ? (
                    <p key={i} className="ro-email-para">{item.text}</p>
                  ) : (
                    <div key={i} className="ro-email-detail">
                      <span className="ro-email-detail-label">{item.label}:</span>
                      <span className="ro-email-detail-value" style={{ whiteSpace: "pre-line" }}>{item.value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        ))}

      </main>
    </div>
  );
}
