import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

import "../Login.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleRegister(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Validate required fields
    if (
      !trimmedName ||
      !trimmedEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    // Validate name
    if (trimmedName.length < 2) {
      setError("Please enter a name with at least 2 characters.");
      return;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Read existing users
    let users = [];

    try {
      users = JSON.parse(
        localStorage.getItem("learnSphereUsers") || "[]"
      );

      if (!Array.isArray(users)) {
        users = [];
      }
    } catch {
      setError("Unable to read account information. Please try again.");
      return;
    }

    // Check whether email is already registered
    const existingUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() === trimmedEmail
    );

    if (existingUser) {
      setError(
        "An account with this email already exists. Please log in."
      );
      return;
    }

    // Create new account
    const newUser = {
      id: Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      password,
    };

    try {
      users.push(newUser);

      localStorage.setItem(
        "learnSphereUsers",
        JSON.stringify(users)
      );
    } catch {
      setError("Unable to save your account. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setSuccess("Account created successfully! Redirecting to login...");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
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

          <h1>Start your learning journey!</h1>

          <p>
            Create your account, discover new skills, and take
            the next step towards your personal and professional
            goals.
          </p>

          <div className="register-benefits">
            <div>
              <CheckCircle size={18} />
              Access your enrolled courses
            </div>

            <div>
              <CheckCircle size={18} />
              Track your learning progress
            </div>

            <div>
              <CheckCircle size={18} />
              Learn at your own pace
            </div>
          </div>
        </div>

        <div className="auth-decoration-footer">
          Learn today. Lead tomorrow.
        </div>
      </section>

      {/* RIGHT REGISTRATION SECTION */}

      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/" className="auth-back-link">
            ← Back to Home
          </Link>

          <div className="auth-heading">
            <span className="auth-small-label">
              CREATE YOUR ACCOUNT
            </span>

            <h2>Join LearnSphere</h2>

            <p>
              Enter your details to create your learning account.
            </p>
          </div>

          {/* REGISTRATION FORM */}

          <form
            onSubmit={handleRegister}
            className="auth-form"
            noValidate
          >
            {/* FULL NAME */}

            <div className="auth-input-group">
              <label htmlFor="register-name">
                Full Name
              </label>

              <div className="auth-input-wrapper">
                <User size={19} aria-hidden="true" />

                <input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* EMAIL ADDRESS */}

            <div className="auth-input-group">
              <label htmlFor="register-email">
                Email Address
              </label>

              <div className="auth-input-wrapper">
                <Mail size={19} aria-hidden="true" />

                <input
                  id="register-email"
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

            {/* PASSWORD */}

            <div className="auth-input-group">
              <label htmlFor="register-password">
                Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={19} aria-hidden="true" />

                <input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
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

            {/* CONFIRM PASSWORD */}

            <div className="auth-input-group">
              <label htmlFor="register-confirm-password">
                Confirm Password
              </label>

              <div className="auth-input-wrapper">
                <Lock size={19} aria-hidden="true" />

                <input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError("");
                    setSuccess("");
                  }}
                  autoComplete="new-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
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
                "Creating Account..."
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}

          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </div>

          <p className="auth-security-note">
            Your next chapter starts with learning.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;