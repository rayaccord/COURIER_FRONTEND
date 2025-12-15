// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png"; // update path as needed

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment: "",
    terms: false,
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const safeCart = savedCart.map(item => ({
      name: item.name || "Unnamed Item",
      price: parseFloat(item.price) || 0,
      img: item.img || "https://via.placeholder.com/60",
    }));
    setCart(safeCart);
    const cartTotal = safeCart.reduce((sum, item) => sum + item.price, 0);
    setTotal(cartTotal);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [type === "radio" ? name : id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert("You must agree to the terms and conditions before placing your order.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const orderData = {
      ...formData,
      cart,
      total: total.toFixed(2),
    };
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    localStorage.removeItem("cart");
    window.location.href = "/success";
  };

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", background: "#f6f7fb", color: "#111", minHeight: "100vh" }}>
      <header style={{ background: "#fff", padding: "18px 20px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <img src={logo} alt="Hooks Logo" style={{ width: "150px", height: "150px", maxWidth: "100%" }} />
        <h2 style={{ color: "#fd6128", margin: "0" }}>Checkout</h2>
      </header>

      <div style={{ maxWidth: "900px", margin: "28px auto", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
        <h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px" }}>Your Cart Items</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
              <img src={item.img} alt={item.name} style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover" }} />
              <div>
                <h4>{item.name}</h4>
                <p>{item.price.toFixed(2)} NOK</p>
              </div>
            </div>
          ))
        )}
        <div style={{ marginTop: "16px", textAlign: "right", fontWeight: 700 }}>
          Total: {total.toFixed(2)} NOK
        </div>

        {/* Billing Form */}
        <h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px", marginTop: "25px" }}>Billing Details</h3>
        <form onSubmit={handleSubmit}>
          {["name", "email", "phone", "address", "city"].map((field) => (
            <div key={field}>
              <label htmlFor={field} style={{ fontWeight: 600, fontSize: "14px" }}>
                {field === "name" ? "Full Name *" :
                  field === "email" ? "Email Address *" :
                  field === "phone" ? "Phone Number *" :
                  field === "address" ? "Street Address *" : "City *"}
              </label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", marginTop: "6px", marginBottom: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
              />
            </div>
          ))}

          <label htmlFor="notes" style={{ fontWeight: 600, fontSize: "14px" }}>Order Notes (optional)</label>
          <textarea
            id="notes"
            placeholder="Notes about your order, e.g. special instructions"
            value={formData.notes}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px", marginBottom: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
          />

          <h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px", marginTop: "25px" }}>Payment Method</h3>
          <div style={{ marginBottom: "10px" }}>
            <input type="radio" id="bank" name="payment" value="bank" onChange={handleChange} required checked={formData.payment === "bank"} />
            <label htmlFor="bank" style={{ marginLeft: "8px" }}><strong>Bank Transfer</strong></label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input type="radio" id="cash" name="payment" value="cash" onChange={handleChange} checked={formData.payment === "cash"} />
            <label htmlFor="cash" style={{ marginLeft: "8px" }}><strong>Cash on Delivery</strong></label>
          </div>

          {/* ✅ Privacy Notice Paragraph */}
          <p style={{ fontSize: "14px", color: "#555", marginTop: "10px" }}>
            Your personal data will be used to process your order, support your experience throughout this website, 
            and for other purposes described in our privacy policy.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", marginTop: "10px" }}>
            <input type="checkbox" id="terms" checked={formData.terms} onChange={handleChange} required />
            <label htmlFor="terms">I agree to the terms and conditions.</label>
          </div>

          <button type="submit" style={{ display: "block", margin: "20px 0 0", padding: "12px", borderRadius: "10px", width: "100%", background: "#fd6128", color: "#fff", border: "none", fontSize: "16px", cursor: "pointer" }}>
            Place Order
          </button>
        </form>
      </div>

      <footer style={{ marginTop: "30px", textAlign: "center", padding: "16px", color: "#777" }}>
        © 2025 Hooks Technology — Secure Checkout
      </footer>
    </div>
  );
}
