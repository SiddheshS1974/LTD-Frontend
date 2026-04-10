import { useState, useEffect, useRef } from "react";
import "./Home.css";

export default function Home() {
  const [activeNav, setActiveNav] = useState(0);
  const [selectorStyle, setSelectorStyle] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const navItems = [
    { id: "dashboard", label: "Home", icon: "home" },
    {
      id: "members",
      label: "LFS 6 Basics",
      icon: "contacts",
      dropdown: [
        { label: "Step 1 - Prospecting/Listbuilding", icon: "edit_note" },
        { label: "Step 2 - Approach/Contact", icon: "record_voice_over" },
        { label: "Step 3 - Presentation", icon: "present_to_all" },
        { label: "Step 4 - Follow Up (FLS)", icon: "follow_the_signs" },
        { label: "Step 5 - Follow Up (Business)", icon: "handshake" },
        { label: "Step 6 - Miscellaneous", icon: "fact_check" },
      ],
    },
    { id: "reports", label: "Reports", icon: "bar_chart" },
    { id: "training", label: "Training", icon: "school" },
    { id: "settings", label: "Settings", icon: "settings" },
  ];

  const updateSelector = (index) => {
    if (navRef.current) {
      const items = navRef.current.querySelectorAll(".nav-item");
      if (items[index]) {
        const item = items[index];
        setSelectorStyle({
          left: item.offsetLeft + "px",
          width: item.offsetWidth + "px",
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => updateSelector(activeNav), 0);
  }, [activeNav]);

  useEffect(() => {
    const handleResize = () => setTimeout(() => updateSelector(activeNav), 300);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeNav]);

  const handleNavClick = (index, item) => {
    setActiveNav(index);
    if (item.dropdown) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setOpenDropdown(null);
    }
  };

  const getDropdownLeft = () => {
    if (navRef.current && openDropdown !== null) {
      const items = navRef.current.querySelectorAll(".nav-item");
      if (items[openDropdown]) {
        const item = items[openDropdown];
        const navRect = navRef.current.closest("nav").getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        return itemRect.left - navRect.left + "px";
      }
    }
    return "0px";
  };

  return (
    <div className="home-page" onClick={() => setOpenDropdown(null)}>
      <nav className="navbar-mainbg" onClick={(e) => e.stopPropagation()}>
        <div className="navbar-brand">
          <span className="brand-main">LTD</span>
          <span className="brand-sub">Learn · Teach · Duplicate</span>
        </div>

        <ul className="navbar-nav" ref={navRef}>
          <div className="hori-selector" style={selectorStyle}>
            <div className="selector-left"></div>
            <div className="selector-right"></div>
          </div>
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className={`nav-item ${activeNav === index ? "active" : ""}`}
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
          ))}
        </ul>

        {openDropdown !== null && navItems[openDropdown]?.dropdown && (
          <div className="dropdown-menu" style={{ left: getDropdownLeft() }}>
            {navItems[openDropdown].dropdown.map((d, i) => (
              <div key={i} className="dropdown-item">
                <span className="material-icons dropdown-item-icon">{d.icon}</span>
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}