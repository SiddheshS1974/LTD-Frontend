import { useEffect } from "react";
import "./Step1.css";
import "./AddressBook.css";

const carriers = [
  {
    name: "Athene",
    icon: "business",
    tag: "Annuity",
    tagColor: "amber",
    phones: [
      { label: "Main",                                       number: "+18002552405", display: "(800) 255-2405" },
      { label: "Fax",                                        number: "+18667093922", display: "(866) 709-3922", isFax: true },
      { label: "My Account Support (if you have a policy)", number: "+18882668489", display: "(888) 266-8489" },
    ],
    emails: [
      { label: "New Business Customer Support", address: "AskAthene@athene.com" },
      { label: "Send documents for a policy in process",     address: "submitcustomerdocs@athene.com" },
    ],
  },
  {
    name: "AIG",
    icon: "account_balance",
    tag: "Life",
    tagColor: "blue",
    phones: [
      { label: "New Business (Option #1)",              number: "+18002552702", display: "(800) 255-2702" },
      { label: "Questions & Updates on Cases (Special Line)", number: "+18667222434", display: "(866) 722-2434" },
      { label: "Inforce Business",                      number: "+18444523832", display: "(844) 452-3832" },
      { label: "Commissions (Option #3)",               number: "+18002552702", display: "(800) 255-2702" },
    ],
    emails: [
      { label: "New Business",  address: "ippendingreqs@aig.com" },
      { label: "Licensing",     address: "lcmaintenance@aig.com" },
    ],
  },
  {
    name: "Fidelity & Guaranty",
    icon: "verified",
    tag: "F&G",
    tagColor: "green",
    phones: [
      { label: "Customer Support", number: "+18004456758", display: "(800) 445-6758" },
    ],
    emails: [
      { label: "Pending New Cases",         address: "lifecasemgmt@fglife.com" },
      { label: "Contract & Licensing",      address: "contractingandlicensing@fglife.com" },
      { label: "Docs Delivery",             address: "deliveryrequirements@fglife.com" },
    ],
  },
  {
    name: "North American Company",
    icon: "corporate_fare",
    tag: "Life & Annuity",
    tagColor: "purple",
    phones: [
      { label: "New Business",                number: "+18552888149", display: "(855) 288-8149" },
      { label: "In Force Business",           number: "+18778720757", display: "(877) 872-0757" },
      { label: "Licensing & Contracting",     number: "+18663227068", display: "(866) 322-7068" },
      { label: "Commissions",                 number: "+18778720757", display: "(877) 872-0757" },
    ],
    emails: [
      { label: "New Business (send policy docs)",  address: "NAnewbusiness@sfgmembers.com" },
      { label: "Sales Support",                    address: "SalesSupport@nacolah.com" },
      { label: "Licensing & Contracting",          address: "NAContracting@sfgmembers.com" },
      { label: "Commissions",                      address: "NALifeCommissions@sfgmembers.com" },
    ],
  },
  {
    name: "HGI",
    icon: "groups",
    tag: "Back Office",
    tagColor: "gray",
    phones: [],
    emails: [
      { label: "Voided Check / Commission Verification", address: "commissions@hgicrusade.com" },
    ],
    note: {
      icon: "account_balance_wallet",
      text: "Provide a copy of a voided check to commissions@hgicrusade.com for verification. This can be done under Commission Inquiry in the Help section of Aristotle. Your direct deposit will not process until a voided check is provided.",
      link: {
        label: "Commission Payments — HGI Help Article",
        href: "https://hgicrusade.zendesk.com/hc/en-us/articles/360022832432-Commission-Payments",
      },
    },
  },
];

export default function AddressBook() {
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
          <span className="step-number-badge">Contacts</span>
          <h1 className="step-title">Address Book</h1>
          <p className="step-subtitle">
            Key contacts for each carrier. Keep your agent number handy when calling.
          </p>
        </div>
      </header>

      <main className="ab-main">
        {carriers.map((carrier) => (
          <section key={carrier.name} className="ab-card">
            <div className="ab-card-header">
              <div className="ab-icon-wrap">
                <span className="material-icons">{carrier.icon}</span>
              </div>
              <h2 className="ab-card-title">{carrier.name}</h2>
              <span className={`ab-tag ab-tag--${carrier.tagColor}`}>{carrier.tag}</span>
            </div>

            <div className="ab-body">
              {/* Phone numbers */}
              {carrier.phones.length > 0 && (
                <div className="ab-group">
                  <p className="ab-group-label">
                    <span className="material-icons ab-group-icon">phone</span>
                    Phone
                  </p>
                  <div className="ab-rows">
                    {carrier.phones.map((p, i) => (
                      <div key={i} className="ab-row">
                        <span className="ab-row-label">{p.label}</span>
                        {p.isFax ? (
                          <span className="ab-row-value ab-fax">{p.display}</span>
                        ) : (
                          <a href={`tel:${p.number}`} className="ab-row-value ab-phone-link">
                            <span className="material-icons" style={{ fontSize: 14 }}>call</span>
                            {p.display}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emails */}
              {carrier.emails.length > 0 && (
                <div className="ab-group">
                  <p className="ab-group-label">
                    <span className="material-icons ab-group-icon">email</span>
                    Email
                  </p>
                  <div className="ab-rows">
                    {carrier.emails.map((e, i) => (
                      <div key={i} className="ab-row">
                        <span className="ab-row-label">{e.label}</span>
                        <a href={`mailto:${e.address}`} className="ab-row-value ab-email-link">
                          {e.address}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Note (HGI) */}
              {carrier.note && (
                <div className="ab-note">
                  <span className="material-icons ab-note-icon">{carrier.note.icon}</span>
                  <div className="ab-note-body">
                    <p>{carrier.note.text}</p>
                    {carrier.note.link && (
                      <a
                        href={carrier.note.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ab-note-link"
                      >
                        <span className="material-icons" style={{ fontSize: 14 }}>open_in_new</span>
                        {carrier.note.link.label}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
