import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierNewPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Later: API call to save new password
    navigate("/courierdashboard");
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, Helvetica, Arial, sans-serif;
        }

        body {
          margin: 0;
        }

        .auth-wrapper {
          height: 100vh;
          width: 100%;
          background: linear-gradient(135deg, #e5e7eb, #f3f4f6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          width: 380px;
          background: #ffffff;
          border-radius: 14px;
          padding: 26px 24px 28px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .title {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #111827;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-group label {
          font-size: 14px;
          color: #374151;
          display: block;
          margin-bottom: 6px;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 10px 12px;
        }

        .input-wrapper span {
          margin-right: 8px;
        }

        .input-wrapper input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
        }

        .hint {
          font-size: 12px;
          color: #6b7280;
          margin-top: 6px;
        }

        .error {
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 10px;
          text-align: center;
        }

        .submit-btn {
          margin-top: 14px;
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #111827;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #030712;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="title">Set New Password</h2>
          <p className="subtitle">Create a strong password to secure your account</p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="hint">
                Enter strong password with at least symbols, numbers, and 8 characters
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Confirm & Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
