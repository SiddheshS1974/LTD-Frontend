import { useState, useEffect } from "react";
import "./Home.css";
import API from "./api";
import { CERTIFICATIONS } from "./certifications";

const steps = [
  {
    n: "01", icon: "edit_note",
    title: "Prospecting & List Building",
    desc: "Build a warm market list of at least 100 names. Everyone you know is a potential client or business partner — start writing names without filtering.",
  },
  {
    n: "02", icon: "record_voice_over",
    title: "Approach & Contact",
    desc: "Reach out with curiosity, not a pitch. The goal is simply to book a time to share information — keep it brief, confident, and personal.",
  },
  {
    n: "03", icon: "present_to_all",
    title: "Presentation",
    desc: "Show the business opportunity or product clearly and enthusiastically. Use the system's tools — don't wing it. Let the presentation do the work.",
  },
  {
    n: "04", icon: "follow_the_signs",
    title: "Follow Up (FLS)",
    desc: "Most people need multiple touches before making a decision. Stay consistent, follow up within 24–48 hours, and never leave a conversation without a next step.",
  },
  {
    n: "05", icon: "handshake",
    title: "Follow Up (Business)",
    desc: "Support your new team members through their first steps. Help them get started fast, attend their first appointments, and plug them into training.",
  },
  {
    n: "06", icon: "fact_check",
    title: "Miscellaneous",
    desc: "Additional tools, scripts, and resources that support every stage of the system — from handling objections to staying motivated and organised.",
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const role = localStorage.getItem("role");
  const showCertifications = role === "New Member" || role === "Licensed";
  const [certifications, setCertifications] = useState(() =>
    JSON.parse(localStorage.getItem("certifications") || "[]")
  );

  useEffect(() => {
    if (!showCertifications) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API}/api/v1/me/`, { headers: { Authorization: `Token ${token}` } })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.certifications !== undefined) {
          localStorage.setItem("certifications", JSON.stringify(data.certifications));
          setCertifications(data.certifications);
        }
      })
      .catch(() => {});
  }, [showCertifications]);

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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const coverOpacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.55));
  const coverScale   = 1 + scrollY * 0.0003;

  return (
    <div className="home-page">

      {/* ── Hero Cover ── */}
      <div className="hero-cover" style={{ opacity: coverOpacity }} aria-hidden="true">
        <div className="hero-cover-bg" style={{ transform: `scale(${coverScale})` }} />
        <div className="hero-cover-overlay" />
        <div className="hero-cover-content">
          <p className="hero-cover-eyebrow">Welcome to the LTD Program</p>
          <p className="hero-cover-sub">Learn · Teach · Duplicate</p>
        </div>
        <div className="hero-cover-scroll-hint">
          <span className="material-icons hero-cover-arrow">expand_more</span>
        </div>
      </div>

      <main className="home-content">

        {/* ── Certifications Progress ── */}
        {showCertifications && (
          <section className="home-certs">
            <p className="home-eyebrow" style={{ textAlign: "center", marginBottom: "0.5rem" }}>Field Building</p>
            <h3 className="home-steps-label">Your Certifications</h3>
            <p className="home-certs-count">
              {certifications.length} / {CERTIFICATIONS.length} earned
            </p>
            <div className="home-certs-bar-track">
              <div
                className="home-certs-bar-fill"
                style={{ width: `${(certifications.length / CERTIFICATIONS.length) * 100}%` }}
              />
            </div>
            <div className="home-certs-grid">
              {CERTIFICATIONS.map((cert) => {
                const earned = certifications.includes(cert.key);
                return (
                  <div key={cert.key} className={`home-cert-chip ${earned ? "home-cert-chip--earned" : ""}`}>
                    <span className="material-icons home-cert-chip-icon">
                      {earned ? "workspace_premium" : "lock_outline"}
                    </span>
                    {cert.label}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Overview ── */}
        <section className="home-overview">
          <p className="home-eyebrow">Welcome</p>
          <h2 className="home-overview-title">Your Business Intranet</h2>
          <p className="home-overview-sub">
            This intranet is designed to accelerate learning, helping you master the fundamentals
            quickly and put your business on the fast track to success. With a focus on duplication,
            you can seamlessly replicate proven systems, empowering your team to grow efficiently
            and achieve massive results.
          </p>
          <p className="home-overview-tagline">Learn, Teach, Duplicate — success starts here!</p>
        </section>

        {/* ── Steps Grid ── */}
        <section className="home-steps">
          <p className="home-eyebrow" style={{ textAlign: "center", marginBottom: "0.5rem" }}>The LFS 6-Step System</p>
          <h3 className="home-steps-label">Your Roadmap to Results</h3>
          <div className="home-steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="home-step-card">
                <div className="home-step-top">
                  <span className="home-step-n">{s.n}</span>
                  <div className="home-step-icon-wrap">
                    <span className="material-icons home-step-icon">{s.icon}</span>
                  </div>
                </div>
                <h3 className="home-step-title">{s.title}</h3>
                <p className="home-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
