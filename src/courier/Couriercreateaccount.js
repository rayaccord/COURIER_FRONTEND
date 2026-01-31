import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierCreateAccount() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleCreateAccount = () => {
  // later you’ll add validation + API call here
  navigate("/courierconfirmcode");
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

        .back-btn {
          background: none;
          border: none;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          padding: 0;
          margin-bottom: 12px;
        }

        .title {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 6px;
          color: #111827;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 18px;
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
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 10px 12px;
        }

        .input-wrapper .icon {
          margin-right: 8px;
          font-size: 16px;
          opacity: 0.7;
        }

        .input-wrapper input,
        .input-wrapper select {
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
          <button
            className="back-btn"
            onClick={() => navigate("/courierLogin")}
          >
            ← Back to sign in
          </button>

          <h2 className="title">Join as a Courier</h2>
          <p className="subtitle">Create your rider account to start delivering</p>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="icon">✉️</span>
              <input type="email" placeholder="rider@example.com" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-wrapper">
              <span className="icon">📞</span>
              <input
                type="tel"
                placeholder="+234 801 234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="form-group">
            <label>Vehicle Type</label>
            <div className="input-wrapper">
              <span className="icon">🏍️</span>
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
              >
                <option value="">Select vehicle</option>
                <option value="bike">Motorbike</option>
                <option value="bicycle">Bicycle</option>
                <option value="car">Car</option>
                <option value="van">Van</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Minimum 8 characters" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input type="password" placeholder="Re-enter password" />
            </div>
          </div>

          <button
  className="submit-btn"
  onClick={handleCreateAccount}
>
  Create Courier Account
</button>

        </div>
      </div>
    </>
  );
}
