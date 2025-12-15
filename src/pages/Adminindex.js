import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    window.location.href = "admindashboard"; 
  };

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }
        body {
          background: #0b1524;
          color: white;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .navbar {
          width: 100%;
          padding: 15px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo img {
          width: clamp(45px, 6vw, 70px);
        }
        .nav-links {
          display: flex;
          list-style: none;
          gap: clamp(15px, 3vw, 40px);
        }
        .nav-links a {
          text-decoration: none;
          color: white;
          font-size: clamp(14px, 1.2vw, 17px);
          transition: .3s;
        }
        .nav-links a:hover {
          color: orange;
        }
        .hamburger {
          display: none;
          font-size: 30px;
          cursor: pointer;
        }
        #menu-toggle {
          display: none;
        }
        .login-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .login-box {
          width: min(90%, 380px);
          padding: 30px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          text-align: center;
        }
        .avatar span {
          font-size: clamp(50px, 10vw, 70px);
          margin-bottom: 20px;
          display: inline-block;
        }
        input {
          width: 100%;
          padding: 14px;
          margin-top: 14px;
          border-radius: 6px;
          border: none;
          outline: none;
          font-size: 15px;
        }
        .password-container {
          position: relative;
        }
        .eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          font-size: 18px;
        }
        #loginBtn {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          background: orange;
          border: none;
          border-radius: 6px;
          font-size: 17px;
          color: white;
          cursor: pointer;
        }
        #loginBtn:hover {
          opacity: .9;
        }
        .forgot {
          margin-top: 15px;
          font-size: 14px;
        }
        .forgot a {
          color: #4da4ff;
          text-decoration: none;
        }

        @media (max-width: 700px) {
          .hamburger {
            display: block;
            color: white;
          }
          .nav-links {
            position: absolute;
            top: 75px;
            right: 0;
            background: #0f1c33;
            width: 100%;
            flex-direction: column;
            text-align: center;
            padding: 20px 0;
            display: none;
          }
          .nav-links a {
            padding: 15px 0;
            font-size: 18px;
            display: block;
          }
          #menu-toggle:checked ~ .nav-links {
            display: flex;
          }
        }

        @media (max-width: 400px) {
          .login-box { padding: 20px; }
          #loginBtn { font-size: 15px; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
                <img src={logo} className="logo" alt="Hooks Food" />
        </div>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          &#9776;
        </label>
      </nav>

      {/* LOGIN BOX */}
      <div className="login-container">
        <div className="login-box">
          <div className="avatar">
            <span>&#128100;</span>
          </div>

          <input type="email" placeholder="Email" />

          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
            />
            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              &#128065;
            </span>
          </div>

          <button id="loginBtn" onClick={handleLogin}>
            Login
          </button>

          <p className="forgot">
            Forgot password? <a href="#">Reset here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
