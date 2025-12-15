// src/pages/MamaJollof.jsx
import React, { useEffect, useMemo, useState } from "react";
import logo from "../assets/mamajollof/logo.png";
import rice8 from "../assets/mamajollof/rice8.jpeg";
import swallow1 from "../assets/mamajollof/swallow1.jpeg";
import swallow2 from "../assets/mamajollof/swallow2.jpeg";
import swallow3 from "../assets/mamajollof/swallow3.jpeg";
import swallow4 from "../assets/mamajollof/swallow4.jpeg";
import swallow5 from "../assets/mamajollof/swallow5.jpeg";
import swallow6 from "../assets/mamajollof/swallow6.jpeg";
import swallow7 from "../assets/mamajollof/swallow7.jpeg";
import swallow8 from "../assets/mamajollof/swallow8.jpeg";
import rice2 from "../assets/mamajollof/rice2.jpeg";
import rice3 from "../assets/mamajollof/rice3.jpeg";
import rice4 from "../assets/mamajollof/rice4.jpeg";
import rice6 from "../assets/mamajollof/rice6.jpeg";

export default function MamaJollof() {
  const data = useMemo(() => [
    { id: "swallow5", category: "swallow", title: "Swallow", desc: "Starch and Banga Soup", price: 75, img: swallow5, discountLabel: "80 kr discount" },
    { id: "swallow6", category: "swallow", title: "Swallow", desc: "Amala and Ewedu Soup", price: 75, img: swallow6, discountLabel: "80 kr discount" },
    { id: "swallow7", category: "swallow", title: "Swallow", desc: "Eba and Egusi Soup", price: 75, img: swallow7, discountLabel: "80 kr discount" },
    { id: "swallow8", category: "swallow", title: "Swallow", desc: "Fufu and Ogbonor Soup", price: 75, img: swallow8, discountLabel: "80 kr discount" },
    { id: "swallow1", category: "swallow", title: "Swallow", desc: "Amala and Egusi Soup", price: 75, img: swallow1, discountLabel: "80 kr discount" },
    { id: "swallow2", category: "swallow", title: "Swallow", desc: "Semo and Edikang Ikong Soup", price: 75, img: swallow2, discountLabel: "80 kr discount" },
    { id: "swallow3", category: "swallow", title: "Swallow", desc: "Fufu and Banga Soup", price: 75, img: swallow3, discountLabel: "80 kr discount" },
    { id: "swallow4", category: "swallow", title: "Swallow", desc: "Semo and Afang Soup", price: 75, img: swallow4, discountLabel: "80 kr discount" },
    { id: "rice6", category: "rice", title: "Rice", desc: "Native/Oil Rice", price: 75, img: rice6, discountLabel: "20% off selected items" },
    { id: "rice2", category: "rice", title: "Rice", desc: "Jollof Rice and Beans", price: 75, img: rice2, discountLabel: "20% off selected items" },
    { id: "rice3", category: "rice", title: "Rice", desc: "Rice Pudding", price: 75, img: rice3, discountLabel: "20% off selected items" },
    { id: "rice4", category: "rice", title: "Rice", desc: "Ofada Rice and Stew", price: 75, img: rice4, discountLabel: "20% off selected items" },
  ], []);

  const categories = useMemo(() => {
    const set = new Set(["all"]);
    data.forEach(d => set.add(d.category));
    return Array.from(set);
  }, [data]);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // --- FIXED: sanitize cart on load ---
  const [cart, setCart] = useState(() => {
    try { 
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      return saved.map(item => ({
        id: item.id || Date.now().toString(),
        title: item.title || "Unnamed Item",
        name: item.title || item.name || "Unnamed Item",
        desc: item.desc || "",
        price: Number(item.price) || 0,
        img: item.img || "https://via.placeholder.com/60",
        category: item.category || "uncategorized",
        discountLabel: item.discountLabel || "",
      }));
    } catch { 
      return []; 
    }
  });

  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(item => {
      const matchesSearch = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory, data]);

  function addToCart(item) {
    const safeItem = {
      id: item.id || Date.now().toString(),
      title: item.title || "Unnamed Item",
      name: item.title || "Unnamed Item", // for Checkout page
      desc: item.desc || "",
      price: Number(item.price) || 0,
      img: item.img || "https://via.placeholder.com/60",
      category: item.category || "uncategorized",
      discountLabel: item.discountLabel || "",
    };

    setCart(c => {
      const updated = [...c, safeItem];
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });

    setCartVisible(true);
  }

  function removeFromCart(index) { 
    setCart(c => {
      const next = [...c];
      next.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    }); 
  }

  function clearCart() { 
    if (window.confirm("Clear cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }

  function goCheckout() { 
    if (cart.length === 0) return alert("Your cart is empty!"); 
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href="/signup"; 
  }

  const totalPrice = cart.reduce((s, it) => s + Number(it.price || 0), 0).toFixed(2);

  return (
    <div className="mamajollof-root">
      <style>{`
        :root { --accent: rgb(253, 97, 40); }
        * { box-sizing:border-box; margin:0; padding:0; font-family:"Inter",Arial,sans-serif; }
        body { background:#f9fafb; color:#1e293b; display:flex; flex-direction:column; min-height:100vh; }
        .container { flex:1; width:100%; max-width:1200px; padding:20px; margin:0 auto; }

        header {
          display:flex; justify-content:space-between; align-items:center; padding:20px 5%;
          background: url(${rice8}) center/cover no-repeat;
          box-shadow:0 1px 4px rgba(0,0,0,0.08);
          position: sticky; top:0; z-index:10; flex-wrap:wrap;
        }
        .mama { font-weight:bold; font-size:30px; color:white; background-color: rgba(0,0,0,0.39); padding:5px 10px; border-radius:8px; margin-bottom:10px; }
        .mj-search input { padding:8px 12px; border-radius:8px; border:1px solid #ccc; outline:none; width:200px; }

        .section-header { display:flex; justify-content:flex-start; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:15px; }
        .section-header h2 { font-size:24px; font-weight:700; }

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

        /* cart styles */
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

      <div className="container">
        <header>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <img src={logo} alt="logo" style={{ width: 80, borderRadius: 8 }} />
            <div className="mama">MAMA JOLLOF</div>
          </div>
          <div className="mj-search" style={{ marginTop: 10 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search mama-jollof..."
            />
          </div>
        </header>

        <div className="section-header">
          <h2>Our Menu</h2>
          <button
            onClick={() => setCartVisible((s) => !s)}
            style={{ border: "none", background: "transparent", cursor: "pointer", fontWeight: 700 }}
            title="Toggle cart"
          >
            🛒 ({cart.length})
          </button>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <div
              key={cat}
              className={`category ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>

        <div className="restaurants">
          {filtered.map((item) => (
            <div key={item.id} className="restaurant-card">
              {item.discountLabel && <div className="discount">{item.discountLabel}</div>}
              <img src={item.img} alt={item.title} />
              <div className="info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="details">
                  <span>🚴 NOK 0.00</span>
                  <span>💰 $$</span>
                  <span>⭐ {item.category === "rice" ? "8.0" : "7.4"}</span>
                </div>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  Add to Cart — NOK {item.price}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className={`cart ${cartVisible ? "show" : ""}`}>
          <button onClick={() => setCartVisible(false)} className="remove-btn" style={{ float: "right" }} aria-label="Close cart">
            ✕
          </button>
          <h3>Your Cart</h3>
          <ul>
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
                  <button className="remove-btn" onClick={() => removeFromCart(idx)}>✕</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: </strong> {totalPrice} NOK
          </div>
          <button className="btn btn-checkout" onClick={goCheckout}>Checkout</button>
          <button className="btn btn-clear" onClick={clearCart}>Clear Cart</button>
        </div>

        <footer>
          <div>© 2025 Hooks Technology OÜ</div>
        </footer>
      </div>
    </div>
  );
}
