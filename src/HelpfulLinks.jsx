import { useEffect } from "react";
import "./Step1.css";
import "./Step6.css";

const helpfulLinks = [
  { url: "https://vanguardcollege.ssnc.cloud/csp.php",                                                                                                                                                   label: "Vanguard College Savings Planner",              icon: "school"         },
  { url: "https://www.forbes.com/advisor/income-tax-calculator/georgia/?deductions=0&dependents=0&filing=married&income=230000&ira=0&k401=0",                                                            label: "Effective Income Tax Calculator (Forbes)",      icon: "calculate"      },
  { url: "https://www.bankrate.com/retirement/calculators/401-k-retirement-calculator/",                                                                                                                  label: "Bank Rate 401K Calculator",                    icon: "savings"        },
  { url: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator",                                                                                                 label: "Compound Interest Calculator",                 icon: "trending_up"    },
  { url: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance/",                                                                                                             label: "Info About FDIC",                              icon: "account_balance" },
  { url: "https://econnections.aglife.com/MVC/QoLRapidRater",                                                                                                                                            label: "AIG QoL Rapid Rater",                          icon: "speed"          },
  { url: "https://smartasset.com/taxes/income-taxes",                                                                                                                                                    label: "Effective Income Tax Calculator (SmartAsset)", icon: "receipt_long"   },
];

export default function HelpfulLinks() {
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
          <h1 className="step-title">Helpful Links</h1>
          <p className="step-subtitle">
            Calculators and reference tools to support your client conversations
            and financial planning.
          </p>
        </div>
      </header>

      <main className="s6-main">
        <section className="s6-section">
          <div className="s6-section-header">
            <span className="material-icons s6-section-icon">link</span>
            <h2 className="s6-section-title">Calculators &amp; Reference Tools</h2>
          </div>
          <div className="s6-links-grid">
            {helpfulLinks.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="s6-link-card"
              >
                <span className="material-icons s6-link-icon">{item.icon}</span>
                <span className="s6-link-label">{item.label}</span>
                <span className="material-icons s6-link-arrow">open_in_new</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
