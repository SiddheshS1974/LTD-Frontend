import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "./api";
import { canAccessPage } from "./pageAccess";

const isAdmin = () => {
  return localStorage.getItem("is_staff") === "true" || localStorage.getItem("role") === "Admin";
};

const isRmd = () => {
  return localStorage.getItem("is_rmd_member") === "true";
};

const isNewMember = () => {
  const role = localStorage.getItem("role");
  return role === "New Member" || role === "Licensed";
};

const LICENSED_AUTO_PAGES = [
  "/more/register-accounts",
  "/rollovers",
  "/license",
  "/after-license-setups",
  "/videos/illustrations",
  "/videos/application",
];

const allNavItems = [
  // ── Accessible to all roles ──────────────────────────────────────────────
  { id: "dashboard",      label: "Home",            icon: "home",             path: "/home"              },
  {
    id: "members",
    label: "LFS 6 Basics",
    icon: "contacts",
    dropdown: [
      { label: "Prospecting / List Building", icon: "edit_note",        path: "/step1",      restricted: true },
      { label: "Approach / Contact",          icon: "record_voice_over", path: "/step2",      restricted: true },
      { label: "Presentation",               icon: "present_to_all",    path: "/step3",      restricted: true },
      { label: "Follow Up",                  icon: "follow_the_signs",  path: "/step4",      restricted: true },
      { label: "Fast Start",                 icon: "rocket_launch",     path: "/fast-start", restricted: true },
      { label: "Miscellaneous",              icon: "fact_check",        path: "/step6",      restricted: true },
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
    label: "Videos",
    icon: "ondemand_video",
    restricted: true,
    dropdown: [
      { label: "Illustrations", icon: "auto_stories",    path: "/videos/illustrations", restricted: true },
      { label: "Application",   icon: "app_registration", path: "/videos/application",  restricted: true },
    ],
  },
  { id: "license",        label: "License",         icon: "card_membership",  path: "/license",   restricted: true },
  { id: "after-license-setups", label: "ALS", icon: "assignment_turned_in", path: "/after-license-setups", restricted: true },
  {
    id: "more",
    label: "More",
    icon: "more_horiz",
    restricted: true,
    dropdown: [
      { label: "Information",                  icon: "info",        path: "/more/information",       restricted: true },
      { label: "Applications & Medical Exams", icon: "assignment",  path: "/more/applications",      restricted: true },
      { label: "Register Accounts",            icon: "how_to_reg",  path: "/more/register-accounts", restricted: true },
    ],
  },
  // ── Role-specific ─────────────────────────────────────────────────────────
  { id: "admin",          label: "Admin",           icon: "manage_accounts",    path: "/admin", adminOnly: true },
  { id: "rmd",            label: "RMD Panel",       icon: "supervisor_account", path: "/rmd",   rmdOnly: true   },
];

const pathToNavId = {
  "/home":                   "dashboard",
  "/step1":                  "members",
  "/step2":                  "members",
  "/step3":                  "members",
  "/step4":                  "members",
  "/fast-start":             "members",
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
  "/after-license-setups":   "after-license-setups",
  "/more/information":       "more",
  "/more/applications":      "more",
  "/more/register-accounts": "more",
  "/admin":                  "admin",
  "/rmd":                    "rmd",
};

export default function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const navRef    = useRef(null);

  const [grantedPages, setGrantedPages] = useState(() =>
    JSON.parse(localStorage.getItem("granted_pages") || "[]")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !isNewMember()) return;
    fetch(`${API}/api/v1/me/`, { headers: { Authorization: `Token ${token}` } })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.granted_pages !== undefined) {
          localStorage.setItem("granted_pages", JSON.stringify(data.granted_pages));
          setGrantedPages(data.granted_pages);
        }
      })
      .catch(() => {});
  }, []);

  const navItems = allNavItems.filter((item) => {
    if (item.adminOnly) return isAdmin();
    if (item.rmdOnly)   return isRmd();
    return true;
  });

  const indexFromPath = () => {
    const id = pathToNavId[location.pathname] ?? "dashboard";
    return Math.max(0, navItems.findIndex((i) => i.id === id));
  };

  const [selectorIndex,       setSelectorIndex]       = useState(indexFromPath);
  const [openDropdown,        setOpenDropdown]        = useState(null);
  const [selectorStyle,       setSelectorStyle]       = useState({});
  const [sidebarOpen,         setSidebarOpen]         = useState(false);
  const [openSidebarDropdown, setOpenSidebarDropdown] = useState(null);

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

  useEffect(() => { setTimeout(() => updateSelector(selectorIndex), 0); }, [selectorIndex]);

  useEffect(() => {
    const onResize = () => setTimeout(() => updateSelector(selectorIndex), 300);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selectorIndex]);

  useEffect(() => {
    setSelectorIndex(indexFromPath());
    setOpenDropdown(null);
    setSidebarOpen(false);
    setOpenSidebarDropdown(null);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open (use class to avoid stomping on page inline styles)
  useEffect(() => {
    document.body.classList.toggle("sidebar-open", sidebarOpen);
    return () => document.body.classList.remove("sidebar-open");
  }, [sidebarOpen]);

  const isDisabled = (item) => {
    if (!item.restricted) return false;
    const role = localStorage.getItem("role");
    if (role === "Licensed") {
      if (item.path && LICENSED_AUTO_PAGES.includes(item.path)) return false;
      if (item.dropdown && item.dropdown.some(d => LICENSED_AUTO_PAGES.includes(d.path))) return false;
    }
    return isNewMember() && !canAccessPage(grantedPages, item.path);
  };

  const handleNavClick = (index, item) => {
    if (item.dropdown) {
      setSelectorIndex(index);
      setOpenDropdown(openDropdown === index ? null : index);
    } else if (!isDisabled(item)) {
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
      const rightEdge = itemLeft + dropdownWidth;
      if (rightEdge > window.innerWidth - 8) {
        left = Math.max(0, window.innerWidth - 8 - dropdownWidth - navRect.left);
      }
      return left + "px";
    }
    return "0px";
  };

  const doLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API}/api/v1/logout/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
    } catch (_) {}
    ["token","is_staff","role","is_rmd_member","can_receive_requests","first_name","last_name","username"]
      .forEach(k => localStorage.removeItem(k));
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar-mainbg sticky-nav" onClick={(e) => e.stopPropagation()}>
        {/* Hamburger — mobile only, appears far-left */}
        <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <span className="material-icons">menu</span>
        </button>

        <div className="navbar-brand" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <span className="brand-main">LTD</span>
          <span className="brand-sub">Learn · Teach · Duplicate</span>
        </div>

        <ul className="navbar-nav" ref={navRef}>
          <div className="hori-selector" style={selectorStyle}>
            <div className="selector-left" />
            <div className="selector-right" />
          </div>

          {navItems.map((item, index) => {
            const disabled = isDisabled(item);
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
              const disabled = isDisabled(d);
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

        <button className="logout-btn" onClick={doLogout}>
          <span className="material-icons" style={{ fontSize: "11px" }}>logout</span>
          Logout
        </button>
      </nav>

      {/* Sidebar overlay + drawer */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="sidebar-header">
              <div>
                <div className="sidebar-brand">LTD</div>
                <div className="sidebar-brand-sub">Learn · Teach · Duplicate</div>
              </div>
              <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                <span className="material-icons">close</span>
              </button>
            </div>

            {/* Nav items */}
            <ul className="sidebar-nav">
              {navItems.map((item, index) => {
                const disabled = isDisabled(item);
                const active   = selectorIndex === index;
                return (
                  <li key={item.id}>
                    <div
                      className={`sidebar-item ${active ? "sidebar-item--active" : ""} ${disabled ? "sidebar-item--disabled" : ""}`}
                      onClick={() => {
                        if (disabled) return;
                        if (item.dropdown) {
                          setOpenSidebarDropdown(openSidebarDropdown === index ? null : index);
                        } else {
                          setSelectorIndex(index);
                          setSidebarOpen(false);
                          if (item.path) navigate(item.path);
                        }
                      }}
                    >
                      <span className="material-icons sidebar-item-icon">{item.icon}</span>
                      <span className="sidebar-item-label">{item.label}</span>
                      {item.dropdown && (
                        <span className="material-icons sidebar-chevron">
                          {openSidebarDropdown === index ? "expand_less" : "expand_more"}
                        </span>
                      )}
                    </div>

                    {item.dropdown && openSidebarDropdown === index && (
                      <ul className="sidebar-dropdown">
                        {item.dropdown.map((d, i) => {
                          const dDisabled = isDisabled(d);
                          return (
                            <li
                              key={i}
                              className={`sidebar-dropdown-item ${dDisabled ? "sidebar-item--disabled" : ""}`}
                              onClick={() => {
                                if (dDisabled) return;
                                setSelectorIndex(index);
                                setSidebarOpen(false);
                                if (d.path) navigate(d.path);
                              }}
                            >
                              <span className="material-icons sidebar-dropdown-icon">{d.icon}</span>
                              <span>{d.label}</span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Logout */}
            <button className="sidebar-logout" onClick={doLogout}>
              <span className="material-icons">logout</span>
              Logout
            </button>

          </div>
        </div>
      )}
    </>
  );
}
