import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f1f5f9",
      fontFamily: "Inter, sans-serif",
    },

    card: {
      width: "100%",
      maxWidth: 420,
      background: "#ffffff",
      padding: 28,
      borderRadius: 14,
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    },

    backBtn: {
      background: "none",
      border: "none",
      color: "#2563eb",
      cursor: "pointer",
      fontSize: 14,
      marginBottom: 12,
    },

    title: {
      margin: "8px 0",
      fontSize: 24,
      fontWeight: 700,
    },

    subtitle: {
      fontSize: 14,
      color: "#6b7280",
      marginBottom: 20,
    },

    label: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 6,
      display: "block",
    },

    inputWrapper: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: "10px 12px",
      marginBottom: 18,
    },

    icon: {
      marginRight: 8,
      color: "#9ca3af",
    },

    input: {
      border: "none",
      outline: "none",
      width: "100%",
      fontSize: 14,
    },

    submitBtn: {
      width: "100%",
      padding: 12,
      background: "#1e3a8a",
      color: "#fff",
      border: "none",
      borderRadius: 10,
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    // Replace with real auth logic
    setTimeout(() => {
      alert(`Password reset link sent to ${email}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/restaurantdashboardsignin")}
        >
          ← Back to sign in
        </button>

        <h2 style={styles.title}>Reset your password</h2>
        <p style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password
        </p>

        <label style={styles.label}>Email</label>
        <div style={styles.inputWrapper}>
          <span style={styles.icon}>✉</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </div>
    </div>
  );
}
