import React from "react";

export default function Login() {
  const handleLogin = () => {
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

        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          margin-bottom: 20px;
          color: #555;
        }

        .options a {
          color: #4aa3df;
          text-decoration: none;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: #38c2b5;
          border: none;
          border-radius: 6px;
          color: white;
          font-size: 15px;
          font-weight: bold;
          cursor: pointer;
        }

        .login-btn:hover {
          background: #2fa89d;
        }

        .bottom-text {
          text-align: center;
          margin-top: 15px;
          font-size: 13px;
          color: #666;
        }

        .bottom-text a {
          color: #4aa3df;
          text-decoration: none;
          font-weight: bold;
        }
      `}</style>

      <div className="page">
        <div className="container">
          <div className="avatar">👤</div>

          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account.</p>

          <div className="social-buttons">
            <button className="social-btn facebook">
              Login with Facebook
            </button>
            <button className="social-btn google">
              Login with Google
            </button>
          </div>

          <div className="divider">or</div>

          <input type="email" placeholder="Your email address" />
          <input type="password" placeholder="Password" />

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgotpassword">Forgot password?</a>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>

          <p className="bottom-text">
            Don’t have an account?{" "}
            <a href="/signup">Create one</a>
          </p>
        </div>
      </div>
    </>
  );
}
