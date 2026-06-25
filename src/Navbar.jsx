import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./api";

const isAdmin = () => {
  return localStorage.getItem("is_staff") === "true" || localStorage.getItem("role") === "Admin";
};

const isRmd = () => {
  return localStorage.getItem("is_rmd_member") === "true";
};

const isNewMember = () => {
  return localStorage.getItem("role") === "New Member";
};

const allNavItems = [
  // ── Accessible to all roles ──────────────────────────────────────────────
  { id: "dashboard",      label: "Home",            icon: "home",             path: "/home"              },
  {
    id: "members",
    label: "LFS 6 Basics",
    icon: "contacts",
    dropdown: [
      { label: "Step 1 — Prospecting & List Building", icon: "edit_note",         path: "/step1", restricted: true },
      { label: "Step 2 — Approach & Contact",          icon: "record_voice_over",  path: "/step2", restricted: true },
      { label: "Step 3 — Presentation",                icon: "present_to_all",     path: "/step3", restricted: true },
      { label: "Step 4 — Follow Up (FLS)",             icon: "follow_the_signs",   path: "/step4", restricted: true },
      { label: "Step 5 — Follow Up (Business)",        icon: "handshake",          path: "/step5", restricted: true },
      { label: "Step 6 — Miscellaneous",               icon: "fact_check",         path: "/step6"                  },
    ],
  },
  { id: "wills",          label: "Wills & Trust",   icon: "balance",          path: "/wills-trust"       },
  { id: "brochures",      label: "Brochures",       icon: "description",      path: "/brochures"         },
  { id: "address-book",   label: "Address Book",    icon: "import_contacts",  path: "/more/address-book" },
  { id: "success-stories",label: "Success Stories", icon: "emoji_events",     path: "/success-stories"   },
  { id: "helpful-links",  label: "Helpful Links",   icon: "link",             path: "/helpful-links"     },
  // ── Restricted from New Members ──────────────────────────────────────────
  { id: "rollovers",      label: "Rollovers",       icon: "currency_exchange", path: "/rollovers", restricted: true },
  {
    id: "videos",
    label: "Solutions Videos",
    icon: "ondemand_video",
    restricted: true,
    dropdown: [
      { label: "Illustrations", icon: "auto_stories",    path: "/videos/illustrations", restricted: true },
      { label: "Application",   icon: "app_registration", path: "/videos/application",  restricted: true },
      { label: "Stories",       icon: "menu_book",        path: "/videos/stories",       restricted: true },
    ],
  },
  { id: "license",        label: "License",         icon: "card_membership",  path: "/license",   restricted: true },
  {
    id: "more",
    label: "More",
    icon: "more_horiz",
    restricted: true,
    dropdown: [
      { label: "Information",                  icon: "info",        path: "/more/information",       restricted: true },
      { label: "Applications & Medical Exams", icon: "assignment",  path: "/more/applications",      restricted: true },
      { label: "Setups",                       icon: "settings",    path: "/more/setups",            restricted: true },
      { label: "Register Accounts",            icon: "how_to_reg",  path: "/more/register-accounts", restricted: true },
    ],
  },
  // ── Role-specific ─────────────────────────────────────────────────────────
  { id: "admin",          label: "Admin",           icon: "manage_accounts",    path: "/admin", adminOnly: true },
  { id: "rmd",            label: "RMD Panel",       icon: "supervisor_account", path: "/rmd",   rmdOnly: true   },
];

