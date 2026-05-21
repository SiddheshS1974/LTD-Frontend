import { useState, useEffect } from "react";
import "./Step2.css";

const scripts = [
  {
    id: "3party",
    icon: "group",
    tag: "With Team Member & Field Builder",
    title: "3rd Party Invite",
    note: "Use this script if you are new — before starting to call by yourself.",
    color: "rose",
    dialogue: [
      {
        speaker: "TEAM MEMBER",
        lines: [
          "Hi [Name], (have a very small talk — how are you? How was the day?). I called you for an important reason. I have a close friend of mine, [Field Builder's name], at my home / on call right now. He/She is professionally very successful — has his/her own venture with offices in Atlanta, NJ, TX, and CA. He/She is expanding and looking for more hands. I immediately thought about you.",
        ],
      },
      { speaker: "PROSPECT", lines: ["What is it?"] },
      {
        speaker: "TEAM MEMBER",
        lines: ["[Field Builder], can you tell him/her what you are looking for?"],
      },
      {
        speaker: "YOU (FB)",
        lines: [
          "Hi [Prospect], I am [Your Name]. I know we have never met but [Team Member] talked highly about you so I thought to connect with you. As [Team Member] said, I have my own venture with offices in Atlanta, NJ, TX, and CA and I am expanding.",
          "I was checking with [Team Member] if he/she knew anyone and he/she immediately thought about you. But [Prospect], I hope you understand — it will be difficult to go over everything over the phone. We can match our calendars and get on a Zoom call / meet in person (if local) and go over the details. And of course, this is just information exchange. If our frequency matches we can do something together — else you might know someone who fits the profile I am looking for. Are weekdays better or weekends?",
        ],
      },
      { speaker: "PROSPECT", lines: ["Sure. But can you give me more details?"] },
      {
        speaker: "YOU (FB)",
        lines: [
          "My company is in the finance sector — but as you know it's a vast area. I will need pen and paper to go over the details. Show and Tell. Again, if there is a fit somewhere we can do something together. In worst case, our friendship will grow and we may cross paths sometime in the future. Are weekdays better or weekends?",
        ],
      },
    ],
  },
  {
    id: "solo",
    icon: "person",
    tag: "After Certification",
    title: "Call by Yourself",
    note: "Use only after you are CERTIFIED by your Field Builder to call by yourself.",
    color: "maroon",
    dialogue: [
      {
        speaker: "YOU",
        lines: [
          "Hi [Prospect], as you know [My wife — her name] and I have been working in the IT industry (your profession) for a while. Professionally doing good but we were looking for something more. I have my own venture with offices in Atlanta, NJ, TX, and CA and I am expanding. I am looking for more hands and I thought about you. Let's get together on a Zoom call / in person and discuss. And of course, this is just information exchange. If our frequency matches we can do something together — else you might know someone who fits the profile I am looking for. Are weekdays better or weekends?",
        ],
      },
      { speaker: "PROSPECT", lines: ["What is it?"] },
      {
        speaker: "YOU",
        lines: [
          "My company is in the finance sector — but as you know it's a vast area. I will need pen and paper to go over the details. Show and Tell. Again, if there is a fit somewhere we can do something together — else no worries. Are weekdays better or weekends?",
        ],
      },
    ],
  },
  {
    id: "finlit",
    icon: "account_balance",
    tag: "Event Invite",
    title: "Financial Literacy Session",
    note: null,
    color: "rose",
    dialogue: [
      {
        speaker: "YOU",
        lines: [
          "Hi [Prospect], I have a close friend from Atlanta who is in the finance domain. He/She is licensed in multiple states and has offices in Atlanta, NJ, Dallas, and CA. He/She is conducting a financial literacy session. I am inviting you to meet and listen to him/her. He/She will share knowledge around Will, Estate Planning, Kids' Education, Tax Saving, Retirement Planning, and many related subjects.",
          "After listening to the info, I wish I had this information 10–15 years back. It would be valuable for all of us, especially in this country. The session is on Saturday 3rd August at 4:30 PM. I have a few passes (if in a hotel/conference room) or limited seating (if at home). Can you confirm so I can book a seat for you?",
        ],
      },
      { speaker: "PROSPECT", lines: ["Can you give me more details?"] },
      {
        speaker: "YOU",
        lines: [
          "He/She is the right person to get all the details — he/she is the expert. I will send you a flier after our call. Do I take you as confirmed?",
        ],
      },
      { speaker: "PROSPECT", lines: ["I will let you know if I can attend."] },
      {
        speaker: "YOU",
        lines: [
          "I have limited seating / limited passes. I will book one/two for you. Confirm with me by tomorrow evening else I will free up the pass for someone else. I will set a reminder — if I don't hear back I'll send you a nudge.",
        ],
      },
    ],
  },
  {
    id: "womenlit",
    icon: "diversity_3",
    tag: "Women's Event",
    title: "Women's Financial Literacy Session",
    note: null,
    color: "maroon",
    dialogue: [
      {
        speaker: "YOU",
        lines: [
          "Hi [Prospect], I have a close friend from Atlanta who is in the finance domain. He/She is licensed in multiple states and has offices in Atlanta, NJ, Dallas, and CA. He/She is conducting a Women's Financial Literacy Campaign. I am inviting you to attend.",
          "He/She will share knowledge around Will, Estate Planning, Kids' Education, Tax Saving, Retirement Planning, and many related subjects. After listening to the info, I wish I had this information 10–15 years back. The session is on Feb 8th in Alpharetta. I will send you the RSVP link — you'll get the address and details once you RSVP. Seats are limited and it's first come first serve.",
        ],
      },
      { speaker: "PROSPECT", lines: ["Can you give me more details?"] },
      {
        speaker: "YOU",
        lines: [
          "He/She is the right person to get all the details — he/she is the expert. I will send you the RSVP link after our call. RSVP as early as possible to confirm your seat.",
        ],
      },
      { speaker: "PROSPECT", lines: ["I will let you know if I can attend."] },
      {
        speaker: "YOU",
        lines: ["It is limited seating — once the space is full the link will be disabled."],
      },
    ],
    objection: {
      q: "My husband takes care of all the finances.",
      a: "I know — that is exactly why I want you to come. He may manage, but it's important for all ladies to have this information. And since this is specifically for ladies, it's going to be in very basic, simple language.",
    },
  },
  {
    id: "linkedin",
    icon: "link",
    tag: "LinkedIn Outreach",
    title: "LinkedIn Connection Script",
    note: "Send to an existing LinkedIn connection to start the conversation. Do NOT approach for business in the message — get their phone number first, then call to book the BOP.",
    color: "rose",
    dialogue: [
      {
        speaker: "MESSAGE",
        lines: [
          "Hello [Name],\n\nHow are you? It has been a while!\n\nWas coming to [City] next month as I am setting up an office for my business there. Remembered that you were in [State/City]. Thought of pinging you.\n\n[Your Name]",
        ],
      },
    ],
  },
];

