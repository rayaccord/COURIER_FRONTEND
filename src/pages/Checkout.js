// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Checkout() {
  // --- REDIRECT IF NOT LOGGED IN ---
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/signup";
    }
  }, []);

  // --- STATES ---
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(""); // Door Delivery
  const [walletBalance, setWalletBalance] = useState(0); // Wallet balance
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    payment: "", // bank / cash / wallet
    terms: false,
  });

  // --- LOAD CART & WALLET ---
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const safeCart = savedCart.map((item) => ({
      name: item.name || "Unnamed Item",
      price: parseFloat(item.price) || 0,
      img: item.img || "https://via.placeholder.com/60",
    }));
    setCart(safeCart);
    const cartTotal = safeCart.reduce((sum, item) => sum + item.price, 0);
    setTotal(cartTotal);

    const wallet = parseFloat(localStorage.getItem("walletBalance") || "0");
    setWalletBalance(wallet);
  }, []);

  // --- FORM HANDLER ---
  const handleChange = (e) => {
    const { id, value, type, checked, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type === "radio" ? name : id]: type === "checkbox" ? checked : value,
    }));
  };

  // --- WALLET PAYMENT ---
  const handleWalletPayment = () => {
    if (walletBalance >= total) {
      localStorage.setItem("walletBalance", walletBalance - total);
      setFormData((prev) => ({ ...prev, payment: "wallet" }));
      alert("Payment successful from wallet!");
      const orderData = {
        ...formData,
        cart,
        total: total.toFixed(2),
        delivery: delivery || "wallet",
      };
      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.removeItem("cart");
      window.location.href = "/success";
    } else {
      alert("Insufficient wallet balance");
    }
  };


