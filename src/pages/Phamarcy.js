import React, { useEffect, useState } from "react";

// ===== IMPORT ASSETS =====
import logo from "../assets/logo.png";
import pharmacyImg from "../assets/pharmacy.jpg";
import paracetamolImg from "../assets/paracetamol.jpeg";
import diclospinImg from "../assets/diclospin.jpg";
import coldmedicineImg from "../assets/coldmedicine.jpg";

export default function App() {
  // ==== STATE ====
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // ==== LOAD CART FROM LOCALSTORAGE ====
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(saved)) setCart(saved);
    } catch {}
  }, []);

  // ==== SAVE CART ====
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ==== ITEMS ====
  const items = [
    { name: "paracetamol", img: paracetamolImg, category: "paracetamol", price: 75 },
    { name: "diclospin", img: diclospinImg, category: "diclospin", price: 75 },
    { name: "coldmedicine", img: coldmedicineImg, category: "coldmedicine", price: 75 },

    // duplicates preserved
    { name: "paracetamol", img: paracetamolImg, category: "paracetamol", price: 75 },
    { name: "coldmedicine", img: coldmedicineImg, category: "coldmedicine", price: 75 },
    { name: "paracetamol", img: paracetamolImg, category: "paracetamol", price: 75 },
    { name: "diclospin", img: diclospinImg, category: "diclospin", price: 75 },
    { name: "coldmedicine", img: coldmedicineImg, category: "coldmedicine", price: 75 },
    { name: "paracetamol", img: paracetamolImg, category: "paracetamol", price: 75 },
    { name: "diclospin", img: diclospinImg, category: "diclospin", price: 75 },
    { name: "coldmedicine", img: coldmedicineImg, category: "coldmedicine", price: 75 },
  ];

  // ==== FILTER ====
  const filteredItems = items.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  // ==== CART LOGIC ====
  const addToCart = item => {
    setCart([...cart, item]);
    setCartVisible(true);
  };

  const removeFromCart = index => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);


  const goCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout";
  };

  return (
    <>
      {/* ==== RESPONSIVE CSS EXACTLY AS YOU GAVE IT ==== */}
      <style>{`
        :root { --accent: rgb(253, 97, 40); }

        * { box-sizing:border-box; margin:0; padding:0; font-family:"Inter",Arial,sans-serif; }
        body { background:#f9fafb; color:#1e293b; display:flex; flex-direction:column; min-height:100vh; }
        .container { flex:1; width:100%; max-width:1200px; padding:20px; margin:0 auto; }

        header {
          display:flex; justify-content:space-between; align-items:center; padding:20px 5%;
          background:url(${pharmacyImg}) center/cover no-repeat;
          box-shadow:0 1px 4px rgba(0,0,0,0.08);
          position:sticky; top:0; z-index:10; flex-wrap:wrap;
        }
        .mama { font-weight:bold; font-size:30px; color:white; background-color:rgba(0,0,0,0.39); padding:5px 10px; border-radius:8px; margin-bottom:10px; }

        .mj-search input {
          padding:8px 12px; border-radius:8px; border:1px solid #ccc; outline:none; width:200px;
        }

        .search-input {
          display:flex; align-items:center; gap:8px;
          background:white; padding:8px 12px; border-radius:8px;
          box-shadow:0 2px 8px rgba(0,0,0,0.12);
        }
        .search-input input { border:none; outline:none; width:100%; font-size:15px; }

        .section-header { margin:12px 0; }
        .section-header h2 { font-size:24px; font-weight:700; }

        .categories { display:flex; overflow-x:auto; gap:15px; margin-bottom:25px; padding-bottom:8px; }
        .category { background:white; box-shadow:0 4px 12px rgba(0,0,0,0.05); border-radius:12px; padding:10px 18px; font-weight:600; color:#64748b; cursor:pointer; flex-shrink:0; white-space:nowrap; }
        .category.active { background-color: var(--accent); color:white; }

        .restaurants { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; }

        .restaurant-card { background:white; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden; position:relative; cursor:pointer; transition:0.3s; }
        .restaurant-card:hover { transform:translateY(-4px); }
        .discount { position:absolute; top:10px; left:10px; background:var(--accent); color:white; padding:4px 10px; border-radius:6px; font-size:13px; font-weight:600; }
        .restaurant-card img { width:100%; height:150px; object-fit:cover; }

        .info { padding:12px; }
        .info h3 { font-size:16px; font-weight:700; }
        .info p { font-size:13px; color:#64748b; margin-bottom:6px; }
        .add-btn { padding:8px 12px; background:var(--accent); color:white; border:none; cursor:pointer; border-radius:8px; font-weight:700; width:100%; margin-top:6px; }
        .footer-links {
  background-color: rgb(253, 97, 40) !important;
  padding: 40px 5%;
  text-align: center;
  border-top: 1px solid #eee;
  color: white;
}

        /* UPDATED CART */
        .cart { position:fixed; right:20px; bottom:20px; width:280px; max-height:420px; overflow:auto; background:white; padding:12px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.12); z-index:999; transform:translateX(120%); transition:transform .35s; }
        .cart.show { transform:translateX(0); }
        .cart h3 { color:var(--accent); text-align:center; }
        .cart-item { display:flex; gap:8px; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f1f1f1; }
        .cart img { width:40px; height:40px; border-radius:6px; }
        .cart-total { text-align:center; font-weight:700; margin-top:8px; }
        .btn { width:100%; padding:8px 10px; border-radius:8px; border:none; cursor:pointer; font-weight:700; margin-top:8px; }
        .btn-checkout { background:var(--accent); color:white; }
        .btn-clear { background:#e85a1a; color:white; }
        .remove-btn { background:none; border:none; color:red; font-weight:700; cursor:pointer; }

        /* RESPONSIVE */
        @media (max-width:1024px) {
          header { flex-direction:column; align-items:flex-start; padding:20px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }

        @media (max-width:768px) {
          .container { padding:15px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
          .cart { width:220px; right:10px; bottom:10px; }
          .mama { font-size:26px; }
        }

        @media (max-width:480px) {
          header { padding:15px; }
          .mama { font-size:22px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:12px; }
          .add-btn { font-size:14px; padding:6px; }
        }
      `}</style>

      {/* ==== MAIN CONTENT ==== */}
      <div className="container">

        <header>
          <h2 className="mama">Pharmacy</h2>

          <div className="search-input">
            🔍
            <input
              type="text"
              value={searchText}
              placeholder="Search drug..."
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </header>

        <div className="section-header">
          <h2>List of Medicine</h2>
        </div>

        <div className="categories">
          {["all", "paracetamol", "diclospin", "coldmedicine"].map((c, i) => (
            <div
              key={i}
              className={`category ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </div>
          ))}
        </div>

        {/* ITEMS */}
        <div className="restaurants">
          {filteredItems.map((item, i) => (
            <div key={i} className="restaurant-card">
              <div className="discount">80 kr discount</div>
              <img src={item.img} alt={item.name} />

              <div className="info">
                <h3>{item.name}</h3>
                <p>{item.name}</p>

                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart — NOK {item.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==== CART ==== */}
      <div className={`cart ${cartVisible ? "show" : ""}`}>

        <button className="remove-btn" onClick={() => setCartVisible(false)}>✕</button>

        <h3>Your Cart</h3>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center", padding: "10px" }}>Your cart is empty.</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} className="cart-item">
              <img src={item.img} />
              <span style={{ flex: 1 }}>{item.name}</span>
              <span>NOK {item.price}</span>
              <button className="remove-btn" onClick={() => removeFromCart(i)}>✕</button>
            </div>
          ))
        )}

        <div className="cart-total">Total: NOK {totalPrice}</div>

        <button className="btn btn-checkout" onClick={goCheckout}>Checkout</button>
        <button className="btn btn-clear" onClick={clearCart}>Clear Cart</button>
      </div>

      {/* FOOTER */}
      <footer className="footer-links">
        
          <a href="#">Get the Hooks app</a>
          <a href="#">Get the Hooks Food app</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Security</a>


      </footer>
    </>
  );
}
