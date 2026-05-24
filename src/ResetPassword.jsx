import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "./api";

export default function ResetPassword() {
  const { token } = useParams();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [valid, setValid] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/v1/verify-reset-token/${token}/`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) setValid(true);
        else setMessage({ text: "This link is invalid or has expired.", type: "error" });
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    const response = await fetch(`${API}/api/v1/reset-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: formData.password })
    });

    const data = await response.json();
    if (response.ok) {
      setMessage({ text: "Password reset successfully! Redirecting to login...", type: "success" });
      setTimeout(() => window.location.href = "/login", 2000);
    } else {
      setMessage({ text: data.error, type: "error" });
    }
  };

  if (!valid && message.text) {
    return (
      <div className="setup-wrapper">
        <div className="setup-card">
          <h1>Invalid Link</h1>
          <p>{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-wrapper">
      <div className="setup-card">
        <h1>Reset Password</h1>
        <p>Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          {message.text && (
            <div className={`notification ${message.type}`}>
              {message.text}
            </div>
          )}
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}