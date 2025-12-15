import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    alert("Password reset link sent to: " + email);
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.avatar}>🔒</div>

        <h2 style={styles.heading}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button style={styles.resetBtn} onClick={resetPassword}>
          SEND RESET LINK
        </button>

        <div style={styles.backLink}>
          <Link to="/login" style={styles.link}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: "#f2f4f7",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    background: "#fff",
    width: "100%",
    maxWidth: "420px",
    padding: "30px 25px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  avatar: {
    width: "70px",
    height: "70px",
    background: "#4aa3df",
    borderRadius: "8px",
    margin: "0 auto 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "30px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: "25px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  resetBtn: {
    width: "100%",
    padding: "14px",
    background: "#38c2b5",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  backLink: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
  },
  link: {
    color: "#4aa3df",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
