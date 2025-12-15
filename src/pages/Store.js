import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ---------- IMPORT ALL IMAGES ---------- */
import logo from "../assets/logo.png";
import fresmart from "../assets/fresmart.jpg";
import bottlestop from "../assets/bottlestop.jpg";
import pharmacy from "../assets/pharmacy.jpg";
import wristwatch from "../assets/wristwatch.jpg";

export default function Stores() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  return (
    <div style={styles.container}>
      
      {/* ---------- HEADER ---------- */}
      <header style={styles.header}>
        <img src={logo} alt="Hooks Logo" style={styles.logo} />
        <nav style={styles.nav}>
          <Link to="/discovery" style={styles.navBtn}>🔍 Discovery</Link>
          <Link to="/restaurants" style={styles.navBtn}>🍽️ Restaurants</Link>
          <Link to="/stores" style={styles.navBtn}>🏬 Stores</Link>
        </nav>
      </header>

      {/* ---------- GREETING ---------- */}
      <div style={styles.welcome}>
        {email ? `Welcome back, ${email}! 🛍` : "Welcome back to store!"}
      </div>

      {/* ---------- STORE GRID ---------- */}
      <section style={styles.storeGrid}>
        
        <Link to="/freshmart" style={styles.storeLink}>
          <div style={styles.storeCard}>
            <img src={fresmart} alt="Supermart" style={styles.storeImg} />
            <div style={styles.storeInfo}>
              <h3>FreshMart Grocery</h3>
              <p>Delivery in 20–30 min • ★ 4.8</p>
            </div>
          </div>
        </Link>

        <Link to="/bottlestop" style={styles.storeLink}>
          <div style={styles.storeCard}>
            <img src={bottlestop} alt="Drinks Store" style={styles.storeImg} />
            <div style={styles.storeInfo}>
              <h3>BottleStop</h3>
              <p>Drinks • 15–25 min • ★ 4.6</p>
            </div>
          </div>
        </Link>

        <Link to="/phamarcy" style={styles.storeLink}>
          <div style={styles.storeCard}>
            <img src={pharmacy} alt="Pharmacy" style={styles.storeImg} />
            <div style={styles.storeInfo}>
              <h3>QuickMed Pharmacy</h3>
              <p>Health • 25–35 min • ★ 4.9</p>
            </div>
          </div>
        </Link>

        <Link to="/jewery" style={styles.storeLink}>
          <div style={styles.storeCard}>
            <img src={wristwatch} alt="Jewelry Store" style={styles.storeImg} />
            <div style={styles.storeInfo}>
              <h3>Your Jewelry</h3>
              <p>Luxury • 20–40 min • ★ 4.7</p>
            </div>
          </div>
        </Link>

        {/* Duplicate FreshMart */}
        <Link to="/freshmart" style={styles.storeLink}>
          <div style={styles.storeCard}>
            <img src={fresmart} alt="Supermart" style={styles.storeImg} />
            <div style={styles.storeInfo}>
              <h3>FreshMart Grocery</h3>
              <p>Delivery in 20–30 min • ★ 4.8</p>
            </div>
          </div>
        </Link>

      </section>

      {/* ---------- FOOTER ---------- */}
      <footer style={styles.footer}>
        © 2025 Hooks Technology OÜ — All rights reserved.
      </footer>
    </div>
  );
}

/* ---------- RESPONSIVE STYLES ---------- */
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    background: "#fafafa",
    color: "#222",
    margin: 0,
    padding: 0,
  },
  header: {
    background: "#fff",
    padding: "15px 5%",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  logo: {
    maxHeight: "80px",
    width: "auto",
  },
  nav: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  navBtn: {
    border: "2px solid #d0d0d0",
    padding: "8px 16px",
    borderRadius: "28px",
    fontWeight: 600,
    fontSize: "14px",
    background: "#fff",
    color: "#111",
    textDecoration: "none",
    transition: "0.3s ease",
    whiteSpace: "nowrap",
  },
  welcome: {
    textAlign: "center",
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: "25px 0",
    color: "#333",
  },
  storeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "0 5% 60px",
  },
  storeLink: {
    textDecoration: "none",
    color: "inherit",
  },
  storeCard: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "0.3s ease",
  },
  storeImg: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  storeInfo: {
    padding: "15px",
  },
  footer: {
    background: "#fff",
    padding: "20px 5%",
    textAlign: "center",
    color: "#666",
    fontSize: "0.9rem",
    boxShadow: "0 -1px 4px rgba(0,0,0,0.05)",
  },

  /* ---------- MEDIA QUERIES ---------- */
  "@media(max-width: 768px)": {
    header: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    nav: {
      justifyContent: "center",
      width: "100%",
    },
    storeGrid: {
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
    },
    storeImg: {
      height: "140px",
    },
  },
  "@media(max-width: 480px)": {
    logo: {
      maxHeight: "60px",
    },
    navBtn: {
      padding: "6px 12px",
      fontSize: "13px",
    },
    storeImg: {
      height: "120px",
    },
    storeInfo: {
      padding: "10px",
    },
  },
};
