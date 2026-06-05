import { useState, useEffect } from "react";
import API from "./api";


export default function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ firstName: "", lastName: "", email: "", hgiCode: "" });
  const [signInMessage, setSignInMessage] = useState({ text: "", type: "" });
  const [signUpMessage, setSignUpMessage] = useState({ text: "", type: "" });
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    let opened = false;
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !opened) {
        opened = true;
        setIsOpen(true);
        document.body.style.overflow = "hidden";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API}/api/v1/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInData.username,
        password: signInData.password
      })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("is_staff", data.is_staff ? "true" : "false");
      localStorage.setItem("role", data.role ?? "");
      localStorage.setItem("first_name", data.first_name ?? "");
      localStorage.setItem("last_name", data.last_name ?? "");
      localStorage.setItem("username", data.username ?? "");
      window.location.href = "/home";
    } else {
      setSignInMessage({ text: "Incorrect username or password.", type: "error" });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpData.firstName || !signUpData.lastName || !signUpData.email || !signUpData.hgiCode) {
      setSignUpMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }
    try {
      const response = await fetch(`${API}/api/v1/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          hgiCode: signUpData.hgiCode
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSignUpMessage({ text: "Your request has been sent to your RMD for approval!", type: "success" });
      } else {
        setSignUpMessage({ text: data.error || "Something went wrong. Please try again.", type: "error" });
      }
    } catch {
      setSignUpMessage({ text: "Could not connect to server. Please try again.", type: "error" });
    }
  };
  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      <div className="mobile-auth-toggle">
        {!isRightPanelActive ? (
          <p>Don't have an account?{" "}
            <span className="mobile-toggle-link" onClick={() => setIsRightPanelActive(true)}>Sign Up</span>
          </p>
        ) : (
          <p>Already have an account?{" "}
            <span className="mobile-toggle-link" onClick={() => setIsRightPanelActive(false)}>Sign In</span>
          </p>
        )}
      </div>
      {/* Sign Up Form */}
    <div className="form-container sign-up-container">
      <form onSubmit={handleSignUp}>
        <h1 className = "header">Create Account</h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={signUpData.firstName}
          onChange={handleSignUpChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={signUpData.lastName}
          onChange={handleSignUpChange}
        />
        <div className="input-icon-wrapper">
          <span className="material-icons input-icon">mail</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={handleSignUpChange}
          />
        </div>
        <div className="input-icon-wrapper">
          <span className="material-icons input-icon">tag</span>
          <input
            type="text"
            name="hgiCode"
            placeholder="HGI Code"
            value={signUpData.hgiCode}
            onChange={handleSignUpChange}
          />
        </div>
        {signUpMessage.text && (
          <div className={`notification ${signUpMessage.type}`}>
            {signUpMessage.text}
          </div>
        )}
        <button type="submit">Sign Up</button>
      </form>
    </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form className="sign-in-form" onSubmit={handleSignIn}>
          <h1 className = "header">Sign In</h1>
          {signInMessage.text && (
            <div className={`notification ${signInMessage.type}`}>
              {signInMessage.text}
            </div>
          )}
          <div className="input-icon-wrapper">
            <span className="material-icons input-icon">person</span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={signInData.username}
              onChange={handleSignInChange}
            />
          </div>
          <div className="input-icon-wrapper">
            <span className="material-icons input-icon">lock</span>
              <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={signInData.password}
              onChange={handleSignInChange}
            />
            <span
              className="material-icons input-icon-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          <a href="/forgot-password">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Sliding Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Login with your personal info.</p>
            <button
              className="ghost"
              id="signIn"
              onClick={() => setIsRightPanelActive(false)}
            >
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome to the LTD Program!</h1>
            <p>Don't have an account? Enter your personal details to get started.</p>
            <button
              className="ghost"
              id="signUp"
              onClick={() => setIsRightPanelActive(true)}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}