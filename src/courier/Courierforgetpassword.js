import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later: trigger backend email reset logic
    navigate("/courierresetpasswordcode");
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
          margin-bottom: 16px;
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

        .submit-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #111827;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: #030712;
        }

        .back-link {
          margin-top: 14px;
          text-align: center;
          font-size: 14px;
          color: #374151;
          cursor: pointer;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="title">Forgot Password</h2>
          <p className="subtitle">
            Enter your email and we’ll send you a reset code
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <span>✉️</span>
                <input
                  type="email"
                  placeholder="rider@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Send Reset Code
            </button>
          </form>

          <div
            className="back-link"
            onClick={() => navigate("/courierLogin")}
          >
            ← Back to sign in
          </div>
        </div>
      </div>
    </>
  );
}
