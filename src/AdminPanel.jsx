import React, { useState, useEffect, useRef } from "react";
import "./AdminPanel.css";
import API from "./api";

const ROLE_CHOICES = ["New Member", "Admin"];

const GRANTABLE_PAGES = [
  { path: "/step1", label: "Step 1" },
  { path: "/step2", label: "Step 2" },
  { path: "/step3", label: "Step 3" },
  { path: "/step4", label: "Step 4" },
  { path: "/step5", label: "Step 5" },
  { path: "/step6", label: "Step 6" },
  { path: "/videos/illustrations", label: "Videos – Illustrations" },
  { path: "/videos/application", label: "Videos – Application" },
  { path: "/videos/stories", label: "Videos – Stories" },
  { path: "/rollovers", label: "Rollovers" },
  { path: "/license", label: "License" },
  { path: "/more/information", label: "Information" },
  { path: "/more/applications", label: "Applications" },
  { path: "/more/examone", label: "ExamOne" },
  { path: "/more/setups", label: "Setups" },
  { path: "/more/register-accounts", label: "Register Accounts" },
];

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [pendingRole, setPendingRole] = useState("");
  const [confirmToggleId, setConfirmToggleId] = useState(null);
  const [confirmDeleteUserId, setConfirmDeleteUserId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [managingPagesId, setManagingPagesId] = useState(null);
  const [pageEdits, setPageEdits] = useState([]);

  const [activeTab, setActiveTab] = useState("accounts");

  const [hgiCodes, setHgiCodes] = useState([]);
  const [hgiLoading, setHgiLoading] = useState(false);
  const [hgiError, setHgiError] = useState("");
  const [hgiSearch, setHgiSearch] = useState("");
  const [hgiPage, setHgiPage] = useState(1);
  const [hgiTotal, setHgiTotal] = useState(0);
  const [hgiNumPages, setHgiNumPages] = useState(1);
  const [hgiClaimedCount, setHgiClaimedCount] = useState(0);
  const [hgiRefresh, setHgiRefresh] = useState(0);
  const hgiTimerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState({ code: "", first_name: "", last_name: "", upline_rmd_name: "" });
  const [editingHgiId, setEditingHgiId] = useState(null);
  const [pendingHgiEdit, setPendingHgiEdit] = useState({});
  const [confirmDeleteHgiId, setConfirmDeleteHgiId] = useState(null);
  const [hgiActionError, setHgiActionError] = useState("");

  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingError, setPendingError] = useState("");
  const [confirmDeletePendingId, setConfirmDeletePendingId] = useState(null);
  const [confirmApprovePendingId, setConfirmApprovePendingId] = useState(null);

  const [rmdQuery, setRmdQuery] = useState("");
  const [rmdProfiles, setRmdProfiles] = useState([]);
  const [rmdProfilesLoading, setRmdProfilesLoading] = useState(false);
  const [showAddRmdForm, setShowAddRmdForm] = useState(false);
  const [newRmd, setNewRmd] = useState({ first_name: "", last_name: "", hgi_code: "" });
  const [rmdActionError, setRmdActionError] = useState("");
  const [addingRmd, setAddingRmd] = useState(false);
  const [togglingRequestsId, setTogglingRequestsId] = useState(null);
  const [confirmDeleteRmdId, setConfirmDeleteRmdId] = useState(null);

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
    const token = localStorage.getItem("token");
    fetch(`${API}/api/v1/users/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load accounts.");
        return res.json();
      })
      .then((data) => { setUsers(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    if (activeTab !== "pending") return;
    setPendingLoading(true);
    const token = localStorage.getItem("token");
    fetch(`${API}/api/v1/pending-users/`, { headers: { Authorization: `Token ${token}` } })
      .then((res) => { if (!res.ok) throw new Error("Failed to load pending users."); return res.json(); })
      .then((data) => { setPendingUsers(data); setPendingLoading(false); })
      .catch((err) => { setPendingError(err.message); setPendingLoading(false); });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "rmd") return;
    setRmdProfilesLoading(true);
    const token = localStorage.getItem("token");
    fetch(`${API}/api/v1/rmd-profiles/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => { if (!res.ok) throw new Error("Failed to load RMD profiles."); return res.json(); })
      .then((data) => { setRmdProfiles(data); setRmdProfilesLoading(false); })
      .catch((err) => { setRmdActionError(err.message); setRmdProfilesLoading(false); });
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "hgi") return;
    setHgiLoading(true);
    const token = localStorage.getItem("token");
    const params = new URLSearchParams({ page: hgiPage });
    if (hgiSearch) params.append("search", hgiSearch);
    const doFetch = () => {
      fetch(`${API}/api/v1/hgi-codes/?${params}`, {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => { if (!res.ok) throw new Error("Failed to load HGI codes."); return res.json(); })
        .then((data) => {
          setHgiCodes(data.results);
          setHgiTotal(data.count);
          setHgiNumPages(data.num_pages);
          setHgiClaimedCount(data.claimed_count);
          setHgiLoading(false);
        })
        .catch((err) => { setHgiError(err.message); setHgiLoading(false); });
    };
    clearTimeout(hgiTimerRef.current);
    hgiTimerRef.current = setTimeout(doFetch, hgiSearch ? 300 : 0);
    return () => clearTimeout(hgiTimerRef.current);
  }, [activeTab, hgiPage, hgiSearch, hgiRefresh]);

  const handleDeletePending = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/pending-users/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        setPendingError("Failed to deny request.");
        return;
      }
      setPendingUsers((prev) => prev.filter((p) => p.id !== id));
      setConfirmDeletePendingId(null);
    } catch {
      setPendingError("Network error. Please try again.");
    }
  };

  const handleGrantPages = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/grant-pages/`, {
        method: "PATCH",
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ granted_pages: pageEdits }),
      });
      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to update page access.");
        return;
      }
      const data = await res.json();
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, granted_pages: data.granted_pages } : u));
      setManagingPagesId(null);
      setPageEdits([]);
    } catch {
      setActionError("Network error. Please try again.");
    }
  };

  const handleApprovePending = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/pending-users/${id}/approve/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setPendingError(data.error || "Failed to approve request.");
        return;
      }
      setPendingUsers((prev) => prev.map((p) => p.id === id ? { ...p, is_approved: true } : p));
      setConfirmApprovePendingId(null);
    } catch {
      setPendingError("Network error. Please try again.");
    }
  };

  const handleToggleRequests = async (userId) => {
    setTogglingRequestsId(userId);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/toggle-requests/`, {
        method: "PATCH",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setRmdActionError(data.error || "Failed to update access control.");
        setTogglingRequestsId(null);
        return;
      }
      const data = await res.json();
      setRmdProfiles((prev) => prev.map((p) =>
        p.user_id === userId ? { ...p, can_receive_requests: data.can_receive_requests } : p
      ));
    } catch {
      setRmdActionError("Network error. Please try again.");
    }
    setTogglingRequestsId(null);
  };

  const handleAddRmd = async () => {
    setAddingRmd(true);
    setRmdActionError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/rmd-profiles/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newRmd),
      });
      const data = await res.json();
      if (!res.ok) {
        setRmdActionError(data.error || "Failed to add RMD.");
        setAddingRmd(false);
        return;
      }
      setRmdProfiles((prev) => [...prev, data]);
      setNewRmd({ first_name: "", last_name: "", hgi_code: "" });
      setShowAddRmdForm(false);
    } catch {
      setRmdActionError("Network error. Please try again.");
    }
    setAddingRmd(false);
  };

  const handleDeleteRmd = async (profileId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/rmd-profiles/${profileId}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setRmdActionError(data.error || "Failed to delete RMD.");
        return;
      }
      setRmdProfiles((prev) => prev.filter((p) => p.id !== profileId));
      setConfirmDeleteRmdId(null);
    } catch {
      setRmdActionError("Network error. Please try again.");
    }
  };

  const q = query.toLowerCase();
  const filtered = users.filter((u) =>
    [u.username, u.first_name, u.last_name, u.email, u.hgi_code, u.role, u.upline_rmd_name]
      .some((f) => f?.toLowerCase().includes(q))
  );

  const registeredCodes = new Set(users.map((u) => u.hgi_code).filter(Boolean));

  const rmdQ = rmdQuery.toLowerCase();
  const filteredProfiles = rmdProfiles.filter((p) =>
    !rmdQ || [p.first_name, p.last_name, p.hgi_code, p.username, p.email]
      .some((f) => f?.toLowerCase().includes(rmdQ))
  );

  const fmt = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  const handleToggleActive = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/toggle-active/`, {
        method: "PATCH",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to update account status.");
        return;
      }
      const data = await res.json();
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, is_active: data.is_active } : u));
      setConfirmToggleId(null);
    } catch {
      setActionError("Network error. Please try again.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/delete/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to delete account.");
        return;
      }
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      setConfirmDeleteUserId(null);
    } catch {
      setActionError("Network error. Please try again.");
    }
  };

  const handleRoleSave = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/role/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: pendingRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to update role.");
        return;
      }
      setUsers((prev) =>
        prev.map((u) => u.id === userId ? { ...u, role: pendingRole } : u)
      );
      setEditingRoleId(null);
      setPendingRole("");
    } catch {
      setActionError("Network error. Please try again.");
    }
  };

  const handleAddCode = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/hgi-codes/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newCode),
      });
      if (!res.ok) {
        const data = await res.json();
        setHgiActionError(data.code?.[0] || data.error || "Failed to add code.");
        return;
      }
      setNewCode({ code: "", first_name: "", last_name: "", upline_rmd_name: "" });
      setShowAddForm(false);
      setHgiPage(1);
      setHgiRefresh((r) => r + 1);
    } catch {
      setHgiActionError("Network error. Please try again.");
    }
  };

  const handleHgiEditSave = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/hgi-codes/${id}/`, {
        method: "PATCH",
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(pendingHgiEdit),
      });
      if (!res.ok) {
        const data = await res.json();
        setHgiActionError(data.code?.[0] || data.error || "Failed to update code.");
        return;
      }
      setEditingHgiId(null);
      setPendingHgiEdit({});
      setHgiRefresh((r) => r + 1);
    } catch {
      setHgiActionError("Network error. Please try again.");
    }
  };

  const handleHgiDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/hgi-codes/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Token ${token}` },
      });
      if (!res.ok) {
        setHgiActionError("Failed to delete code.");
        return;
      }
      setConfirmDeleteHgiId(null);
      setHgiRefresh((r) => r + 1);
    } catch {
      setHgiActionError("Network error. Please try again.");
    }
  };

  return (
    <div className="admin-page">
      <main className="admin-content">

        {/* ── Tab switcher ── */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "accounts" ? "admin-tab-active" : ""}`}
            onClick={() => setActiveTab("accounts")}
          >
            <span className="material-icons">manage_accounts</span>
            Manage Accounts
          </button>
          <button
            className={`admin-tab ${activeTab === "rmd" ? "admin-tab-active" : ""}`}
            onClick={() => setActiveTab("rmd")}
          >
            <span className="material-icons">groups</span>
            RMD Accounts
          </button>
          <button
            className={`admin-tab ${activeTab === "hgi" ? "admin-tab-active" : ""}`}
            onClick={() => setActiveTab("hgi")}
          >
            <span className="material-icons">tag</span>
            Valid HGI Codes
          </button>
          <button
            className={`admin-tab ${activeTab === "pending" ? "admin-tab-active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            <span className="material-icons">pending</span>
            Pending Approvals
          </button>
        </div>

        {/* ── Section 1: Manage Accounts ── */}
        {activeTab === "accounts" && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">Administration</p>
            <h2 className="admin-title">Manage Accounts</h2>
            <p className="admin-sub">
              Search and manage every account that has access to this website.
            </p>
          </section>

          <section className="admin-search-section">
            <div className="admin-search-wrapper">
              <span className="material-icons admin-search-icon">search</span>
              <input
                className="admin-search-input"
                type="text"
                placeholder="Search by name, username, email, HGI code, role…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <span
                  className="material-icons admin-clear-icon"
                  onClick={() => setQuery("")}
                  title="Clear"
                >
                  close
                </span>
              )}
            </div>
            {!loading && !error && (
              <p className="admin-count">
                {filtered.length} of {users.length} account{users.length !== 1 ? "s" : ""}
              </p>
            )}
          </section>

          {actionError && (
            <div className="admin-action-error">
              <span className="material-icons" style={{ fontSize: 18 }}>error_outline</span>
              {actionError}
              <button className="admin-dismiss" onClick={() => setActionError("")}>×</button>
            </div>
          )}

          <section className="admin-results">
            {loading && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">hourglass_empty</span>
                <p>Loading accounts…</p>
              </div>
            )}

            {!loading && error && (
              <div className="admin-state admin-state-error">
                <span className="material-icons admin-state-icon">error_outline</span>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">person_search</span>
                <p>No accounts match your search.</p>
              </div>
            )}

            {!loading && !error && filtered.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HGI Code</th>
                      <th>Upline RMD</th>
                      <th className="admin-th-role">Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Date Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <React.Fragment key={u.id}>
                      <tr className={confirmToggleId === u.id ? "admin-row-confirming" : ""}>
                        <td className="admin-td-name">
                          <span className="admin-full-name">
                            {[u.first_name, u.last_name].filter(Boolean).join(" ") || u.username}
                          </span>
                          <span className="admin-username">@{u.username}</span>
                        </td>

                        <td className="admin-td-mono">{u.email || "—"}</td>
                        <td className="admin-td-mono">{u.hgi_code || "—"}</td>
                        <td>{u.upline_rmd_name || "—"}</td>

                        <td>
                          {!u.is_rmd_member && editingRoleId === u.id ? (
                            <div className="admin-role-edit">
                              <select
                                className="admin-role-select"
                                value={pendingRole}
                                onChange={(e) => setPendingRole(e.target.value)}
                              >
                                {ROLE_CHOICES.map((r) => (
                                  <option key={r} value={r}>{r}</option>
                                ))}
                              </select>
                              <button
                                className="admin-btn admin-btn-save"
                                onClick={() => handleRoleSave(u.id)}
                              >Save</button>
                              <button
                                className="admin-btn admin-btn-cancel"
                                onClick={() => { setEditingRoleId(null); setPendingRole(""); }}
                              >✕</button>
                            </div>
                          ) : (
                            <span className={`admin-role-badge admin-role-${(u.role || "").replace(/\s+/g, "").toLowerCase()}`}>
                              {u.role || "—"}
                            </span>
                          )}
                        </td>

                        <td>
                          <span className={`admin-status-badge ${u.is_active ? "admin-status-active" : "admin-status-inactive"}`}>
                            {u.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td>{fmt(u.last_login)}</td>
                        <td>{fmt(u.date_joined)}</td>

                        <td>
                          {confirmToggleId === u.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">{u.is_active ? "Deactivate?" : "Activate?"}</span>
                              <button
                                className={`admin-btn ${u.is_active ? "admin-btn-danger" : "admin-btn-save"}`}
                                onClick={() => handleToggleActive(u.id)}
                              >Yes</button>
                              <button
                                className="admin-btn admin-btn-cancel"
                                onClick={() => setConfirmToggleId(null)}
                              >No</button>
                            </div>
                          ) : confirmDeleteUserId === u.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">Delete?</span>
                              <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDeleteUser(u.id)}
                              >Yes</button>
                              <button
                                className="admin-btn admin-btn-cancel"
                                onClick={() => setConfirmDeleteUserId(null)}
                              >No</button>
                            </div>
                          ) : (
                            <div className="admin-actions">
                              {!u.is_rmd_member && (
                                <button
                                  className="admin-btn admin-btn-role"
                                  title="Change role"
                                  onClick={() => {
                                    setEditingRoleId(u.id);
                                    setPendingRole(u.role || "New Member");
                                    setConfirmToggleId(null);
                                    setConfirmDeleteUserId(null);
                                    setManagingPagesId(null);
                                    setActionError("");
                                  }}
                                >
                                  <span className="material-icons">manage_accounts</span>
                                </button>
                              )}
                              {u.role === "New Member" && !u.is_rmd_member && (
                                <button
                                  className={`admin-btn admin-btn-pages ${managingPagesId === u.id ? "admin-btn-pages--active" : ""}`}
                                  title="Manage page access"
                                  onClick={() => {
                                    if (managingPagesId === u.id) {
                                      setManagingPagesId(null);
                                    } else {
                                      setManagingPagesId(u.id);
                                      setPageEdits(u.granted_pages || []);
                                      setEditingRoleId(null);
                                      setConfirmToggleId(null);
                                      setConfirmDeleteUserId(null);
                                    }
                                  }}
                                >
                                  <span className="material-icons">key</span>
                                </button>
                              )}
                              <button
                                className={`admin-btn ${u.is_active ? "admin-btn-deactivate" : "admin-btn-activate"}`}
                                title={u.is_active ? "Deactivate account" : "Activate account"}
                                onClick={() => {
                                  setConfirmToggleId(u.id);
                                  setConfirmDeleteUserId(null);
                                  setEditingRoleId(null);
                                  setManagingPagesId(null);
                                  setActionError("");
                                }}
                              >
                                <span className="material-icons">{u.is_active ? "lock" : "lock_open"}</span>
                              </button>
                              <button
                                className="admin-btn admin-btn-delete"
                                title="Delete account"
                                onClick={() => {
                                  setConfirmDeleteUserId(u.id);
                                  setConfirmToggleId(null);
                                  setEditingRoleId(null);
                                  setManagingPagesId(null);
                                  setActionError("");
                                }}
                              >
                                <span className="material-icons">delete</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      {managingPagesId === u.id && (
                        <tr className="admin-pages-row">
                          <td colSpan={9}>
                            <div className="admin-pages-panel">
                              <p className="admin-pages-title">
                                <span className="material-icons" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>key</span>
                                Page access for <strong>{u.first_name || u.username}</strong>
                              </p>
                              {pageEdits.length > 0 && (
                                <div style={{ marginBottom: "0.85rem" }}>
                                  <p className="admin-pages-section-label">Currently has access to</p>
                                  <div className="admin-pages-tags">
                                    {pageEdits.map((path) => {
                                      const label = GRANTABLE_PAGES.find(g => g.path === path)?.label || path;
                                      return (
                                        <span key={path} className="admin-pages-tag">
                                          {label}
                                          <button
                                            className="admin-pages-tag-remove"
                                            title={`Revoke access to ${label}`}
                                            onClick={() => setPageEdits((prev) => prev.filter((p) => p !== path))}
                                          >×</button>
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                              {GRANTABLE_PAGES.filter(p => !pageEdits.includes(p.path)).length > 0 && (
                                <div>
                                  <p className="admin-pages-section-label">Grant access to</p>
                                  <div className="admin-pages-grid">
                                    {GRANTABLE_PAGES.filter(p => !pageEdits.includes(p.path)).map((page) => (
                                      <label key={page.path} className="admin-pages-checkbox">
                                        <input
                                          type="checkbox"
                                          checked={false}
                                          onChange={() => setPageEdits((prev) => [...prev, page.path])}
                                        />
                                        {page.label}
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="admin-pages-footer">
                                <button className="admin-btn admin-btn-save" onClick={() => handleGrantPages(u.id)}>Save</button>
                                <button className="admin-btn admin-btn-cancel" onClick={() => setManagingPagesId(null)}>Cancel</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>}

        {/* ── Section 2: RMD Accounts ── */}
        {activeTab === "rmd" && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">Team Management</p>
            <h2 className="admin-title">RMD Accounts</h2>
            <p className="admin-sub">
              View all RMD accounts and manually create new ones.
            </p>
          </section>

          <section className="admin-search-section">
            <div className="admin-hgi-search-row">
              <div className="admin-search-wrapper">
                <span className="material-icons admin-search-icon">search</span>
                <input
                  className="admin-search-input"
                  type="text"
                  placeholder="Search by name, username, email, HGI code…"
                  value={rmdQuery}
                  onChange={(e) => setRmdQuery(e.target.value)}
                />
                {rmdQuery && (
                  <span
                    className="material-icons admin-clear-icon"
                    onClick={() => setRmdQuery("")}
                    title="Clear"
                  >close</span>
                )}
              </div>
              <button
                className="admin-btn admin-btn-add"
                onClick={() => { setShowAddRmdForm(true); setRmdActionError(""); }}
              >
                <span className="material-icons">person_add</span>
                Add RMD
              </button>
            </div>
            {!rmdProfilesLoading && (
              <p className="admin-count">
                {rmdProfiles.length} RMD{rmdProfiles.length !== 1 ? "s" : ""}
                {" · "}
                <span className="admin-count-claimed">{rmdProfiles.filter(p => p.is_claimed).length} linked</span>
                {" · "}
                <span className="admin-count-unclaimed">{rmdProfiles.filter(p => !p.is_claimed).length} pending signup</span>
              </p>
            )}
          </section>

          {rmdActionError && (
            <div className="admin-action-error">
              <span className="material-icons" style={{ fontSize: 18 }}>error_outline</span>
              {rmdActionError}
              <button className="admin-dismiss" onClick={() => setRmdActionError("")}>×</button>
            </div>
          )}

          {showAddRmdForm && (
            <div className="admin-rmd-add-form">
              <div className="admin-rmd-form-grid admin-rmd-form-grid-3">
                <input
                  className="admin-hgi-input"
                  placeholder="First Name *"
                  value={newRmd.first_name}
                  onChange={(e) => setNewRmd((p) => ({ ...p, first_name: e.target.value }))}
                />
                <input
                  className="admin-hgi-input"
                  placeholder="Last Name *"
                  value={newRmd.last_name}
                  onChange={(e) => setNewRmd((p) => ({ ...p, last_name: e.target.value }))}
                />
                <input
                  className="admin-hgi-input"
                  placeholder="HGI Code *"
                  value={newRmd.hgi_code}
                  onChange={(e) => setNewRmd((p) => ({ ...p, hgi_code: e.target.value }))}
                />
              </div>
              <p className="admin-rmd-form-hint">
                The RMD will sign up themselves on the login page. Their account will be linked automatically when their HGI code matches.
              </p>
              <div className="admin-rmd-form-actions">
                <button
                  className="admin-btn admin-btn-save"
                  onClick={handleAddRmd}
                  disabled={addingRmd}
                >
                  {addingRmd ? "Adding…" : "Add to List"}
                </button>
                <button
                  className="admin-btn admin-btn-cancel"
                  onClick={() => {
                    setShowAddRmdForm(false);
                    setNewRmd({ first_name: "", last_name: "", hgi_code: "" });
                    setRmdActionError("");
                  }}
                >Cancel</button>
              </div>
            </div>
          )}

          <section className="admin-results">
            {rmdProfilesLoading && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">hourglass_empty</span>
                <p>Loading RMD list…</p>
              </div>
            )}
            {!rmdProfilesLoading && filteredProfiles.length === 0 && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">groups</span>
                <p>{rmdQuery ? "No RMDs match your search." : "No RMDs added yet."}</p>
              </div>
            )}
            {!rmdProfilesLoading && filteredProfiles.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>HGI Code</th>
                      <th>Account</th>
                      <th>Status</th>
                      <th>Team Requests</th>
                      <th>Last Login</th>
                      <th>Date Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProfiles.map((p) => (
                      <tr key={p.id}>
                        <td className="admin-td-name">
                          <span className="admin-full-name">{p.first_name} {p.last_name}</span>
                          {p.username && <span className="admin-username">@{p.username}</span>}
                        </td>
                        <td className="admin-td-mono">{p.hgi_code}</td>
                        <td>
                          {p.is_claimed ? (
                            <span className="admin-hgi-badge admin-hgi-claimed">Linked</span>
                          ) : (
                            <span className="admin-hgi-badge admin-hgi-unclaimed">Pending Signup</span>
                          )}
                        </td>
                        <td>
                          {p.is_claimed ? (
                            <span className={`admin-status-badge ${p.is_active ? "admin-status-active" : "admin-status-inactive"}`}>
                              {p.is_active ? "Active" : "Inactive"}
                            </span>
                          ) : <span className="admin-hgi-none">—</span>}
                        </td>
                        <td>
                          {p.is_claimed ? (
                            <div className="admin-access-cell">
                              <span className={`admin-access-badge ${p.can_receive_requests ? "admin-access-on" : "admin-access-off"}`}>
                                {p.can_receive_requests ? "Direct" : "Via Admin"}
                              </span>
                              <button
                                className={`admin-btn ${p.can_receive_requests ? "admin-btn-deactivate" : "admin-btn-activate"}`}
                                title={p.can_receive_requests ? "Revoke — requests go back to admin" : "Grant — this RMD receives their team's requests directly"}
                                disabled={togglingRequestsId === p.user_id}
                                onClick={() => handleToggleRequests(p.user_id)}
                              >
                                <span className="material-icons">
                                  {togglingRequestsId === p.user_id ? "hourglass_empty" : p.can_receive_requests ? "person_off" : "how_to_reg"}
                                </span>
                              </button>
                            </div>
                          ) : <span className="admin-hgi-none">—</span>}
                        </td>
                        <td>{p.is_claimed ? fmt(p.last_login) : "—"}</td>
                        <td>{p.is_claimed ? fmt(p.date_joined) : "—"}</td>
                        <td>
                          {confirmDeleteRmdId === p.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">Remove?</span>
                              <button className="admin-btn admin-btn-danger" onClick={() => handleDeleteRmd(p.id)}>Yes</button>
                              <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmDeleteRmdId(null)}>No</button>
                            </div>
                          ) : (
                            <button
                              className="admin-btn admin-btn-delete"
                              title="Remove from RMD list"
                              onClick={() => { setConfirmDeleteRmdId(p.id); setRmdActionError(""); }}
                            >
                              <span className="material-icons">delete</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>}

        {activeTab === "hgi" && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">CSV Registry</p>
            <h2 className="admin-title">Valid HGI Codes</h2>
            <p className="admin-sub">
              Add, edit, or remove HGI codes. Claimed codes are linked to existing accounts.
            </p>
          </section>

          <section className="admin-search-section">
            <div className="admin-hgi-search-row">
              <div className="admin-search-wrapper">
                <span className="material-icons admin-search-icon">search</span>
                <input
                  className="admin-search-input"
                  type="text"
                  placeholder="Search by code or name…"
                  value={hgiSearch}
                  onChange={(e) => { setHgiSearch(e.target.value); setHgiPage(1); }}
                />
                {hgiSearch && (
                  <span
                    className="material-icons admin-clear-icon"
                    onClick={() => { setHgiSearch(""); setHgiPage(1); }}
                    title="Clear"
                  >
                    close
                  </span>
                )}
              </div>
              <button
                className="admin-btn admin-btn-add"
                onClick={() => { setShowAddForm(true); setEditingHgiId(null); setHgiActionError(""); }}
              >
                <span className="material-icons">add</span>
                Add Code
              </button>
            </div>
            {!hgiLoading && !hgiError && (
              <p className="admin-count">
                {hgiTotal} code{hgiTotal !== 1 ? "s" : ""}
                {" "}·{" "}
                <span className="admin-count-claimed">{hgiClaimedCount} claimed</span>
                {" "}·{" "}
                <span className="admin-count-unclaimed">{hgiTotal - hgiClaimedCount} unclaimed</span>
              </p>
            )}
          </section>

          {hgiActionError && (
            <div className="admin-action-error">
              <span className="material-icons" style={{ fontSize: 18 }}>error_outline</span>
              {hgiActionError}
              <button className="admin-dismiss" onClick={() => setHgiActionError("")}>×</button>
            </div>
          )}

          {showAddForm && (
            <div className="admin-hgi-add-form">
              <input
                className="admin-hgi-input"
                placeholder="HGI Code *"
                value={newCode.code}
                onChange={(e) => setNewCode((p) => ({ ...p, code: e.target.value }))}
              />
              <input
                className="admin-hgi-input"
                placeholder="First Name"
                value={newCode.first_name}
                onChange={(e) => setNewCode((p) => ({ ...p, first_name: e.target.value }))}
              />
              <input
                className="admin-hgi-input"
                placeholder="Last Name"
                value={newCode.last_name}
                onChange={(e) => setNewCode((p) => ({ ...p, last_name: e.target.value }))}
              />
              <input
                className="admin-hgi-input"
                placeholder="Upline RMD"
                value={newCode.upline_rmd_name}
                onChange={(e) => setNewCode((p) => ({ ...p, upline_rmd_name: e.target.value }))}
              />
              <button className="admin-btn admin-btn-save" onClick={handleAddCode}>Add</button>
              <button
                className="admin-btn admin-btn-cancel"
                onClick={() => { setShowAddForm(false); setNewCode({ code: "", first_name: "", last_name: "", upline_rmd_name: "" }); }}
              >Cancel</button>
            </div>
          )}

          <section className="admin-results">
            {hgiLoading && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">hourglass_empty</span>
                <p>Loading HGI codes…</p>
              </div>
            )}

            {!hgiLoading && hgiError && (
              <div className="admin-state admin-state-error">
                <span className="material-icons admin-state-icon">error_outline</span>
                <p>{hgiError}</p>
              </div>
            )}

            {!hgiLoading && !hgiError && hgiTotal === 0 && !showAddForm && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">tag</span>
                <p>{hgiSearch ? "No codes match your search." : "No HGI codes have been added yet."}</p>
              </div>
            )}

            {!hgiLoading && !hgiError && hgiCodes.length > 0 && (
              <>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>HGI Code</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Upline RMD</th>
                      <th>Status</th>
                      <th>Claimed By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hgiCodes.map((c, idx) => {
                      const owner = users.find((u) => u.hgi_code === c.code);
                      const claimed = !!owner;
                      const isEditing = editingHgiId === c.id;
                      return (
                        <tr key={c.id} className={confirmDeleteHgiId === c.id ? "admin-row-deleting" : ""}>
                          <td className="admin-td-index">{(hgiPage - 1) * 100 + idx + 1}</td>
                          <td className="admin-td-mono">
                            {isEditing ? (
                              <input
                                className="admin-hgi-input admin-hgi-input-inline"
                                value={pendingHgiEdit.code ?? c.code}
                                onChange={(e) => setPendingHgiEdit((p) => ({ ...p, code: e.target.value }))}
                              />
                            ) : c.code}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                className="admin-hgi-input admin-hgi-input-inline"
                                value={pendingHgiEdit.first_name ?? c.first_name}
                                onChange={(e) => setPendingHgiEdit((p) => ({ ...p, first_name: e.target.value }))}
                              />
                            ) : (c.first_name || "—")}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                className="admin-hgi-input admin-hgi-input-inline"
                                value={pendingHgiEdit.last_name ?? c.last_name}
                                onChange={(e) => setPendingHgiEdit((p) => ({ ...p, last_name: e.target.value }))}
                              />
                            ) : (c.last_name || "—")}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                className="admin-hgi-input admin-hgi-input-inline"
                                value={pendingHgiEdit.upline_rmd_name ?? c.upline_rmd_name}
                                onChange={(e) => setPendingHgiEdit((p) => ({ ...p, upline_rmd_name: e.target.value }))}
                              />
                            ) : (c.upline_rmd_name || "—")}
                          </td>
                          <td>
                            <span className={`admin-hgi-badge ${claimed ? "admin-hgi-claimed" : "admin-hgi-unclaimed"}`}>
                              {claimed ? "Claimed" : "Unclaimed"}
                            </span>
                          </td>
                          <td>
                            {owner ? (
                              <span className="admin-hgi-owner">
                                {[owner.first_name, owner.last_name].filter(Boolean).join(" ") || owner.username}
                                <span className="admin-username"> @{owner.username}</span>
                              </span>
                            ) : (
                              <span className="admin-hgi-none">—</span>
                            )}
                          </td>
                          <td>
                            {isEditing ? (
                              <div className="admin-actions">
                                <button className="admin-btn admin-btn-save" onClick={() => handleHgiEditSave(c.id)}>Save</button>
                                <button className="admin-btn admin-btn-cancel" onClick={() => { setEditingHgiId(null); setPendingHgiEdit({}); }}>✕</button>
                              </div>
                            ) : confirmDeleteHgiId === c.id ? (
                              <div className="admin-confirm-delete">
                                <span className="admin-confirm-text">Sure?</span>
                                <button className="admin-btn admin-btn-danger" onClick={() => handleHgiDelete(c.id)}>Yes</button>
                                <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmDeleteHgiId(null)}>No</button>
                              </div>
                            ) : (
                              <div className="admin-actions">
                                <button
                                  className="admin-btn admin-btn-role"
                                  title="Edit"
                                  onClick={() => { setEditingHgiId(c.id); setPendingHgiEdit({}); setConfirmDeleteHgiId(null); setHgiActionError(""); }}
                                >
                                  <span className="material-icons">edit</span>
                                </button>
                                <button
                                  className="admin-btn admin-btn-delete"
                                  title="Delete"
                                  onClick={() => { setConfirmDeleteHgiId(c.id); setEditingHgiId(null); setHgiActionError(""); }}
                                >
                                  <span className="material-icons">delete</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {hgiNumPages > 1 && (
                <div className="admin-pagination">
                  <button
                    className="admin-btn admin-btn-cancel"
                    onClick={() => setHgiPage((p) => p - 1)}
                    disabled={hgiPage === 1}
                  >
                    <span className="material-icons">chevron_left</span>
                  </button>
                  <span className="admin-page-info">Page {hgiPage} of {hgiNumPages}</span>
                  <button
                    className="admin-btn admin-btn-cancel"
                    onClick={() => setHgiPage((p) => p + 1)}
                    disabled={hgiPage === hgiNumPages}
                  >
                    <span className="material-icons">chevron_right</span>
                  </button>
                </div>
              )}
              </>
            )}
          </section>
        </div>}

        {activeTab === "pending" && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">Administration</p>
            <h2 className="admin-title">Pending Approvals</h2>
            <p className="admin-sub">
              Signup requests that are waiting for account setup or have been approved.
            </p>
          </section>

          {pendingError && (
            <div className="admin-action-error">
              <span className="material-icons" style={{ fontSize: 18 }}>error_outline</span>
              {pendingError}
              <button className="admin-dismiss" onClick={() => setPendingError("")}>×</button>
            </div>
          )}

          <section className="admin-results">
            {pendingLoading && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">hourglass_empty</span>
                <p>Loading pending approvals…</p>
              </div>
            )}
            {!pendingLoading && pendingUsers.length === 0 && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">check_circle</span>
                <p>No pending approvals.</p>
              </div>
            )}
            {!pendingLoading && pendingUsers.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HGI Code</th>
                      <th>Upline RMD</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((p) => (
                      <tr key={p.id}>
                        <td className="admin-td-name">
                          <span className="admin-full-name">{p.first_name} {p.last_name}</span>
                        </td>
                        <td className="admin-td-mono">{p.email}</td>
                        <td className="admin-td-mono">{p.hgi_code || "—"}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <span style={!p.upline_rmd_name ? { color: "#9ca3af" } : undefined}>
                              {p.upline_rmd_name || "—"}
                            </span>
                            {!p.upline_rmd_has_direct_access && (
                              <span className="admin-pending-chip" title={p.upline_rmd_name ? "This RMD has no direct access — you need to approve or deny this request" : "No upline RMD assigned — you need to approve or deny this request"}>
                                <span className="material-icons" style={{ fontSize: "11px", verticalAlign: "middle" }}>warning</span>
                                {" "}Action needed
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={`admin-status-badge ${p.is_approved ? "admin-status-active" : "admin-status-inactive"}`}>
                            {p.is_approved ? "Approved — Awaiting Setup" : "Awaiting Approval"}
                          </span>
                        </td>
                        <td>{fmt(p.created_at)}</td>
                        <td>
                          {confirmApprovePendingId === p.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">Approve?</span>
                              <button className="admin-btn admin-btn-save" onClick={() => handleApprovePending(p.id)}>Yes</button>
                              <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmApprovePendingId(null)}>No</button>
                            </div>
                          ) : confirmDeletePendingId === p.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">Deny?</span>
                              <button className="admin-btn admin-btn-danger" onClick={() => handleDeletePending(p.id)}>Yes</button>
                              <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmDeletePendingId(null)}>No</button>
                            </div>
                          ) : (
                            <div className="admin-actions">
                              {!p.is_approved && (
                                <button
                                  className="admin-btn admin-btn-activate"
                                  title="Approve request"
                                  onClick={() => { setConfirmApprovePendingId(p.id); setConfirmDeletePendingId(null); }}
                                >
                                  <span className="material-icons">check_circle</span>
                                </button>
                              )}
                              <button
                                className="admin-btn admin-btn-delete"
                                title="Deny request"
                                onClick={() => { setConfirmDeletePendingId(p.id); setConfirmApprovePendingId(null); }}
                              >
                                <span className="material-icons">cancel</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>}

      </main>
    </div>
  );
}
