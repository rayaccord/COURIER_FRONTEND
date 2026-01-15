import React from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

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
          background: linear-gradient(135deg, #d9dee6, #eef1f6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          width: 380px;
          background: #f7f8fa;
          border-radius: 14px;
          padding: 26px 24px 28px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .back-btn {
          background: none;
          border: none;
          color: #555;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          margin-bottom: 12px;
        }

        .title {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 22px;
          color: #222;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          font-size: 14px;
          color: #444;
          display: block;
          margin-bottom: 6px;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 10px 12px;
        }

        .input-wrapper .icon {
          margin-right: 8px;
          font-size: 16px;
          opacity: 0.6;
        }

        .input-wrapper input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 14px;
          background: transparent;
        }

        .submit-btn {
          margin-top: 18px;
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: none;
          background: #2f2b2e;
          color: white;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #1f1c1e;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <button
            className="back-btn"
            onClick={() => navigate("/Restaurantdashboardsignin")}
          >
            ← Back to sign in
          </button>

          <h2 className="title">Create your account</h2>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="icon">✉️</span>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Min. 8 characters" />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Re-enter password" />
            </div>
          </div>

          <button className="submit-btn">Create account</button>
        </div>
      </div>
    </>
  );
}
