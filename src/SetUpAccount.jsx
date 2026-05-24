import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "./api";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

function passwordRules(pwd) {
  return {
    length: pwd.length >= 8,
    letter: /[a-zA-Z]/.test(pwd),
    number: /[0-9]/.test(pwd),
  };
}

export default function SetupAccount() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null | 'checking' | 'available' | 'taken' | 'invalid'
  const debounceRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/v1/verify-token/${token}/`)
      .then(res => res.json())
      .then(data => {
        if (data.valid) setValid(true);
        else setError("This link is invalid or has already been used.");
      });
  }, [token]);

  useEffect(() => {
    const username = formData.username;
    if (!username) { setUsernameStatus(null); return; }
    if (!USERNAME_REGEX.test(username)) { setUsernameStatus('invalid'); return; }

    setUsernameStatus('checking');
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(`${API}/api/v1/check-username/?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => setUsernameStatus(data.available ? 'available' : 'taken'));
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [formData.username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!USERNAME_REGEX.test(formData.username)) {
      setError("Username must be 3–20 characters: letters, numbers, and underscores only.");
      return;
    }
    if (usernameStatus === 'taken') {
      setError("That username is already taken. Please choose another.");
      return;
    }
    if (usernameStatus === 'checking') {
      setError("Please wait while we check your username.");
      return;
    }

    const rules = passwordRules(formData.password);
    if (!rules.length || !rules.letter || !rules.number) {
      setError("Password does not meet the requirements below.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch(`${API}/api/v1/setup-account/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, username: formData.username, password: formData.password })
    });

    const data = await response.json();
    if (response.ok) setSuccess(true);
    else setError(data.error);
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

  if (success) {
    return (
      <div className="setup-wrapper">
        <div className="setup-card">
          <h1>Account Created!</h1>
          <p>Your username and password have been set up successfully.</p>
          <button onClick={() => navigate('/login')}>Log In Now</button>
        </div>
      </div>
    );
  }

  const rules = passwordRules(formData.password);

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
          <div className="field-hint">
            {usernameStatus === 'checking' && <span className="hint-checking">Checking availability...</span>}
            {usernameStatus === 'available' && <span className="hint-ok">&#10003; Username is available</span>}
            {usernameStatus === 'taken' && <span className="hint-error">&#10005; Username is already taken</span>}
            {usernameStatus === 'invalid' && <span className="hint-error">3–20 characters, letters, numbers and underscores only</span>}
          </div>

          <input
            type="password"
            name="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && (
            <div className="pwd-rules">
              <span className={rules.length ? "rule-ok" : "rule-fail"}>&#10003; At least 8 characters</span>
              <span className={rules.letter ? "rule-ok" : "rule-fail"}>&#10003; At least one letter</span>
              <span className={rules.number ? "rule-ok" : "rule-fail"}>&#10003; At least one number</span>
            </div>
          )}

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