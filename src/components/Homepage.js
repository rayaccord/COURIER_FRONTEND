import React, { useState } from 'react';
import delivery from "../assets/delivery_illustration.png";
import logo from "../assets/logo.png";
import './Components.css';




function Homepage() {

  // 🔥 React state controls the modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='homepagecon'>
      
      <header>
        <img src={logo} className="logosize" alt="logo" />
        <div className="header-buttons">
          <a href="get-app.html" className="btn btn-outline" id="getAppBtn">Get the app</a>

          {/* OPEN MODAL */}
          <button
            className="btn btn-fill"
            onClick={() => setShowModal(true)}
          >
            Log in/Sign up
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section className="hero">
        <div className="hero-content">
          <h1>The food you love,<br />delivered fast</h1>

          <div className="search-bar">
            <i>📍</i>
            <input type="text" placeholder="Enter your address" id="location-input" />
          </div>
        </div>

        <div className="hero-image">
          <img src={delivery} className="bikeman" alt="delivery" />
        </div>
      </section>

      {/* ----- FOOTER ----- */}
      <footer>
        <div className="socials">
          <a href="#">🌐</a>
          <a href="#">🐦</a>
          <a href="#">📸</a>
          <a href="#">💼</a>
          <a href="#">🎵</a>
        </div>

        <div className="footer-links">
          <a href="#">Get the Hooks app</a>
          <a href="#">Get the Hooks Food app</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Security</a>
        </div>

        <div className="footer-bottom">© 2025 Hooks Technology OÜ</div>
      </footer>

      {/* ----- MODAL ----- */}
      {showModal && (
        <div className="overlay" id="overlay">
          <div className="modal">

            {/* CLOSE MODAL */}
            <div
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </div>

            <h2>Create an account or log in</h2>
            <p className="subtext"><strong>3€ off</strong> your first 2 orders!</p>

            <button className="social-btn google">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Continue with Google
            </button>

            <button className="social-btn apple">
              <img src="https://www.svgrepo.com/show/303128/apple-logo.svg" alt="Apple" />
              Continue with Apple
            </button>

            <button className="social-btn facebook">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" />
              Continue with Facebook
            </button>

            <div className="divider">or continue with email</div>

            <input type="text" id="emailInput" placeholder="Enter Name" />

<button
  id="continueBtn"
  onClick={() => window.location.href = "/discovery"}
>
  <span className="btn-text">Continue</span>
</button>


            <p className="footer-note">
              Please visit <a href="#">Hooks Privacy Statement</a> to learn about personal data processing.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}


export default Homepage;