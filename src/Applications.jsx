import { useEffect } from "react";
import "./Step1.css";
import "./Applications.css";

const applicantGroups = [
  {
    label: "Personal Identity",
    icon: "badge",
    fields: ["Full name", "Date of Birth", "SSN", "Driver's license number"],
  },
  {
    label: "Contact",
    icon: "contact_mail",
    fields: ["Postal address", "Phone number", "Email"],
  },
  {
    label: "Immigration & Employment",
    icon: "work",
    fields: [
      "Immigration status (H1B / H4 / Green Card / Citizen)",
      "Current employer name",
      "Current employment start date",
      "Occupation details",
      "Job duties",
      "First date of entry into US",
      "Previous employer names and date ranges — only if applicant has worked less than 3 years for their current employer",
    ],
  },
  {
    label: "Financials",
    icon: "attach_money",
    fields: [
      "Applicant's personal annual income",
      "Total household income",
      "Total household value",
    ],
  },
];

const applicantConditional = [
  {
    condition: "If applicant is not working",
    fields: ["Amount of insurance on the spouse"],
  },
  {
    condition: "If applicant has existing insurance (for each policy)",
    fields: [
      "Company name",
      "Policy number",
      "Amount of coverage / benefit",
      "Year of issue",
      "Type (Individual / Business / Pending)",
    ],
  },
];

const otherParties = [
  {
    label: "Owner",
    icon: "manage_accounts",
    optional: "if different from applicant",
    fields: ["Full name", "Postal address (if different)", "Phone number", "Email", "Date of Birth", "SSN", "Driver's license number"],
  },
  {
    label: "Spouse",
    icon: "people",
    optional: "if applicable",
    fields: ["Full name", "Postal address (if different)", "Phone number", "Email", "Date of Birth", "SSN"],
  },
  {
    label: "Kids",
    icon: "child_care",
    optional: "if applicable",
    fields: ["Full name", "Phone number (if applicable)", "Email", "Date of Birth", "SSN"],
  },
];

const docGroups = [
  {
    label: "All Applicants",
    tag: "Required",
    tagColor: "green",
    docs: ["Licenses copy of applicant and owner (if different from applicant)"],
  },
  {
    label: "H1B Visa",
    tag: "H1B",
    tagColor: "blue",
    docs: [
      "Passport copy of applicant",
      "Visa copy of applicant (even if expired)",
      "I-797A (which has valid I-94)",
      "W9",
    ],
  },
  {
    label: "H4 Visa",
    tag: "H4",
    tagColor: "purple",
    docs: [
      "Passport copy of applicant",
      "Visa copy of applicant (even if expired)",
      "I-797A (which has valid I-94)",
      "W9",
      "Passport copy of spouse",
      "Visa copy of spouse (even if expired)",
      "I-797A (which has valid I-94) of spouse",
    ],
  },
  {
    label: "Green Card",
    tag: "Green Card",
    tagColor: "amber",
    docs: ["Copy of front and back of Green Card"],
  },
];

const examSteps = [
  "Schedule a medical exam from ExamOne or APPS for one insurance company application.",
  "Let the client know to keep the receipt the nurse leaves behind — it will have a barcode on it — and ask them to send it to you.",
  <>
    Send an email to Clinical Reference Laboratory at{" "}
    <a href="mailto:ilsdocrequest@crlcorp.com" className="app-link">ilsdocrequest@crlcorp.com</a>{" "}
    with the following:
    <div className="app-email-template">
      <div className="app-email-row">
        <span className="app-email-label">Subject</span>
        <span className="app-email-value">Request for lab slip</span>
      </div>
      <div className="app-email-row">
        <span className="app-email-label">Body</span>
        <span className="app-email-value" style={{ whiteSpace: "pre-line" }}>
          {`Can you please provide the lab slip for the following barcode?\n\nAgent Name: [your name]\nClient Name: [client name]\nBarcode: [from the nurse's receipt]`}
        </span>
      </div>
    </div>
  </>,
  "Upload or send the lab slip you receive from Clinical Reference Laboratory to the other insurance company — your client will not need to go through another medical exam.",
];

