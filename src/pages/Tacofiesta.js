import React, { useState, useEffect } from "react";
import fruitImg from "../assets/fruit.jpg";
import orangeImg from "../assets/orange.jpg";
import appleImg from "../assets/apple.jpg";
import logoImg from "../assets/logo.png";

const initialRestaurants = [
  { name: "Orange", desc: "Orange", category: "orange", price: 75, img: orangeImg },
  { name: "Apple", desc: "Apple", category: "apple", price: 75, img: appleImg },
  { name: "Apple", desc: "Apple", category: "apple", price: 75, img: appleImg },
  { name: "Orange", desc: "Orange", category: "orange", price: 75, img: orangeImg },
  { name: "Apple", desc: "Apple", category: "apple", price: 75, img: appleImg },
  { name: "Orange", desc: "Orange", category: "orange", price: 75, img: orangeImg },
  { name: "Apple", desc: "Apple", category: "apple", price: 75, img: appleImg },
  { name: "Orange", desc: "Orange", category: "orange", price: 75, img: orangeImg },
  { name: "Apple", desc: "Apple", category: "apple", price: 75, img: appleImg },
  { name: "Orange", desc: "Orange", category: "orange", price: 75, img: orangeImg },
];

const categoriesList = ["all", "salad", "yummy salad"];

