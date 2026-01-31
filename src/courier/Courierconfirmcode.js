import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierConfirmCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const CORRECT_CODE = "1234";

  const handleVerify = () => {
    if (code.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    if (code === CORRECT_CODE) {
      setError("");
      navigate("/courierdashboard"); // courier home/dashboard
    } else {
      setError("Invalid confirmation code");
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
          width: 360px;
          background: #ffffff;
          border-radius: 14px;
          padding: 28px 24px 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          text-align: center;
        }

        .icon {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #111827;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .code-input {
          width: 100%;
          padding: 14px;
          font-size: 20px;
          text-align: center;
          letter-spacing: 10px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          outline: none;
        }

        .error {
          color: #dc2626;
          font-size: 13px;
          margin-top: 10px;
        }

        .verify-btn {
          margin-top: 18px;
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

        .verify-btn:hover {
          background: #030712;
        }

        .resend {
          margin-top: 16px;
          font-size: 13px;
          color: #2563eb;
          cursor: pointer;
        }
      `}</style>

      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="icon">🔐</div>

          <h2 className="title"><center>Confirm Your Account</center></h2>
          <p className="subtitle">
            Enter the 4-digit code sent to your phone
          </p>

          <input
            className="code-input"
            type="text"
            maxLength="4"
            placeholder="••••"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, ""))
            }
          />

          {error && <div className="error">{error}</div>}

          <button className="verify-btn" onClick={handleVerify}>
            Verify Code
          </button>

          <div
            className="resend"
            onClick={() => alert("Demo code is 1234")}
          >
            Didn’t get a code?
          </div>
        </div>
      </div>
    </>
  );
}