// ✅ SAVE SELECTED PAYMENT METHOD FOR PROFILE
function savePaymentMethod(method) {
  if (!method) return;

  const existing = JSON.parse(localStorage.getItem("paymentMethods") || "[]");

  // prevent duplicates & ignore nulls
  const alreadyExists = existing.some(m => m && m.type === method);
  if (alreadyExists) return;

  const updated = [
    ...existing.filter(Boolean), // removes any nulls
    {
      type: method,
      addedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem("paymentMethods", JSON.stringify(updated));
}


// --- SUBMIT ORDER ---
const handleSubmit = (e) => {
  e.preventDefault();

  // --- VALIDATION ---
  if (!formData.terms) {
    alert("You must agree to the terms and conditions before placing your order.");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

   // --- SAVE SELECTED PAYMENT METHOD ---
  savePaymentMethod(formData.payment);

  
  // --- VALIDATION & PAYMENT FIX ---
if (cart.length === 0) {
  alert("Your cart is empty.");
  return;
}
if (!formData.terms) {
  alert("You must agree to the terms and conditions before placing your order.");
  return;
}

// Bank transfer
if (formData.payment === "bank") {
  // nothing extra needed
}

// Door Delivery
if (delivery === "door") {
  if (!formData.address || formData.address.trim() === "") {
    alert("Please enter your delivery address.");
    return;
  }
  // Treat Door Delivery as a valid payment for checkout
  setFormData(prev => ({ ...prev, payment: "door" }));
}

// Wallet payment is handled separately




  // --- SAVE PAYMENT METHODS ---
  const paymentMethods = JSON.parse(localStorage.getItem("paymentMethods")) || [];
  const paymentMap = {
    bank: {
      type: "bank",
      bankName: "OPay",
      accountName: "Ojemeneh Jeffery",
      accountNumber: "7085514315",
    },
    cash: { type: "cash" },
    wallet: { type: "wallet" },
  };
  if (!paymentMethods.some(p => p.type === formData.payment)) {
    paymentMethods.push(paymentMap[formData.payment]);
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
  }

  // --- SAVE ADDRESS TO USER PROFILE ---
  const storedUser = JSON.parse(localStorage.getItem("userProfile")) || {};
  const deliveryAddress = formData.address;
  if (deliveryAddress) {
    storedUser.addresses = storedUser.addresses || [];
    if (!storedUser.addresses.includes(deliveryAddress)) {
      storedUser.addresses.push(deliveryAddress);
    }
    localStorage.setItem("userProfile", JSON.stringify(storedUser));
  }

  // --- SAVE ORDER ---
const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

// 🔐 Generate readable Order ID
const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
const randomPart = Math.floor(1000 + Math.random() * 9000);
const readableOrderId = `#ORD-${datePart}-${randomPart}`;

const orderData = {
  id: Date.now(),
  orderId: readableOrderId,

  status: "Order Placed",
  statusHistory: [
    {
      stage: "Order Placed",
      time: new Date().toISOString(),
    },
  ],

  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  address: formData.address,
  city: formData.city,
  notes: formData.notes,

  items: cart.map(item => ({
    name: item.name,
    price: item.price,
    quantity: 1,
    image: item.img,
  })),

  total: total.toFixed(2),
  payment: formData.payment,
  delivery,
  createdAt: new Date().toISOString(),
};

existingOrders.push(orderData);
localStorage.setItem("orders", JSON.stringify(existingOrders));

// save last order id for next pages
localStorage.setItem("lastOrderId", orderData.orderId);



  // --- CLEAR CART & REDIRECT ---
  localStorage.removeItem("cart");
  alert("Order placed successfully!");
  window.location.href = "/success";
};



  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", background: "#f6f7fb", color: "#111", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ background: "#fff", padding: "18px 20px", boxShadow: "0 2px 6px rgba(0,0,0,0.06)", textAlign: "center" }}>
        <img src={logo} alt="Hooks Logo" style={{ width: "150px", maxWidth: "100%" }} />
        <h2 style={{ color: "#fd6128", margin: "0" }}>Checkout</h2>
      </header>

      {/* MAIN */}
      <div style={{ maxWidth: "900px", margin: "28px auto", padding: "20px", background: "#fff", borderRadius: "12px", boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
        <h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px" }}>Your Cart Items</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
              <img src={item.img} alt={item.name} style={{ width: "64px", height: "64px", borderRadius: "8px", objectFit: "cover" }} />
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <p style={{ margin: 0 }}>{item.price.toFixed(2)} NOK</p>
              </div>
            </div>
          ))
        )}
        <div style={{ marginTop: "16px", textAlign: "right", fontWeight: 700 }}>Total: {total.toFixed(2)} NOK</div>

        {/* BILLING FORM */}
        <form onSubmit={handleSubmit}>
          <h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px", marginTop: "25px" }}>Billing Details</h3>
          {["name", "email", "phone", "address", "city"].map((field) => (
            <div key={field} style={{ marginBottom: "14px" }}>
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
                style={{ width: "100%", padding: "10px", marginTop: "6px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
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

        {/* PAYMENT & DELIVERY */}
<h3 style={{ borderBottom: "2px solid #fd6128", paddingBottom: "5px", marginTop: "25px" }}>
  Payment & Delivery
</h3>
<div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "12px" }}>
  {[
    { label: "Bank Transfer", value: "bank", type: "payment", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fd6128">
        <path d="M3 10h18v2H3v-2zm0-5h18v2H3V5zm0 10h18v2H3v-2zm0 5h18v2H3v-2z"/>
      </svg>
    ) },
    { label: "Cash on Deliver / Door Delivery", value: "door", type: "delivery", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fd6128">
        <path d="M20 8V4H4v16h16V8h-1zm-3 0H7V6h10v2zm3 10H4v-2h16v2zm0-4H4v-2h16v2z"/>
      </svg>
    ) },
  ].map((option) => {
    const isSelected =
      option.type === "payment"
        ? formData.payment === option.value
        : delivery === option.value;

    return (
      <label
        key={option.value}
        style={{
          flex: "1 1 160px",
          display: "flex",
          alignItems: "center",
          padding: "14px 16px",
          borderRadius: "12px",
          border: isSelected ? "2px solid #fd6128" : "1px solid #ccc",
          background: isSelected ? "#fff7f2" : "#fff",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all 0.2s",
          gap: "10px",
          boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {option.icon}
        <input
          type="radio"
          name={option.type}
          value={option.value}
          checked={isSelected}
          onChange={() => {
            if (option.type === "payment") setFormData(prev => ({ ...prev, payment: option.value }));
            else setDelivery(option.value);
          }}
          style={{
            accentColor: "#fd6128",
            width: "18px",
            height: "18px",
            cursor: "pointer",
          }}
        />
        {option.label}
      </label>
    );
  })}
</div>
{/* PAYMENT & DELIVERY (combined) */}
<h4 style={{ marginTop: "20px" }}>Payment & Delivery</h4>
<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  {[
    { label: "Bank Transfer", type: "payment", value: "bank" },
    { label: "Cash on Deliver / Door Delivery", type: "delivery", value: "door" },
  ].map((option) => {
    const isSelected =
      (option.type === "payment" && formData.payment === option.value) ||
      (option.type === "delivery" && delivery === option.value);

    return (
      <label
        key={option.value}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          borderRadius: "12px",
          border: isSelected ? "2px solid #fd6128" : "1px solid #ccc",
          background: "#fff",
          cursor: "pointer",
          gap: "10px",
        }}
      >
        <input
          type="radio"
          name="paymentDelivery" // single group
          checked={isSelected}
          onChange={() => {
            if (option.type === "payment") {
              setFormData(prev => ({ ...prev, payment: option.value }));
              setDelivery(""); // reset delivery
            } else {
              setDelivery(option.value);
              setFormData(prev => ({ ...prev, payment: "" })); // reset payment
            }
          }}
          style={{ accentColor: "#fd6128" }}
        />
        {option.label}
      </label>
    );
  })}
</div>

{/* SHOW BANK DETAILS OR DELIVERY ADDRESS */}
{formData.payment === "bank" && (
  <div style={{ marginTop: "16px", padding: "12px", background: "#f9f9f9", border: "1px solid #ccc", borderRadius: "8px" }}>
    <p><strong>Bank Name:</strong> Opay</p>
    <p>
  <strong>Account Number:</strong> 7085514315{" "}
  <button
    type="button"
    onClick={() => navigator.clipboard.writeText("7085514315")}
    style={{
      marginLeft: "8px",
      padding: "2px 6px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      background: "#f5f5f5",
      cursor: "pointer",
      fontSize: "12px",
    }}
    title="Copy account number"
  >
    📋
  </button>
</p>

    <p><strong>Account Holder:</strong> Ojemeneh Jeffery</p>
    <p><strong>Your Wallet Balance:</strong> {walletBalance.toFixed(2)} NOK</p>
    <button
      type="button"
      onClick={handleWalletPayment}
      style={{ marginTop: "12px", padding: "10px 16px", borderRadius: "8px", background: "#fd6128", color: "#fff", fontWeight: 600, cursor: "pointer" }}
    >
      Pay with Wallet
    </button>
  </div>
)}

{delivery === "door" && (
  <div style={{ marginTop: "16px" }}>
    <label htmlFor="address" style={{ fontWeight: 600, fontSize: "14px" }}>Delivery Address *</label>
    <input
      type="text"
      id="address"
      value={formData.address}
      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
      placeholder="Enter your delivery address"
      required
      style={{ width: "100%", padding: "10px", marginTop: "6px", marginBottom: "14px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
    />
  </div>
)}


          {/* TERMS */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", marginTop: "20px" }}>
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