// Map every route to the nav item that should be highlighted
const pathToNavId = {
  "/home":                   "dashboard",
  "/step1":                  "members",
  "/step2":                  "members",
  "/step3":                  "members",
  "/step4":                  "members",
  "/step5":                  "members",
  "/step6":                  "members",
  "/wills-trust":            "wills",
  "/brochures":              "brochures",
  "/more/address-book":      "address-book",
  "/success-stories":        "success-stories",
  "/helpful-links":          "helpful-links",
  "/rollovers":              "rollovers",
  "/videos/illustrations":   "videos",
  "/videos/application":     "videos",
  "/videos/stories":         "videos",
  "/license":                "license",
  "/more/information":       "more",
  "/more/applications":      "more",
  "/more/setups":            "more",
  "/more/register-accounts": "more",
  "/admin":                  "admin",
  "/rmd":                    "rmd",
};

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const navRef    = useRef(null);

  const navItems = allNavItems.filter((item) => {
    if (item.adminOnly) return isAdmin();
    if (item.rmdOnly) return isRmd();
    return true;
  });

  const indexFromPath = () => {
    const id = pathToNavId[location.pathname] ?? "dashboard";
    return Math.max(0, navItems.findIndex((i) => i.id === id));
  };

  const [selectorIndex, setSelectorIndex] = useState(indexFromPath);
  const [openDropdown,  setOpenDropdown]  = useState(null);
  const [selectorStyle, setSelectorStyle] = useState({});

  const updateSelector = (index) => {
    if (!navRef.current) return;
    const items = navRef.current.querySelectorAll(".nav-item");
    if (items[index]) {
      setSelectorStyle({
        left:  items[index].offsetLeft + "px",
        width: items[index].offsetWidth + "px",
      });
    }
  };

  // Animate selector whenever selectorIndex changes (including on route change)
  useEffect(() => {
    setTimeout(() => updateSelector(selectorIndex), 0);
  }, [selectorIndex]);

  // Keep selector positioned correctly on resize
  useEffect(() => {
    const onResize = () => setTimeout(() => updateSelector(selectorIndex), 300);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selectorIndex]);

  // When the URL changes (page navigation), animate selector to the matching tab
  useEffect(() => {
    setSelectorIndex(indexFromPath());
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleNavClick = (index, item) => {
    if (item.dropdown) {
      setSelectorIndex(index);
      setOpenDropdown(openDropdown === index ? null : index);
    } else if (!(item.restricted && isNewMember())) {
      setSelectorIndex(index);
      setOpenDropdown(null);
      if (item.path) navigate(item.path);
    }
  };

  const getDropdownLeft = () => {
    if (!navRef.current || openDropdown === null) return "0px";
    const items   = navRef.current.querySelectorAll(".nav-item");
    const navRect = navRef.current.closest("nav").getBoundingClientRect();
    if (items[openDropdown]) {
      const itemLeft = items[openDropdown].getBoundingClientRect().left;
      const dropdownWidth = 220;
      let left = itemLeft - navRect.left;
      // Clamp so the dropdown doesn't overflow the right edge of the screen
      const rightEdge = itemLeft + dropdownWidth;
      if (rightEdge > window.innerWidth - 8) {
        left = Math.max(0, window.innerWidth - 8 - dropdownWidth - navRect.left);
      }
      return left + "px";
    }
    return "0px";
  };

  return (
    <nav
      className="navbar-mainbg sticky-nav"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="navbar-brand"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        <span className="brand-main">LTD</span>
        <span className="brand-sub">Learn · Teach · Duplicate</span>
      </div>

      <ul className="navbar-nav" ref={navRef}>
        <div className="hori-selector" style={selectorStyle}>
          <div className="selector-left" />
          <div className="selector-right" />
        </div>

        {navItems.map((item, index) => {
          const disabled = item.restricted && isNewMember();
          return (
            <li
              key={item.id}
              className={`nav-item ${selectorIndex === index ? "active" : ""} ${disabled ? "disabled" : ""}`}
              onClick={() => handleNavClick(index, item)}
            >
              <span className="material-icons nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.dropdown && (
                <span className="material-icons" style={{ fontSize: "16px" }}>
                  {openDropdown === index ? "expand_less" : "expand_more"}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {openDropdown !== null && navItems[openDropdown]?.dropdown && (
        <div className="dropdown-menu" style={{ left: getDropdownLeft() }}>
          {navItems[openDropdown].dropdown.map((d, i) => {
            const disabled = d.restricted && isNewMember();
            return (
              <div
                key={i}
                className={`dropdown-item ${disabled ? "disabled" : ""}`}
                onClick={() => {
                  if (disabled) return;
                  setOpenDropdown(null);
                  if (d.path) navigate(d.path);
                }}
              >
                <span className="material-icons dropdown-item-icon">{d.icon}</span>
                <span>{d.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <button
        className="logout-btn"
        onClick={async () => {
          const token = localStorage.getItem("token");
          try {
            await fetch(`${API}/api/v1/logout/`, {
              method: "POST",
              headers: { Authorization: `Token ${token}` },
            });
          } catch (_) {}
          localStorage.removeItem("token");
          localStorage.removeItem("is_staff");
          localStorage.removeItem("role");
          localStorage.removeItem("is_rmd_member");
          localStorage.removeItem("can_receive_requests");
          localStorage.removeItem("first_name");
          localStorage.removeItem("last_name");
          localStorage.removeItem("username");
          navigate("/login");
        }}
      >
        <span className="material-icons" style={{ fontSize: "11px" }}>logout</span>
        Logout
      </button>
    </nav>
  );
}
