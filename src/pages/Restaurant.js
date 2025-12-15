import React from "react";

// IMPORT IMAGES
import logo from "../assets/logo.png";
import rice8 from "../assets/rice8.jpeg";
import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import shawarma from "../assets/shawarma.jpeg";
import sweettooth from "../assets/sweettooth.jpg";
import salad from "../assets/salad.jpg";

export default function NearbyRestaurants() {
  // JS navigation
  const openPage = (page) => {
    window.location.href = page;
  };

  return (
    <div>

      {/* ========== INLINE CSS (RESPONSIVE) ========== */}
      <style>{`
        :root {
          --primary: #00a2c7;
          --nav-hover: #e8faff;
        }

        body {
          font-family: Inter, Arial, sans-serif;
          margin: 0;
          background: #f7f7f7;
          color: #111;
        }

        /* HEADER */
        .header {
          background: #fff;
          padding: 15px 5%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo {
          max-height: 80px;
          width: auto;
        }

        nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-btn {
          border: 2px solid #d0d0d0;
          padding: 8px 16px;
          border-radius: 28px;
          font-weight: 600;
          background: #fff;
          cursor: pointer;
          transition: 0.3s;
          text-decoration: none;
          color: #111;
          white-space: nowrap;
        }

        .nav-btn:hover {
          background: var(--nav-hover);
          border-color: var(--primary);
        }

        /* CONTENT */
        .container {
          padding: 25px 5%;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        /* GRID */
        .restaurants {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.07);
          cursor: pointer;
          transition: 0.25s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .card-content {
          padding: 12px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
        }

        .card-sub {
          color: #777;
          margin: 3px 0 8px;
          font-size: 13px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 13px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 50px 5%;
          font-size: 14px;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1024px) {
          .logo { max-height: 70px; }
          .nav-btn { padding: 7px 14px; font-size: 13px; }
          .card img { height: 130px; }
        }

        @media (max-width: 768px) {
          .header { flex-direction: column; align-items: flex-start; }
          nav { justify-content: center; width: 100%; margin-top: 10px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
          .card img { height: 120px; }
          .title { font-size: 22px; }
        }

        @media (max-width: 480px) {
          .logo { max-height: 60px; margin-bottom: 10px; }
          .nav-btn { padding: 6px 12px; font-size: 12px; }
          .card img { height: 100px; }
          .card-title { font-size: 16px; }
          .card-sub { font-size: 12px; }
          .card-footer { font-size: 11px; }
          .title { font-size: 20px; }
          .footer { font-size: 12px; padding: 40px 5%; }
        }
      `}</style>

      {/* ========== HEADER ========== */}
      <header className="header">
        <img src={logo} alt="Hooks Logo" className="logo" />

        <nav>
          <a href="discovery" className="nav-btn">🔍 Discovery</a>
          <a href="restaurants" className="nav-btn">🍽️ Restaurants</a>
          <a href="stores" className="nav-btn">🏬 Stores</a>
        </nav>
      </header>

      {/* ========== CONTENT ========== */}
      <div className="container">
        <div className="title">🍽️ Nearby Restaurants</div>

        <div className="restaurants">

          {/* Mama Jollof */}
          <div className="card" onClick={() => openPage("mamajollof")}>
            <img src={rice8} alt="Mama Jollof" />
            <div className="card-content">
              <div className="card-title">Mama Jollof</div>
              <div className="card-sub">African, Rice, Grill</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.8</div>
                <span>25–35 min</span>
              </div>
            </div>
          </div>

          {/* PizzaHub */}
          <div className="card" onClick={() => openPage("pizzahub")}>
            <img src={pizza} alt="PizzaHub" />
            <div className="card-content">
              <div className="card-title">PizzaHub</div>
              <div className="card-sub">Italian, Pizza, Fast Food</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.6</div>
                <span>20–30 min</span>
              </div>
            </div>
          </div>

          {/* Burger Palace */}
          <div className="card" onClick={() => openPage("burgerpalace")}>
            <img src={burger} alt="Burger Palace" />
            <div className="card-content">
              <div className="card-title">Burger Palace</div>
              <div className="card-sub">Burgers, Fries, Drinks</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.4</div>
                <span>15–25 min</span>
              </div>
            </div>
          </div>

          {/* Shawarma King */}
          <div className="card" onClick={() => openPage("shawarmaking")}>
            <img src={shawarma} alt="Shawarma King" />
            <div className="card-content">
              <div className="card-title">Shawarma King</div>
              <div className="card-sub">Middle Eastern, Wraps</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.7</div>
                <span>20–35 min</span>
              </div>
            </div>
          </div>

          {/* Sweet Tooth */}
          <div className="card" onClick={() => openPage("sweettooth")}>
            <img src={sweettooth} alt="Sweet Tooth" />
            <div className="card-content">
              <div className="card-title">Sweet Tooth</div>
              <div className="card-sub">Desserts, Ice Cream</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.9</div>
                <span>10–20 min</span>
              </div>
            </div>
          </div>

          {/* Vegan Spot */}
          <div className="card" onClick={() => openPage("veganspot")}>
            <img src={salad} alt="Vegan Spot" />
            <div className="card-content">
              <div className="card-title">The Vegan Spot</div>
              <div className="card-sub">Healthy, Vegan, Salads</div>
              <div className="card-footer">
                <div className="rating">⭐ 4.5</div>
                <span>25–40 min</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 Hooks Food — Discover, order & enjoy every bite 🍴
      </footer>
    </div>
  );
}
