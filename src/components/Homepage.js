import React, { useState, useEffect } from 'react';
import delivery from "../assets/delivery_illustration.png";
import logo from "../assets/logo.png";
import './Components.css';

function Homepage() {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France",
    "Italy", "Spain", "Netherlands", "Belgium", "Sweden",
    "Norway", "Denmark", "Finland", "Ireland", "Switzerland",
    "Austria", "Australia", "New Zealand", "Brazil", "Mexico",
    "Japan", "South Korea", "China", "India", "South Africa",
    "Nigeria", "Egypt", "Turkey", "Russia", "Argentina"
  ];

  // Load selected country from localStorage on mount
  useEffect(() => {
    const storedCountry = localStorage.getItem("selectedCountry");
    if (storedCountry) {
      setSelectedCountry(storedCountry);
    }
  }, []);

  const handleDone = () => {
    if (selectedCountry) {
      localStorage.setItem("selectedCountry", selectedCountry);
      window.location.href = "/discovery"; // redirect
    } else {
      alert("Please select a country first.");
    }
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='homepagecon'>
      
      <header>
        <img src={logo} className="logosize" alt="logo" />
        <div className="header-buttons">
          <a href="get-app.html" className="btn btn-outline" id="getAppBtn">Get the app</a>
          <button
            className="btn btn-fill"
            onClick={() => setShowCountryModal(true)}
          >
            Select your country
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>The food you love,<br />delivered fast</h1>
          {/* Removed the location input as requested */}
        </div>

        <div className="hero-image">
          <img src={delivery} className="bikeman" alt="delivery" />
        </div>
      </section>

      {/* Footer */}
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

      {/* ----- COUNTRY SELECTION MODAL ----- */}
      {showCountryModal && (
        <div className="overlay">
          <div className="modal" style={{ maxWidth: "400px", width: "90%" }}>
            <div className="close-btn" onClick={() => setShowCountryModal(false)}>✕</div>

            <h2>Select Your Country</h2>
            <p className="subtext">Choose your country to continue</p>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                margin: "12px 0",
                borderRadius: "8px",
                border: "1px solid #e6e6e6",
                fontSize: "14px"
              }}
            />

            {/* Scrollable country list */}
            <div
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                border: "1px solid #e6e6e6",
                borderRadius: "8px",
              }}
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCountry(country)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      background: selectedCountry === country ? "#fd6128" : "#fff",
                      color: selectedCountry === country ? "#fff" : "#000",
                      borderBottom: index !== filteredCountries.length - 1 ? "1px solid #e6e6e6" : "none",
                    }}
                  >
                    {country}
                  </div>
                ))
              ) : (
                <div style={{ padding: "12px", color: "#8a8a8a", textAlign: "center" }}>
                  No country found
                </div>
              )}
            </div>

            <button
              className="btn btn-fill"
              style={{ width: "100%", marginTop: "16px" }}
              onClick={handleDone}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