const speakerColors = {
  "TEAM MEMBER": { bg: "#fff7f8", border: "#e8d0d5", label: "#6B2737" },
  PROSPECT:      { bg: "#f8f8fa", border: "#e0dde6", label: "#555"    },
  "YOU (FB)":    { bg: "#fdf2f4", border: "#d4909f", label: "#4A1525" },
  YOU:           { bg: "#fdf2f4", border: "#d4909f", label: "#4A1525" },
  MESSAGE:       { bg: "#f4f8ff", border: "#c0d4f5", label: "#1a3a7a" },
};

export default function Step2() {
  const [open, setOpen] = useState("3party");

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
          <span className="step-number-badge">Step 2 of 6</span>
          <h1 className="step-title">Approach &amp; Contact</h1>
          <p className="step-subtitle">
            Your approach sets the tone for every relationship you build.
            Use these proven scripts to confidently reach out, invite prospects,
            and book the meeting — without sounding pushy.
          </p>
        </div>
      </header>

      {/* Script cards */}
      <main className="s2-content">

        {/* Stat pills */}
        <div className="s2-stats">
          <div className="s2-stat">
            <span className="material-icons s2-stat-icon">article</span>
            <div>
              <div className="s2-stat-num">5</div>
              <div className="s2-stat-label">Proven Scripts</div>
            </div>
          </div>
          <div className="s2-stat">
            <span className="material-icons s2-stat-icon">groups</span>
            <div>
              <div className="s2-stat-num">3</div>
              <div className="s2-stat-label">Invite Types</div>
            </div>
          </div>
          <div className="s2-stat">
            <span className="material-icons s2-stat-icon">tips_and_updates</span>
            <div>
              <div className="s2-stat-num">1</div>
              <div className="s2-stat-label">Objection Handler</div>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="s2-accordion">
          {scripts.map((s) => (
            <div
              key={s.id}
              className={`s2-card ${open === s.id ? "s2-card--open" : ""}`}
            >
              {/* Card header */}
              <button
                className="s2-card-header"
                onClick={() => setOpen(open === s.id ? null : s.id)}
              >
                <div className="s2-card-header-left">
                  <div className={`s2-card-icon-wrap s2-card-icon-wrap--${s.color}`}>
                    <span className="material-icons">{s.icon}</span>
                  </div>
                  <div>
                    <span className="s2-card-tag">{s.tag}</span>
                    <div className="s2-card-title">{s.title}</div>
                  </div>
                </div>
                <span className="material-icons s2-chevron">
                  {open === s.id ? "expand_less" : "expand_more"}
                </span>
              </button>

              {/* Card body */}
              {open === s.id && (
                <div className="s2-card-body">
                  {s.note && (
                    <div className="s2-note">
                      <span className="material-icons" style={{ fontSize: 16 }}>info</span>
                      {s.note}
                    </div>
                  )}

                  <div className="s2-dialogue">
                    {s.dialogue.map((line, i) => {
                      const colors = speakerColors[line.speaker] ?? speakerColors["PROSPECT"];
                      return (
                        <div
                          key={i}
                          className="s2-line"
                          style={{ background: colors.bg, borderLeft: `4px solid ${colors.border}` }}
                        >
                          <span className="s2-speaker" style={{ color: colors.label }}>
                            {line.speaker}
                          </span>
                          {line.lines.map((text, j) => (
                            <p key={j} className="s2-text">
                              {text.split("\n").map((row, k) => (
                                <span key={k}>{row}<br /></span>
                              ))}
                            </p>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* Objection handler */}
                  {s.objection && (
                    <div className="s2-objection">
                      <div className="s2-objection-header">
                        <span className="material-icons" style={{ fontSize: 18, color: "#6B2737" }}>
                          help_outline
                        </span>
                        <strong>Common Objection</strong>
                      </div>
                      <div className="s2-objection-q">"{s.objection.q}"</div>
                      <div className="s2-objection-a">{s.objection.a}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tip */}
        <div className="step-tip">
          <span className="material-icons step-tip-icon">lightbulb</span>
          <div>
            <strong>Pro Tip:</strong> The goal of every script is to book the
            meeting — not to explain everything over the phone. Keep it short,
            stay confident, and always end with a question that moves toward
            a specific time and date.
          </div>
        </div>

      </main>
    </div>
  );
}