export default function App() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchText.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = activeCategory === "all" || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setCartVisible(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };


  const goCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout";
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <style>{`
        :root {
          --primary: #00a2c7;
          --secondary: #0098b4;
          --bg: #f9fafb;
          --text: #1e293b;
          --gray: #64748b;
          --white: #ffffff;
          --radius: 12px;
          --accent: rgb(253,97,40);
        }
        * { box-sizing: border-box; margin:0; padding:0; font-family:"Inter","Segoe UI",Arial,sans-serif; }
        body { background:var(--bg); color:var(--text); display:flex; flex-direction:column; min-height:100vh; }
        .container { flex:1; width:100%; max-width:1200px; padding:20px; margin:0 auto; }

        /* Header */
        header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:40px 5%;
          background: url(${fruitImg}) center/cover no-repeat;
          box-shadow:0 1px 4px rgba(0,0,0,0.08);
          position:sticky;
          top:0;
          z-index:10;
          height:250px;
          flex-wrap:wrap;
        }
        .mama {
          font-weight:bold;
          font-size:35px;
          color:white;
          background-color: rgba(0,0,0,0.39);
          padding:5px 10px;
        }
        .search-bar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
        .search-input {
          display:flex;
          align-items:center;
          background:var(--white);
          box-shadow:0 4px 12px rgba(0,0,0,0.05);
          border-radius:var(--radius);
          padding:10px 15px;
        }
        .search-input input {
          border:none;
          outline:none;
          width:100%;
          font-size:15px;
          margin-left:8px;
        }

        .section-header { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:15px; }
        .section-header h2 { font-size:24px; font-weight:700; }
        .categories { display:flex; overflow-x:auto; gap:15px; margin-bottom:25px; padding-bottom:8px; scrollbar-width:none; }
        .categories::-webkit-scrollbar { display:none; }
        .category { background:var(--white); box-shadow:0 4px 12px rgba(0,0,0,0.05); border-radius:var(--radius); padding:10px 18px; font-weight:600; color:var(--gray); cursor:pointer; flex-shrink:0; white-space:nowrap; transition: all 0.3s ease; }
        .category.active { background-color:var(--accent); color:var(--white); }

        .restaurants { display:grid; grid-template-columns:repeat(auto-fit,minmax(270px,1fr)); gap:20px; }
        .restaurant-card { background:var(--white); border-radius:var(--radius); box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden; transition:0.3s; cursor:pointer; position:relative; }
        .restaurant-card:hover { transform:translateY(-4px); }
        .discount { position:absolute; top:10px; left:10px; background:var(--accent); color:white; padding:4px 10px; border-radius:6px; font-size:13px; font-weight:600; z-index:2; }
        .restaurant-card img { width:100%; height:150px; object-fit:cover; }
        .info { padding:12px; }
        .info h3 { font-size:16px; font-weight:700; margin-bottom:4px; }
        .info p { font-size:13px; color:var(--gray); margin-bottom:6px; }
        .details { font-size:12px; display:flex; justify-content:space-between; align-items:center; color:var(--gray); }
        .add-btn { width:100%; margin-top:10px; background:var(--accent); color:white; border:none; border-radius:8px; padding:8px 0; cursor:pointer; font-weight:bold; transition:0.3s; }
        .add-btn:hover { background:#e85a1a; }

        /* Cart styles */
        .cart { position:fixed; right:20px; bottom:20px; width:280px; max-height:420px; overflow:auto; background:white; padding:12px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.12); z-index:999; transform:translateX(120%); transition:transform .35s; }
        .cart.show { transform:translateX(0); }
        .cart h3 { color:var(--accent); text-align:center; margin:6px 0; }
        .cart ul { list-style:none; padding:0; margin:8px 0; }
        .cart-item { display:flex; gap:8px; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f1f1f1; }
        .cart-item img { width:40px; height:40px; border-radius:6px; object-fit:cover; }
        .cart-total { text-align:center; font-weight:700; margin-top:8px; }
        .cart .btn { width:100%; margin-top:8px; padding:8px 10px; border-radius:8px; border:none; cursor:pointer; font-weight:700; }
        .btn-checkout { background:var(--accent); color:white; }
        .btn-clear { background:#e85a1a; color:white; }
        .remove-btn { background:none; border:none; color:red; cursor:pointer; font-weight:700; }

        footer { background-color:var(--accent); padding:40px 5%; text-align:center; border-top:1px solid #eee; }
        .socials { display:flex; justify-content:center; gap:20px; margin-top:15px; }
        .socials a { color:#444; font-size:1.3rem; transition: all 0.3s ease; }
        .socials a:hover { color:#2eb875; transform:scale(1.2); }
        .footer-links { display:flex; flex-wrap:wrap; justify-content:center; gap:20px; margin-top:25px; }
        .footer-links a { color:black; text-decoration:none; font-size:0.95rem; transition:color 0.3s ease; }
        .footer-links a:hover { color:#2eb875; }
        .footer-bottom { font-size:0.85rem; color:black; margin-top:25px; }

        @media (max-width:768px) { header { flex-direction:column; align-items:flex-start; } .restaurants { grid-template-columns:1fr; } .cart { right:12px; bottom:12px; width:220px; } }
        @media (max-width:480px) { .restaurant-card img { height:130px; } }
      `}</style>

      {/* Header */}
      <header>
        <h2 className="mama">TACO FIESTA</h2>
        <div className="search-bar">
          <div className="search-input">
            🔍
            <input
              type="text"
              placeholder="Search taco fiesta..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="section-header">
        <h2>Our Menu</h2>
      </div>

      <div className="categories">
        {categoriesList.map((cat) => (
          <div
            key={cat}
            className={`category ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}
      </div>

      <div className="restaurants">
        {filteredRestaurants.map((r, idx) => (
          <div className="restaurant-card" key={idx} data-category={r.category}>
            <div className="discount">80 kr discount</div>
            <img src={r.img} alt={r.name} />
            <div className="info">
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
              <div className="details">
                <span>🚴 NOK 0.00</span>
                <span>💰 $$</span>
                <span>⭐ 7.4</span>
              </div>
              <button
                className="add-btn"
                onClick={() => addToCart({ name: `${r.name} - ${r.desc}`, price: r.price, img: r.img })}
              >
                Add to Cart — NOK {r.price}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CART SIDEBAR */}
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
                <img src={it.img} alt={it.title || it.name} />
                <div style={{ maxWidth: 120 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{it.title || it.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>NOK {Number(it.price).toFixed(2)}</div>
                </div>
              </div>

              <div>
                <button className="remove-btn" onClick={() => removeFromCart(idx)}>
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-total">
          <strong>Total: </strong> {totalPrice.toFixed(2)} NOK
        </div>

        <button className="btn btn-checkout" onClick={goCheckout}>
          Checkout
        </button>
        <button className="btn btn-clear" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

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
    </div>
  );
}
