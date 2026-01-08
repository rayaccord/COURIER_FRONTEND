/* --- FULL RESPONSIVE VERSION WITH NOTIFICATION ADDED BACK --- */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* Images */
import logo from "../assets/logo.png";
import pizza from "../assets/pizza.jpg";
import rice8 from "../assets/rice8.jpeg";
import burger from "../assets/burger.jpg";
import sweettooth from "../assets/sweettooth.jpg";
import salad from "../assets/salad.jpg";
import fruit from "../assets/fruit.jpg";
import fresmart from "../assets/fresmart.jpg";
import bottlestop from "../assets/bottlestop.jpg";
import pharmacy from "../assets/pharmacy.jpg";
import wrist_watch from "../assets/wristwatch.jpg";
import shawarma from "../assets/shawarma.jpeg";
import profilePic from "../assets/profile.jpg";

export default function Discover() {
  const navigate = useNavigate?.() || null;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileName, setProfileName] = useState("My Account");
  const [profileImage, setProfileImage] = useState();

  const [chatOpen, setChatOpen] = useState(false);
const [chatMessage, setChatMessage] = useState("");
const [chatLog, setChatLog] = useState([]);


  const searchInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  const data = [
    { name: "Mama Jollof", type: "restaurant", img: rice8, page: "/mamajollof" },
    { name: "PizzaHub", type: "restaurant", img: pizza, page: "/pizzahub" },
    { name: "Burger Palace", type: "restaurant", img: burger, page: "/burgerpalace" },
    { name: "Sweet Tooth", type: "restaurant", img: sweettooth, page: "/sweettooth" },
    { name: "The Vegan Spot", type: "restaurant", img: salad, page: "/veganspot" },
    { name: "Taco Fiesta", type: "restaurant", img: fruit, page: "/tacofiesta" },

    { name: "Freshmart Grocery", type: "store", img: fresmart, page: "/freshmart" },
    { name: "Bottlestop", type: "store", img: bottlestop, page: "/bottlestop" },
    { name: "QuickMed Pharmacy", type: "store", img: pharmacy, page: "/phamarcy" },
    { name: "Your Jewelry", type: "store", img: wrist_watch, page: "/jewery" },

    { name: "Jollof Rice", type: "dish", img: rice8, page: "/mamajollof" },
    { name: "Shawarma", type: "dish", img: shawarma, page: "/shawarmaking" },
    { name: "Pepperoni Pizza", type: "dish", img: pizza, page: "/pizzahub" },
  ];

  useEffect(() => {
    const savedName = localStorage.getItem("username");

if (savedName) {
  setProfileName(
    savedName.charAt(0).toUpperCase() + savedName.slice(1)
  );
}


    const savedPhoto = localStorage.getItem("profilePhoto");
    setProfileImage(savedPhoto || profilePic);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
      if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const matched = data.filter((item) => item.name.toLowerCase().includes(q));
    setResults(matched);
    setShowResults(true);
  }, [query]);

  const goTo = (page) => {
    if (navigate) navigate(page);
    else window.location.href = page;
  };

  const handleCardClick = (item) => {
    localStorage.setItem("selectedRestaurantName", item.name);
    goTo(item.page);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      localStorage.setItem("profilePhoto", base64);
      setProfileImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profilePhoto");
    setProfileName("My Acount");
    setProfileImage();
    navigate("/") || (window.location.href = "/");
  };


  const sendChat = () => {
  if (!chatMessage.trim()) return;
  setChatLog((prev) => [...prev, { from: "user", text: chatMessage }]);

  setTimeout(() => {
    setChatLog((prev) => [...prev, { from: "bot", text: "Thanks for your message! Our support will reply shortly 😊" }]);
  }, 600);

  setChatMessage("");
};


  return (
    <div>
      <style>{`
        :root {
          --bg:#fafafa;
          --fd:#fd6128;
          --muted:#777;
          --card:#fff;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: var(--bg);
          color: #222;
        }

        /* ---------------- HEADER ---------------- */
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          padding: 12px 4%;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
          gap: 10px;
        }

        .logo {
          height: 60px;
        }

        .nav-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-outline-dark {
          border-radius: 999px;
          padding: 8px 12px;
          border: 1px solid #222;
          background: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* ---------------- SEARCH BAR ---------------- */
        .search-bar {
          width: 100%;
          max-width: 340px;
          display: flex;
          align-items: center;
          background: #f3f3f3;
          border-radius: 50px;
          padding: 6px 12px;
        }

        .search-results {
          width: 100%;
          max-width: 340px;
          position: absolute;
          background: white;
          border-radius: 12px;
          top: 100%;
          margin-top: 6px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          z-index: 200;
        }

        /* ---------------- HERO ---------------- */
        .hero {
          text-align: center;
          padding: 40px 16px;
          color: white;
          background: linear-gradient(90deg, var(--fd), #ffa77a);
          border-radius: 0 0 20px 20px;
        }

        .hero h1 {
          font-size: 1.8rem;
          margin-bottom: 6px;
        }

        /* ---------------- GRID & CARDS ---------------- */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 15px;
        }

        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: scale(1.03);
        }

        /* ---------------- SLIDER ---------------- */

        .bounce-auto {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .slider-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: bounceSlide 10s ease-in-out infinite alternate;
        }

        .discover-banner {
          min-width: 180px;
          height: 150px;
          border-radius: 12px;
          object-fit: cover;
        }

        @keyframes bounceSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 480px) {
          .discover-banner {
            min-width: 150px;
            height: 120px;
          }
          @keyframes bounceSlide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-60%); }
          }
        }



        /* ---------------- CHAT FLOATING BUTTON ---------------- */
.chat-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--fd);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  z-index: 500;
}

.chat-window {
  position: fixed;
  bottom: 100px;
  right: 25px;
  width: 320px;
  max-height: 420px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 600;
}

.chat-header {
  background: var(--fd);
  color: white;
  padding: 12px;
  font-weight: 600;
}

.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  font-size: 0.9rem;
}

.chat-input-box {
  display: flex;
  border-top: 1px solid #ddd;
}

.chat-input-box input {
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
}

.chat-input-box button {
  padding: 10px 14px;
  background: var(--fd);
  color: white;
  border: none;
  cursor: pointer;
}


        /* ---------------- PROFILE ---------------- */
        .profile-spot {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .notification-link {
          text-decoration: none;
          color: inherit;
          font-size: 22px;
          cursor: pointer;
        }

        .profile-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
        }

        .profile-menu .menu-item {
          padding: 8px 0;
          cursor: pointer;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          header { justify-content: center; }
          .nav-buttons { width: 100%; justify-content: center; }
          .search-bar { max-width: 100%; }
          .search-results { max-width: 100%; width: 100%; left: 0; }
          .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        }
      `}</style>

      {/* ---------------- Header ---------------- */}
      <header>
        <img src={logo} className="logo" alt="Hooks Food" />

        <nav className="nav-buttons">
          <a className="btn-outline-dark" href="/discovery">🔍 Discovery</a>
          <a className="btn-outline-dark" href="/restaurants">🍽 Restaurants</a>
          <a className="btn-outline-dark" href="/stores">🛍 Stores</a>
        </nav>

        {/* SEARCH */}
        <div style={{ position: "relative", width: "100%", maxWidth: 340 }}>
          <div className="search-bar" ref={searchInputRef}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search meals, restaurants, stores..."
              style={{
                width: "100%",
                border: "none",
                background: "none",
                outline: "none",
                fontSize: "0.95rem",
              }}
            />
          </div>

          {showResults && (
            <div className="search-results">
              {results.length > 0 ? (
                results.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(item)}
                  >
                    <img src={item.img} alt="" style={{ width: 44, height: 44, borderRadius: 8 }} />
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small style={{ color: "#777" }}>{item.type.toUpperCase()}</small>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: 12, color: "#777" }}>No results found</div>
              )}
            </div>
          )}
        </div>

        {/* PROFILE + 🔔 NOTIFICATION (OLD LOCATION) */}
        <div className="profile-spot" ref={profileMenuRef}>
          
          {/* 🔔 Notification bell restored */}
          <a
            className="notification-link"
            href="/notification"
            onClick={(e) => {
              e.preventDefault();
              if (navigate) navigate("/notification");
              else window.location.href = "/notification";
            }}
            title="Notifications"
            aria-label="Notifications"
          >
            🔔
          </a>

          {/* Profile image */}
          <img
            src={profileImage}
            alt="Profile"
            className="profile-icon"
            onClick={() => setProfileMenuOpen((s) => !s)}
            style={{ cursor: "pointer" }}
          />

          {/* Profile dropdown */}
          {profileMenuOpen && (
            <div
              className="profile-menu"
              style={{
                position: "absolute",
                right: 0,
                top: 50,
                width: 240,
                background: "white",
                padding: 12,
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              }}
            >
              <div
                style={{ display: "flex", gap: 12, cursor: "pointer" }}
                onClick={() => goTo("/profile")}
              >
                <img src={profileImage} alt="" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                <div>
                  <b>{profileName}</b>
                  <div style={{ fontSize: 13, color: "#777" }}>View profile</div>
                </div>
              </div>

              <label style={{ color: "#0b66ff", marginTop: 12, display: "block", cursor: "pointer" }}>
                Change Photo
                <input type="file" style={{ display: "none" }} onChange={handlePhotoUpload} />
              </label>

              <div className="menu-item" onClick={() => goTo("/settings")}>Settings</div>
              <div className="menu-item" onClick={() => goTo("/support")}>Contact Support</div>
              <div className="menu-item" style={{ color: "red" }} onClick={handleLogout}>Log out</div>
            </div>
          )}
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <h1>Discover the best food near you</h1>
        <p>Handpicked restaurants, trending meals & new arrivals 🍕🍔🥗</p>
      </section>

      {/* ---------------- Main ---------------- */}
      <main className="container" style={{ padding: 16, maxWidth: 1200, margin: "0 auto" }}>
        
        {/* CENTERED AUTO-BOUNCING SLIDER */}
        <div className="bounce-auto">
          <div className="slider-track">
            <img src={pizza} className="discover-banner" />
            <img src={rice8} className="discover-banner" />
            <img src={burger} className="discover-banner" />
            <img src={pizza} className="discover-banner" />
            <img src={rice8} className="discover-banner" />
            <img src={burger} className="discover-banner" />
            <img src={pizza} className="discover-banner" />
          </div>
        </div>

        <h3 className="section-title">🔥 Trending Now</h3>
        <div className="grid">
          {data.slice(0, 6).map((item, i) => (
            <div key={i} className="card" onClick={() => handleCardClick(item)}>
              <img src={item.img} alt="" style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <div style={{ padding: 10 }}>
                <h5>{item.name}</h5>
                <small style={{ color: "#777" }}>{item.type}</small>
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ marginTop: 30 }}>🆕 New on Hooks</h3>
        <div className="grid">
          {data.slice(6).map((item, i) => (
            <div key={i} className="card" onClick={() => handleCardClick(item)}>
              <img src={item.img} alt="" style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <div style={{ padding: 10 }}>
                <h5>{item.name}</h5>
                <small style={{ color: "#777" }}>{item.type}</small>
              </div>
            </div>
          ))}
        </div>

      </main>

      <footer style={{ textAlign: "center", padding: 20, marginTop: 40 }}>
        © 2025 Hooks Food — Discover, order & enjoy every bite 🍴
      </footer>



      {/* ---------------- Floating Chat Button ---------------- */}
<div className="chat-btn" onClick={() => setChatOpen(!chatOpen)}>
  💬
</div>

{/* ---------------- Chat Popup Window ---------------- */}
{chatOpen && (
  <div className="chat-window">
    <div className="chat-header">Customer Support</div>

    <div className="chat-body">
      {chatLog.map((msg, i) => (
        <div
          key={i}
          style={{
            marginBottom: 8,
            textAlign: msg.from === "user" ? "right" : "left",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: 10,
              background: msg.from === "user" ? "var(--fd)" : "#eee",
              color: msg.from === "user" ? "white" : "#222",
              maxWidth: "80%",
            }}
          >
            {msg.text}
          </span>
        </div>
      ))}
    </div>

    <div className="chat-input-box">
      <input
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendChat}>Send</button>
    </div>
  </div>
)}

    </div>
  );
}
