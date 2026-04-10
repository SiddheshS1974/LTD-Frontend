import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SetupAccount() {
  const { token } = useParams();
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    // Check if token is valid
    fetch(`http://localhost:8000/api/v1/verify-token/${token}/`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setValid(true);
        } else {
          setError("This link is invalid or has already been used.");
        }
      });
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("http://localhost:8000/api/v1/setup-account/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        username: formData.username,
        password: formData.password
      })
    });

    const data = await response.json();
    if (response.ok) {
      alert("Account created successfully! You can now log in.");
      window.location.href = "/login";
    } else {
      setError(data.error);
    }
  };

  if (!valid) {
    return (
      <div className="setup-wrapper">
        <div className="setup-card">
          <h1>Invalid Link</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="setup-wrapper">
      <div className="setup-card">
        <h1>Create Your Account</h1>
        <p>You have been approved! Set up your username and password below.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}