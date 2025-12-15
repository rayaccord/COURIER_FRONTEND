import React, { useState, useEffect } from "react";

// images
import sweet1 from "../assets/sweettooth.jpg";
import sweet2 from "../assets/sweettooth2.jpg";
import logo from "../assets/logo.png";
import pizzaImg from "../assets/pizza.jpg";

export default function Home() {
  // -------------------
  // STATE
  // -------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // CALCULATE TOTAL
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);

  // -------------------
  // RESTAURANT DATA
  // -------------------
const restaurants = [
  {
    title: "Sweettooth Bakery",
    category: "Bakery",
    img: sweet1,
    price: 80,
    time: "10-15 min",
    rating: "4.9",
    discount: "-20%",
  },

  // NEW 7 ADDITIONAL CARDS
  {
    title: "Sweettooth Donuts",
    category: "Bakery",
    img: sweet1,
    price: 60,
    time: "8-12 min",
    rating: "4.8",
    discount: "-15%",
  },
  {
    title: "Sweettooth Ice Cream",
    category: "Cakes",
    img: sweet2,
    price: 90,
    time: "5-10 min",
    rating: "4.6",
    discount: "-12%",
  },
  {
    title: "Sweettooth Bread House",
    category: "Bakery",
    img: sweet1,
    price: 40,
    time: "12-18 min",
    rating: "4.5",
    discount: "-5%",
  },
  {
    title: "Sweettooth Pastries",
    category: "Bakery",
    img: sweet2,
    price: 70,
    time: "10-15 min",
    rating: "4.9",
    discount: "-18%",
  },
  {
    title: "Sweettooth Cupcakes",
    category: "Cakes",
    img: sweet1,
    price: 120,
    time: "15-20 min",
    rating: "4.8",
    discount: "-10%",
  },
  {
    title: "Sweettooth Cookies",
    category: "Bakery",
    img: sweet2,
    price: 50,
    time: "10-12 min",
    rating: "4.7",
    discount: "-8%",
  },
  {
    title: "Sweettooth Chocolate House",
    category: "Cakes",
    img: sweet1,
    price: 160,
    time: "20-28 min",
    rating: "4.9",
    discount: "-12%",
  },
];

  // -------------------
  // ADD TO CART
  // -------------------
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setCartVisible(true);
  };

  // REMOVE ITEM
  const removeFromCart = (i) => {
    const updated = [...cart];
    updated.splice(i, 1);
    setCart(updated);
  };

  // CLEAR CART
  const clearCart = () => setCart([]);

  // CHECKOUT
 
  const goCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout";
  };

  // -------------------
  // FILTER RESTAURANTS
  // -------------------
  const filteredRestaurants = restaurants.filter((r) => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app">
      {/* ----------------------- */}
      {/* INLINE RESPONSIVE CSS   */}
      {/* ----------------------- */}
      <style>{`
        :root { --accent: rgb(253, 97, 40); }

        * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Inter", Arial, sans-serif; }
        body { background: #f9fafb; color: #1e293b; display: flex; flex-direction: column; min-height: 100vh; }
        .container { flex: 1; width: 100%; max-width: 1200px; padding: 20px; margin: 0 auto; }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 5%;
          background: url(${pizzaImg}) center/cover no-repeat;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          position: sticky;
          top: 0;
          z-index: 10;
          flex-wrap: wrap;
        }

        .mama {
          font-weight: bold;
          font-size: 30px;
          color: white;
          background-color: rgba(0,0,0,0.39);
          padding: 5px 10px;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .mj-search input {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          outline: none;
          width: 200px;
        }

        .section-header { display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; }
        .section-header h2 { font-size: 24px; font-weight: 700; }

        .categories { display: flex; overflow-x: auto; gap: 15px; margin-bottom: 25px; padding-bottom: 8px; }
        .category {
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          border-radius: 12px;
          padding: 10px 18px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .category.active { background-color: var(--accent); color: white; }

        .restaurants {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .restaurant-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: 0.3s;
        }
        .restaurant-card:hover { transform: translateY(-4px); }

        .discount {
          position: absolute;
          top: 10px;
          left: 10px;
          background: var(--accent);
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
        }

        .restaurant-card img { width: 100%; height: 150px; object-fit: cover; }
        .info { padding: 12px; }
        .info h3 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .info p { font-size: 13px; color: #64748b; margin-bottom: 6px; }
        .details { font-size: 12px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 5px; }

        .add-btn {
          padding: 8px 12px;
          background: var(--accent);
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          font-weight: 700;
          margin-top: 6px;
          width: 100%;
        }

        /* CART STYLES */
        .cart {
          position: fixed;
          right: 20px;
          bottom: 20px;
          width: 280px;
          max-height: 420px;
          overflow: auto;
          background: white;
          padding: 12px;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          z-index: 999;
          transform: translateX(120%);
          transition: transform .35s;
        }
        .cart.show { transform: translateX(0); }
        .cart h3 { color: var(--accent); text-align: center; margin: 6px 0; }
        .cart ul { list-style: none; padding: 0; margin: 8px 0; }
        .cart-item {
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #f1f1f1;
        }
        .cart-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
        .cart-total { text-align: center; font-weight: 700; margin-top: 8px; }
        .cart .btn { width: 100%; margin-top: 8px; padding: 8px 10px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; }
        .btn-checkout { background: var(--accent); color: white; }
        .btn-clear { background: #e85a1a; color: white; }
        .remove-btn { background: none; border: none; color: red; cursor: pointer; font-weight: 700; }

        /* FOOTER */
        footer { background-color: var(--accent); padding: 40px 5%; text-align: center; margin-top: 40px; color: white; }
        footer .footer-links a { color: white; margin: 0 5px; text-decoration: none; }

        /* RESPONSIVE RULES */
        @media (max-width:1024px) {
          header { flex-direction: column; align-items: flex-start; height: auto; padding: 20px; }
          .mj-search input { width: 100%; max-width: 250px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }

        @media (max-width:768px) {
          .container { padding: 15px; }
          .mj-search input { max-width: 100%; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
          .cart { width: 220px; right: 12px; bottom: 12px; }
          .mama { font-size: 26px; }
        }

        @media (max-width:480px) {
          header { padding: 15px; }
          .mama { font-size: 22px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
          .add-btn { font-size: 14px; padding: 6px; }
        }
      `}</style>

      {/* ----------------------- */}
      {/* HEADER                  */}
      {/* ----------------------- */}
      <header>
        <div className="mama">Mama’s Food Service</div>

        <div className="mj-search">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <img src={logo} alt="logo" style={{ height: 50 }} />
      </header>

      {/* ----------------------- */}
      {/* MAIN CONTENT            */}
      {/* ----------------------- */}
      <div className="container">
        <div className="section-header">
          <h2>Categories</h2>
        </div>

        <div className="categories">
          {["All", "Bakery", "Cakes"].map((cat) => (
            <div
              key={cat}
              className={`category ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Restaurant Cards */}
        <div className="restaurants">
          {filteredRestaurants.map((item, index) => (
            <div key={index} className="restaurant-card">
              <div className="discount">{item.discount}</div>
              <img src={item.img} alt={item.title} />

              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.category}</p>

                <div className="details">
                  <span>{item.rating} ⭐</span>
                  <span>{item.time}</span>
                </div>

                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart — NOK {item.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ----------------------- */}
      {/* CART SIDEBAR            */}
      {/* ----------------------- */}
      <div className={`cart ${cartVisible ? "show" : ""}`} id="cart">
        <button
          onClick={() => setCartVisible(false)}
          className="remove-btn"
          style={{ float: "right" }}
          aria-label="Close cart"
        >
          ✕
        </button>

        <h3>Your Cart</h3>

        <ul id="cart-items">
          {cart.length === 0 && <li>Your cart is empty.</li>}

          {cart.map((it, idx) => (
            <li key={idx} className="cart-item">
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <img src={it.img} alt={it.title} />
                <div style={{ maxWidth: 120 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    NOK {Number(it.price).toFixed(2)}
                  </div>
                </div>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(idx)}>
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="cart-total">
          <strong>Total: </strong> {totalPrice} NOK
        </div>

        <button className="btn btn-checkout" onClick={goCheckout}>
          Checkout
        </button>
        <button className="btn btn-clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      {/* FOOTER */}
      <footer>
        <div>© 2025 Mama’s Food Service</div>
        <div className="footer-links">
          <a href="#">About</a> | <a href="#">Contact</a> | <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
