import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import API from "./api";

const ROLE_CHOICES = ["New Member", "Licensed", "Admin"];

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

export default function RmdPanel() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [editingRoleId, setEditingRoleId] = useState(null);
  const [pendingRole, setPendingRole] = useState("");
  const [confirmToggleId, setConfirmToggleId] = useState(null);
  const [managingPagesId, setManagingPagesId] = useState(null);
  const [pageEdits, setPageEdits] = useState([]);

  const [activeTab, setActiveTab] = useState("members");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);
  const [pendingError, setPendingError] = useState("");
  const [confirmApprovePendingId, setConfirmApprovePendingId] = useState(null);
  const [confirmDenyPendingId, setConfirmDenyPendingId] = useState(null);

  const hasDirectAccess = localStorage.getItem("can_receive_requests") === "true";

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
    fetch(`${API}/api/v1/rmd/members/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load members.");
        return res.json();
      })
      .then((data) => { setMembers(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    if (activeTab !== "pending" || !hasDirectAccess) return;
    setPendingLoading(true);
    const token = localStorage.getItem("token");
    fetch(`${API}/api/v1/rmd/pending/`, { headers: { Authorization: `Token ${token}` } })
      .then((res) => { if (!res.ok) throw new Error("Failed to load pending requests."); return res.json(); })
      .then((data) => { setPendingRequests(data); setPendingLoading(false); })
      .catch((err) => { setPendingError(err.message); setPendingLoading(false); });
  }, [activeTab]);

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
      setMembers((prev) => prev.map((u) => u.id === userId ? { ...u, is_active: data.is_active } : u));
      setConfirmToggleId(null);
    } catch {
      setActionError("Network error. Please try again.");
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
      setMembers((prev) => prev.map((u) => u.id === userId ? { ...u, granted_pages: data.granted_pages } : u));
      setManagingPagesId(null);
      setPageEdits([]);
    } catch {
      setActionError("Network error. Please try again.");
    }
  };

  const handleRoleSave = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/v1/users/${userId}/role/`, {
        method: "PATCH",
        headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ role: pendingRole }),
      });
      if (!res.ok) {
        const data = await res.json();
        setActionError(data.error || "Failed to update role.");
        return;
      }
      setMembers((prev) => prev.map((u) => u.id === userId ? { ...u, role: pendingRole } : u));
      setEditingRoleId(null);
      setPendingRole("");
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
      setPendingRequests((prev) => prev.map((p) => p.id === id ? { ...p, is_approved: true } : p));
      setConfirmApprovePendingId(null);
    } catch {
      setPendingError("Network error. Please try again.");
    }
  };

  const handleDenyPending = async (id) => {
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
      setPendingRequests((prev) => prev.filter((p) => p.id !== id));
      setConfirmDenyPendingId(null);
    } catch {
      setPendingError("Network error. Please try again.");
    }
  };

  const q = query.toLowerCase();
  const filtered = members.filter((u) =>
    [u.username, u.first_name, u.last_name, u.email, u.hgi_code, u.role]
      .some((f) => f?.toLowerCase().includes(q))
  );

  const fmt = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  };

  return (
    <div className="admin-page">
      <main className="admin-content">

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "members" ? "admin-tab-active" : ""}`}
            onClick={() => setActiveTab("members")}
          >
            <span className="material-icons">group</span>
            My Members
          </button>
          {hasDirectAccess && (
            <button
              className={`admin-tab ${activeTab === "pending" ? "admin-tab-active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              <span className="material-icons">pending</span>
              Pending Approvals
              {pendingRequests.filter((p) => !p.is_approved).length > 0 && (
                <span className="admin-pending-badge">
                  {pendingRequests.filter((p) => !p.is_approved).length}
                </span>
              )}
            </button>
          )}
        </div>

        {activeTab === "members" && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">RMD Dashboard</p>
            <h2 className="admin-title">My Members</h2>
            <p className="admin-sub">
              View all members who have selected you as their upline RMD.
            </p>
          </section>

          <section className="admin-search-section">
            <div className="admin-search-wrapper">
              <span className="material-icons admin-search-icon">search</span>
              <input
                className="admin-search-input"
                type="text"
                placeholder="Search by name, username, email, HGI code…"
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
                {filtered.length} of {members.length} member{members.length !== 1 ? "s" : ""}
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
                <p>Loading members…</p>
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
                <p>
                  {query
                    ? "No members match your search."
                    : "No members have selected you as their upline RMD yet."}
                </p>
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
                      <th className="admin-th-role">Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Date Joined</th>
                      {hasDirectAccess && <th>Actions</th>}
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
                        <td>
                          {hasDirectAccess && !u.is_rmd_member && editingRoleId === u.id ? (
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
                              <button className="admin-btn admin-btn-save" onClick={() => handleRoleSave(u.id)}>Save</button>
                              <button className="admin-btn admin-btn-cancel" onClick={() => { setEditingRoleId(null); setPendingRole(""); }}>✕</button>
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
                        {hasDirectAccess && (
                          <td>
                            {confirmToggleId === u.id ? (
                              <div className="admin-confirm-delete">
                                <span className="admin-confirm-text">{u.is_active ? "Deactivate?" : "Activate?"}</span>
                                <button
                                  className={`admin-btn ${u.is_active ? "admin-btn-danger" : "admin-btn-save"}`}
                                  onClick={() => handleToggleActive(u.id)}
                                >Yes</button>
                                <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmToggleId(null)}>No</button>
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
                                    setEditingRoleId(null);
                                    setManagingPagesId(null);
                                    setActionError("");
                                  }}
                                >
                                  <span className="material-icons">{u.is_active ? "lock" : "lock_open"}</span>
                                </button>
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                      {managingPagesId === u.id && (
                        <tr className="admin-pages-row">
                          <td colSpan={8}>
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

        {activeTab === "pending" && hasDirectAccess && <div className="admin-panel">
          <section className="admin-header">
            <p className="admin-eyebrow">RMD Dashboard</p>
            <h2 className="admin-title">Pending Approvals</h2>
            <p className="admin-sub">
              Signup requests from members who selected you as their upline RMD.
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
            {!pendingLoading && pendingRequests.length === 0 && (
              <div className="admin-state">
                <span className="material-icons admin-state-icon">check_circle</span>
                <p>No pending approvals.</p>
              </div>
            )}
            {!pendingLoading && pendingRequests.length > 0 && (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>HGI Code</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((p) => (
                      <tr key={p.id}>
                        <td className="admin-td-name">
                          <span className="admin-full-name">{p.first_name} {p.last_name}</span>
                        </td>
                        <td className="admin-td-mono">{p.email}</td>
                        <td className="admin-td-mono">{p.hgi_code || "—"}</td>
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
                          ) : confirmDenyPendingId === p.id ? (
                            <div className="admin-confirm-delete">
                              <span className="admin-confirm-text">Deny?</span>
                              <button className="admin-btn admin-btn-danger" onClick={() => handleDenyPending(p.id)}>Yes</button>
                              <button className="admin-btn admin-btn-cancel" onClick={() => setConfirmDenyPendingId(null)}>No</button>
                            </div>
                          ) : (
                            <div className="admin-actions">
                              {!p.is_approved && (
                                <button
                                  className="admin-btn admin-btn-activate"
                                  title="Approve request"
                                  onClick={() => { setConfirmApprovePendingId(p.id); setConfirmDenyPendingId(null); }}
                                >
                                  <span className="material-icons">check_circle</span>
                                </button>
                              )}
                              <button
                                className="admin-btn admin-btn-delete"
                                title="Deny request"
                                onClick={() => { setConfirmDenyPendingId(p.id); setConfirmApprovePendingId(null); }}
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
