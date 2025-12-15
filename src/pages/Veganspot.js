import React, { useState, useEffect } from "react";
import salad from "../assets/salad.jpg";
import salad2 from "../assets/salad2.jpg";

const VeganSpot = () => {
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const restaurants = [
    { name: "salad", desc: "salad", price: 75, category: "salad", img: salad, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "yummy salad", img: salad2, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "salad", img: salad, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "yummy salad", img: salad2, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "salad", img: salad, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "yummy salad", img: salad2, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "salad", img: salad, discount: "80 kr discount" },
    { name: "salad", desc: "salad", price: 75, category: "yummy salad", img: salad2, discount: "80 kr discount" },
    // Add more items as needed
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filteredRestaurants = restaurants.filter(
    (r) =>
      (activeCategory === "all" || r.category === activeCategory) &&
      (r.name.toLowerCase().includes(searchText.toLowerCase()) ||
        r.desc.toLowerCase().includes(searchText.toLowerCase()))
  );

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setCartVisible(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);


  const goCheckout = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout";
  };

  return (
    <div className="container">
      {/* Header */}
      <header>
        <h2 className="mama">VEGAN SPOT</h2>
        <div className="mj-search">
          <input
            type="text"
            placeholder="Search vegan spot..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </header>

      {/* Categories */}
      <div className="categories">
        {["all", "salad", "yummy salad"].map((cat) => (
          <div
            key={cat}
            className={`category ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </div>
        ))}
      </div>

      {/* Restaurants */}
      <div className="restaurants">
        {filteredRestaurants.map((r, idx) => (
          <div key={idx} className="restaurant-card">
            <div className="discount">{r.discount}</div>
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
                onClick={() =>
                  addToCart({ name: `${r.name} - ${r.desc}`, price: r.price, img: r.img })
                }
              >
                Add to Cart — NOK {r.price}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      {cartVisible && (
        <div className="cart-overlay" onClick={() => setCartVisible(false)}>
          <div className={`cart show`} onClick={(e) => e.stopPropagation()}>
            <button className="remove-btn" onClick={() => setCartVisible(false)}>✕</button>
            <h3>Your Cart</h3>
            <ul>
              {cart.length === 0 && <li>Your cart is empty.</li>}
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <img src={item.img} alt={item.name} />
                    <div style={{ maxWidth: 120 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>NOK {item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(idx)}>✕</button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              Total: {cart.reduce((a, i) => a + i.price, 0).toFixed(2)} NOK
            </div>
            <button className="btn btn-checkout" onClick={goCheckout}>Checkout</button>
            <button className="btn btn-clear" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <a href="#">Get the Hooks app</a>
          <a href="#">Get the Hooks Food app</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy</a>
        </div>
        <div>© 2025 Hooks Technology OÜ</div>
      </footer>

      {/* Responsive CSS */}
      <style>{`
        :root { --accent: rgb(253, 97, 40); }
        * { box-sizing:border-box; margin:0; padding:0; font-family:"Inter",Arial,sans-serif; }
        body { background:#f9fafb; color:#1e293b; display:flex; flex-direction:column; min-height:100vh; }
        .container { flex:1; width:100%; max-width:1200px; padding:20px; margin:0 auto; }

        header { display:flex; justify-content:space-between; align-items:center; padding:20px 5%; background: url(${salad}) center/cover no-repeat; box-shadow:0 1px 4px rgba(0,0,0,0.08); position: sticky; top:0; z-index:10; flex-wrap:wrap; }
        .mama { font-weight:bold; font-size:30px; color:white; background-color: rgba(0,0,0,0.39); padding:5px 10px; border-radius:8px; margin-bottom:10px; }
        .mj-search input { padding:8px 12px; border-radius:8px; border:1px solid #ccc; outline:none; width:200px; }

        .categories { display:flex; overflow-x:auto; gap:15px; margin-bottom:25px; padding-bottom:8px; }
        .category { background:white; box-shadow:0 4px 12px rgba(0,0,0,0.05); border-radius:12px; padding:10px 18px; font-weight:600; color:#64748b; cursor:pointer; flex-shrink:0; white-space:nowrap; }
        .category.active { background-color: var(--accent); color:white; }

        .restaurants { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px; }
        .restaurant-card { background:white; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden; cursor:pointer; position:relative; transition:0.3s; }
        .restaurant-card:hover { transform: translateY(-4px); }
        .discount { position:absolute; top:10px; left:10px; background: var(--accent); color:white; padding:4px 10px; border-radius:6px; font-size:13px; font-weight:600; }
        .restaurant-card img { width:100%; height:150px; object-fit:cover; }
        .info { padding:12px; }
        .info h3 { font-size:16px; font-weight:700; margin-bottom:4px; }
        .info p { font-size:13px; color:#64748b; margin-bottom:6px; }
        .details { font-size:12px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:5px; }
        .add-btn { padding:8px 12px; background:var(--accent); color:white; border:none; cursor:pointer; border-radius:8px; font-weight:700; margin-top:6px; width:100%; }

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

        footer { background-color: var(--accent); padding:40px 5%; text-align:center; margin-top:40px; color:white; }
        footer .footer-links a { color:white; margin:0 5px; text-decoration:none; }

        @media (max-width:1024px) {
          header { flex-direction: column; align-items:flex-start; height:auto; padding:20px; }
          .mj-search input { width:100%; max-width:250px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }

        @media (max-width:768px) {
          .container { padding:15px; }
          .mj-search input { max-width:100%; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
          .cart { width:220px; right:12px; bottom:12px; }
          .mama { font-size:26px; }
        }

        @media (max-width:480px) {
          header { padding:15px; }
          .mama { font-size:22px; }
          .restaurants { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:12px; }
          .add-btn { font-size:14px; padding:6px; }
        }
      `}</style>
    </div>
  );
};

export default VeganSpot;
