import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // hook to redirect

  // Handle sign in
  const handleSignIn = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    navigate("/restaurantdashboard");
  };

  // Handle Google login
  const handleGoogleSignIn = () => {
    alert("Google sign-in successful");
    navigate("/restaurantdashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoBox}>
          <div style={styles.logo}>🍴</div>
          <small style={{ color: "#777" }}>Restaurant Hub</small>
        </div>

        <h2 style={styles.title}>Welcome to Hooks Restaurant Hub</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        {/* Google Sign In */}
        <button style={styles.googleBtn} onClick={handleGoogleSignIn}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            style={{ width: 18 }}
          />
          Continue with Google
        </button>

        <div style={styles.or}>OR</div>

        {/* Email */}
        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        {/* Password */}
        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {/* Sign in */}
        <button style={styles.signInBtn} onClick={handleSignIn}>
          Sign in
        </button>

        {/* Footer */}
        <div style={styles.footer}>
          <span
            style={styles.link}
            onClick={() => navigate("/restaurantdashboardforgotpassword")}
          >
            Forgot password?
          </span>

          <span>
            Need an account?{" "}
            <b
              style={styles.link}
              onClick={() =>
                navigate("/restaurantdashboardcreateaccount")
              }
            >
              Sign up
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    fontFamily: "Inter, Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: "32px 28px",
    borderRadius: 14,
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  logoBox: { marginBottom: 20 },
  logo: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    margin: "0 auto 6px",
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 6,
  },
  subtitle: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 24,
  },
  googleBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  or: { margin: "18px 0", fontSize: 13, color: "#9ca3af" },
  label: {
    display: "block",
    textAlign: "left",
    fontSize: 13,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    fontSize: 14,
  },
  signInBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    marginTop: 18,
    background: "#1f2937",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  footer: {
    marginTop: 18,
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    color: "#6b7280",
  },
  link: { color: "#2563eb", cursor: "pointer" },
};
