import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierResetCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary static code
    if (code === "1234") {
      navigate("/couriernewpassword");
    } else {
      setError("Invalid code. Please try again.");
    }
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
          font-size: 16px;
          letter-spacing: 4px;
          text-align: center;
        }

        .error {
          color: #dc2626;
          font-size: 13px;
          margin-bottom: 10px;
          text-align: center;
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
        }

        .submit-btn:hover {
          background: #030712;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <h2 className="title">Enter Reset Code</h2>
          <p className="subtitle">
            Enter the 4-digit code sent to your email
          </p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Confirmation Code</label>
              <div className="input-wrapper">
                <span>🔢</span>
                <input
                  type="text"
                  maxLength="4"
                  placeholder="1234"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Verify Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
