import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    if (response.ok) {
      setMessage({ text: "Password reset email sent! Check your inbox.", type: "success" });
    } else {
      setMessage({ text: data.error, type: "error" });
    }
  };

  return (
    <div className="setup-wrapper">
      <div className="setup-card">
        <h1>Forgot Password</h1>
        <p>Enter your email and we'll send you a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {message.text && (
            <div className={`notification ${message.type}`}>
              {message.text}
            </div>
          )}
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}