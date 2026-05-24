import { useState, useEffect } from "react";
import "./AdminPanel.css";

export default function RmdPanel() {
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    fetch("http://localhost:8000/api/v1/rmd/members/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load members.");
        return res.json();
      })
      .then((data) => { setMembers(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

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
        <div className="admin-panel">
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
                      <th>Last Login</th>
                      <th>Date Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u) => (
                      <tr key={u.id}>
                        <td className="admin-td-name">
                          <span className="admin-full-name">
                            {[u.first_name, u.last_name].filter(Boolean).join(" ") || u.username}
                          </span>
                          <span className="admin-username">@{u.username}</span>
                        </td>
                        <td className="admin-td-mono">{u.email || "—"}</td>
                        <td className="admin-td-mono">{u.hgi_code || "—"}</td>
                        <td>
                          <span
                            className={`admin-role-badge admin-role-${(u.role || "")
                              .replace(/\s+/g, "")
                              .toLowerCase()}`}
                          >
                            {u.role || "—"}
                          </span>
                        </td>
                        <td>{fmt(u.last_login)}</td>
                        <td>{fmt(u.date_joined)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
