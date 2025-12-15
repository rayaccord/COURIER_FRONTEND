import React from "react";
import { Link } from "react-router-dom";

export default function CreateAccount() {
  const handleSignUp = () => {
    window.location.href = "/checkout";
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #f2f4f7;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          background: white;
          width: 100%;
          max-width: 420px;
          padding: 30px 25px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .avatar {
          width: 70px;
          height: 70px;
          background: #4aa3df;
          border-radius: 8px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 32px;
        }

        h2 {
          text-align: center;
          margin-bottom: 8px;
        }

        .subtitle {
          text-align: center;
          color: #777;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .social-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .social-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          color: white;
        }

        .facebook {
          background: #1877f2;
        }

        .google {
          background: #db4437;
        }

        .divider {
          text-align: center;
          margin: 15px 0;
          color: #888;
          position: relative;
        }

        .divider::before,
        .divider::after {
          content: "";
          height: 1px;
          width: 40%;
          background: #ddd;
          position: absolute;
          top: 50%;
        }

        .divider::before {
          left: 0;
        }

        .divider::after {
          right: 0;
        }

        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 5px;
          border: 1px solid #ddd;
          font-size: 14px;
        }

        .checkbox-group {
          display: flex;
          gap: 10px;
          font-size: 13px;
          color: #555;
          margin-bottom: 15px;
        }

        .terms {
          font-size: 12px;
          color: #777;
          margin-bottom: 20px;
        }

        .terms a {
          color: #4aa3df;
          text-decoration: none;
        }

        .signup-btn {
          width: 100%;
          padding: 14px;
          background: #38c2b5;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
          margin-bottom: 10px;
        }

        .signup-btn:hover {
          background: #2fa89d;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: #4aa3df;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }

        .login-btn:hover {
          background: #3583c6;
        }

        .login-text {
          text-align: center;
          font-size: 13px;
          margin-top: 10px;
        }

        .login-text a {
          color: #4aa3df;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>

      <div className="page">
        <div className="container">
          <div className="avatar">👤</div>

          <h2>Create Private Account</h2>
          <p className="subtitle">Sign up with your social profile.</p>

          <div className="social-buttons">
            <button className="social-btn facebook">
              Sign up with Facebook
            </button>
            <button className="social-btn google">
              Sign up with Google
            </button>
          </div>

          <div className="divider">or</div>

          <input type="email" placeholder="Your email address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Retype Password" />

          <div className="checkbox-group">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">
              Sign me up for partner mailing lists to receive exciting news!
            </label>
          </div>

          <p className="terms">
            By registering an account, I have read and agreed with the{" "}
            <a href="#">Terms and Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>

          <button className="signup-btn" onClick={handleSignUp}>
            SIGN UP
          </button>

          {/* Login section */}
          <div className="login-text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
