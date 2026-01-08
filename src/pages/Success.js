import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png"; // Update path as needed

export default function OrderSuccess() {
  const [lastOrder, setLastOrder] = useState(null);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const lastOrderId = localStorage.getItem("lastOrderId");

  const order = orders.find(o => o.orderId === lastOrderId);
  if (!order) return;

  // Update status
  if (order.status !== "Pending Confirmation") {
    order.status = "Pending Confirmation";
    order.statusHistory.push({
      stage: "Pending Confirmation",
      time: new Date().toISOString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));
  }

  setLastOrder(order);
  setOrderId(order.orderId);
}, []);


  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", background: "#f6f7fb", color: "#111", minHeight: "100vh", padding: "0 10px" }}>
      {/* Header */}
      <header style={{
        background: "#fff",
        padding: "18px 20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        textAlign: "center",
      }}>
        <img src={logo} alt="Hooks Logo" style={{ width: "100%", maxWidth: "150px", height: "auto" }} />
        <h2 style={{ color: "#fd6128", margin: "0", textAlign: "center" }}>Order Confirmation</h2>
      </header>

      {/* Success Container */}
      <div style={{
        width: "100%",
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        textAlign: "center",
        boxSizing: "border-box",
      }}>
        <div style={{ fontSize: "60px", color: "#fd6128", marginBottom: "10px" }}>✅</div>

        {/* Thank You text centered */}
        <h2 style={{ color: "#fd6128", marginBottom: "10px", textAlign: "center" }}>
          Thank You for Your Order!
        </h2>

        <p style={{ fontSize: "1rem", lineHeight: "1.5rem" }}>
          Your order has been placed successfully. A confirmation has been saved in your account.
        </p>

        
        {/* Order Details */}
        <div style={{
          textAlign: "left",
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #eee",
          borderRadius: "10px",
          background: "#fafafa",
          overflowX: "auto",
        }}>
          {lastOrder ? (
            <>
              <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Order Summary</h3>
              <p><strong>Name:</strong> {lastOrder.name || "N/A"}</p>
              <p><strong>Email:</strong> {lastOrder.email || "N/A"}</p>
              <p><strong>Phone:</strong> {lastOrder.phone || "N/A"}</p>
              <p><strong>Address:</strong> {lastOrder.address || "N/A"}, {lastOrder.city || "N/A"}</p>
              <p><strong>Payment Method:</strong> {lastOrder.payment === "bank" ? "Bank Transfer" : "Cash on Delivery"}</p>
              {lastOrder.notes && <p><strong>Notes:</strong> {lastOrder.notes}</p>}

              <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Items Ordered</h3>

              {lastOrder.cart && lastOrder.cart.length > 0 ? (
                lastOrder.cart.map((item, index) => (
                  <div key={index} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px dashed #ddd",
                    flexWrap: "wrap",
                  }}>
                    <span>{item.name || "Unnamed Item"}</span>
                    <span>{parseFloat(item.price || 0).toFixed(2)} NOK</span>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}

              <div style={{ fontWeight: "bold", textAlign: "right", marginTop: "10px" }}>
                Total: {lastOrder.total || "0.00"} NOK
              </div>
            </>
          ) : (
            <p>No order data found.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="buttons-container" style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
          <a href="/discovery" className="success-button">← Back to Home</a>
          <a href="/tracking" className="success-button">📍 Track Your Order</a>
        </div>

        {/* Extra styling for responsiveness */}
        <style>
          {`
            .success-button {
              width: 100%;
              max-width: 300px;
              padding: 12px 24px;
              background: #fd6128;
              color: #fff;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              text-align: center;
              transition: background 0.2s;
            }
            .success-button:hover {
              background: #e85a1a;
            }

            @media (min-width: 600px) {
              .buttons-container {
                flex-direction: row;
                gap: 15px;
              }
            }
          `}
        </style>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: "40px", textAlign: "center", padding: "16px", color: "#777" }}>
        © 2025 Hooks Technology — Thank you for shopping with us
      </footer>
    </div>
  );
}
