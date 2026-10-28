import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

import "../Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim().toLowerCase();

    // Validate empty fields
    if (!trimmedEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Read registered users from LocalStorage
    let users = [];

    try {
      users = JSON.parse(
        localStorage.getItem("learnSphereUsers") || "[]"
      );

      if (!Array.isArray(users)) {
        users = [];
      }
    } catch {
      setError("Unable to read account details. Please register again.");
      return;
    }

    // Find matching account
    const user = users.find(
      (item) =>
        item.email?.trim().toLowerCase() === trimmedEmail &&
        item.password === password
    );

    if (!user) {
      setError(
        "Invalid email or password. Please check your details or create an account."
      );
      return;
    }

    // Save current user session
    try {
      localStorage.setItem(
        "learnSphereCurrentUser",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );
    } catch {
      setError("Unable to save your login session. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setSuccess("Login successful! Redirecting to the home page...");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="auth-page">
      {/* LEFT DECORATIVE SECTION */}

      <section className="auth-decoration">
        <div className="auth-decoration-circle circle-one"></div>
        <div className="auth-decoration-circle circle-two"></div>

        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon">
            <BookOpen size={28} />
          </span>

          <span>
            Learn<span>Sphere</span>
          </span>
        </Link>

        <div className="auth-message">
          <GraduationCap size={48} />

          <h1>Welcome back, learner!</h1>

          <p>
            Continue your learning journey and take another step
            towards achieving your goals. Your next achievement
            starts here.
          </p>
        </div>

        <div className="auth-decoration-footer">
          Learn today. Lead tomorrow.
        </div>
      </section>

      {/* RIGHT LOGIN SECTION */}

      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/" className="auth-back-link">
            ← Back to Home
          </Link>

          <div className="auth-heading">
            <span className="auth-small-label">WELCOME BACK</span>

            <h2>Sign in to your account</h2>

            <p>
              Enter your details below to continue learning.
            </p>
          </div>

          {/* LOGIN FORM */}

          <form
            onSubmit={handleLogin}
            className="auth-form"
            noValidate
          >
            {/* EMAIL FIELD */}

            <div className="auth-input-group">
              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">
                <Mail size={19} aria-hidden="true" />

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD FIELD */}

            <div className="auth-input-group">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={19} aria-hidden="true" />

                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div
                className="auth-message-box error-message"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* SUCCESS MESSAGE */}

            {success && (
              <div
                className="auth-message-box success-message"
                role="status"
              >
                {success}
              </div>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Signing In..."
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* REGISTRATION LINK */}

          <div className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create account</Link>
          </div>

          <p className="auth-security-note">
            Your learning journey starts here.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;