export default function Applications() {
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
          <span className="step-number-badge">More</span>
          <h1 className="step-title">Applications &amp; Medical Exams</h1>
          <p className="step-subtitle">
            Required information, documents, and ordering procedures.
          </p>
        </div>
      </header>

      <main className="app-main">

        {/* ── Section 1: Information for Application ── */}
        <section className="app-section">
          <div className="app-section-header">
            <div className="app-icon-wrap">
              <span className="material-icons">assignment_ind</span>
            </div>
            <h2 className="app-section-title">Information for Application</h2>
          </div>

          {/* Applicant — grouped clusters */}
          <p className="app-subsection-label">
            <span className="material-icons app-sub-icon">person</span>
            Applicant
          </p>

          <div className="app-field-groups">
            {applicantGroups.map((group) => (
              <div key={group.label} className="app-field-group">
                <div className="app-field-group-header">
                  <span className="material-icons app-field-group-icon">{group.icon}</span>
                  <span className="app-field-group-label">{group.label}</span>
                </div>
                <ul className="app-field-list">
                  {group.fields.map((f, i) => (
                    <li key={i}>
                      <span className="material-icons app-check-icon">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Conditional fields */}
            {applicantConditional.map((block) => (
              <div key={block.condition} className="app-field-group app-field-group--conditional">
                <div className="app-field-group-header">
                  <span className="material-icons app-field-group-icon">help_outline</span>
                  <span className="app-field-group-label">{block.condition}</span>
                </div>
                <ul className="app-field-list">
                  {block.fields.map((f, i) => (
                    <li key={i}>
                      <span className="material-icons app-check-icon">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Owner / Spouse / Kids grid */}
          <div className="app-parties-grid">
            {otherParties.map((party) => (
              <div key={party.label} className="app-party-card">
                <div className="app-party-header">
                  <span className="material-icons app-party-icon">{party.icon}</span>
                  <div>
                    <span className="app-party-label">{party.label}</span>
                    <span className="app-optional"> ({party.optional})</span>
                  </div>
                </div>
                <ul className="app-field-list">
                  {party.fields.map((f, i) => (
                    <li key={i}>
                      <span className="material-icons app-check-icon">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 2: Documents ── */}
        <section className="app-section">
          <div className="app-section-header">
            <div className="app-icon-wrap">
              <span className="material-icons">folder_open</span>
            </div>
            <h2 className="app-section-title">Documents for Application</h2>
          </div>

          <div className="app-doc-grid">
            {docGroups.map((group) => (
              <div key={group.label} className="app-doc-card">
                <div className="app-doc-card-header">
                  <span className="app-doc-card-label">{group.label}</span>
                  <span className={`app-tag app-tag--${group.tagColor}`}>{group.tag}</span>
                </div>
                <ul className="app-doc-list">
                  {group.docs.map((d, i) => (
                    <li key={i}>
                      <span className="material-icons app-check-icon">check_circle</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="app-note">
            <span className="material-icons app-note-icon">info</span>
            <span>Not all companies require all of the above. This is a consolidated list — use as per the requirements of the respective company.</span>
          </div>
        </section>

        {/* ── Section 3: Athene Rollover Info ── */}
        <section className="app-section">
          <div className="app-section-header">
            <div className="app-icon-wrap">
              <span className="material-icons">currency_exchange</span>
            </div>
            <h2 className="app-section-title">Athene Rollover Info</h2>
            <span className="app-tag app-tag--green" style={{ marginLeft: "auto" }}>After Suitability Approval</span>
          </div>

          <p className="app-body-text">
            Once suitability is approved, send your client the following rollover instructions:
          </p>

          <div className="app-email-card">
            <div className="app-email-subject-row">
              <span className="app-email-meta-label">Body</span>
            </div>
            <div className="app-email-body">
              <p className="app-email-para">(Client's Name)'s 401K rollover application is approved!!</p>
              <p className="app-email-para">
                Here is what you will need to do for your 401K rollover. Call your custodian and let them
                know you are ROLLING OVER your 401K and to send the check with the following details:
              </p>
              <div className="app-email-detail">
                <span className="app-email-detail-label">Check made to</span>
                <span className="app-email-detail-value">Athene Annuity and Life Company</span>
              </div>
              <div className="app-email-detail">
                <span className="app-email-detail-label">Memo</span>
                <span className="app-email-detail-value">FBO (Client First Name) (Client Last Name) (Client's Athene Account Number)</span>
              </div>
              <div className="app-email-detail">
                <span className="app-email-detail-label">Mailing Address</span>
                <span className="app-email-detail-value">7700 Mills Civic Parkway, West Des Moines, IA, 50266-3862</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Medical Exams ── */}
        <section className="app-section">
          <div className="app-section-header">
            <div className="app-icon-wrap">
              <span className="material-icons">health_and_safety</span>
            </div>
            <h2 className="app-section-title">Ordering Medical Exams</h2>
          </div>

          <div className="app-provider-row">
            <div className="app-provider-chip">
              <span className="material-icons" style={{ fontSize: 16 }}>science</span>
              ExamOne
            </div>
            <div className="app-provider-chip">
              <span className="material-icons" style={{ fontSize: 16 }}>science</span>
              APPS
            </div>
          </div>

          <div className="app-note" style={{ marginBottom: "1rem" }}>
            <span className="material-icons app-note-icon">lightbulb</span>
            <span>
              If you have applied to multiple companies that all need medical exams, the client only needs to complete <strong>one</strong> exam.
              You can request a lab slip from Clinical Reference Laboratory and submit it to the other companies.
            </span>
          </div>

          <p className="app-subsection-label" style={{ marginBottom: "0.75rem" }}>
            <span className="material-icons app-sub-icon">list_alt</span>
            Steps to Order a Lab Slip
          </p>

          <ol className="app-steps-list">
            {examSteps.map((step, i) => (
              <li key={i}>
                <div className="app-step-num">{i + 1}</div>
                <div className="app-step-body">{step}</div>
              </li>
            ))}
          </ol>

          <div className="app-disclaimer">
            <span className="material-icons" style={{ fontSize: 17, color: "#9ca3af", flexShrink: 0, marginTop: 1 }}>policy</span>
            <span>
              These templates do not provide any tax or legal advice. The details shown are strictly for
              educational purposes only and should not be treated as a recommendation or any tax/legal advice.
              The concepts explained are hypothetical in nature and for illustration purposes only.
            </span>
          </div>
        </section>

      </main>
    </div>
  );
}
