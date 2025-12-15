import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import deliveryIllustration from "../assets/delivery_illustration.png";

const OrderDelivered = () => {
  const [lastOrder, setLastOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const canvasRef = useRef(null);
  const confettiParticles = useRef([]);

  // Load last order & rating
  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    setLastOrder(allOrders[allOrders.length - 1] || null);

    const savedRating = localStorage.getItem("lastRating");
    if (savedRating) setRating(Number(savedRating));
  }, []);

  // Handle star click
  const handleStarClick = (value) => {
    setRating(value);
    localStorage.setItem("lastRating", value);
  };

  // Handle review submit
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      alert("Please write your review before submitting!");
      return;
    }
    localStorage.setItem("lastReview", review.trim());
    alert("Thank you for your review!");
    setReview("");
  };

  // Initialize confetti
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#fd6128", "#ffb347", "#4CAF50", "#ff5f6d", "#ffc371"];

    confettiParticles.current = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 2,
      d: Math.random() * 1 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
    }));

    const drawConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.current.forEach((c) => {
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.r, c.r);
        ctx.fill();
      });
      confettiParticles.current.forEach((c) => {
        c.y += c.d;
        c.x += Math.sin(c.tilt);
        if (c.y > canvas.height) {
          c.y = -10;
          c.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawConfetti);
    };

    drawConfetti();
  }, []);

  return (
    <div className="order-delivered-container">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      ></canvas>

      <header style={headerStyle}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <h2>Order Delivered</h2>
      </header>

      <div style={containerStyle}>
        <img
          src={deliveryIllustration}
          alt="Delivery scooter"
          style={scooterStyle}
        />

        {/* Centered Delivered Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0",
            textAlign: "center",
          }}
        >
          <div style={deliveredIconStyle}>🎉</div>
          <h2 style={{ margin: "10px 0" }}>Your Order Has Been Delivered!</h2>
        </div>

        <p>We hope you enjoyed your meal. Please rate your experience below.</p>

        <div style={summaryStyle}>
          {lastOrder ? (
            <>
              <h3>Order Summary</h3>
              <p>
                <strong>Order ID:</strong> {lastOrder.id}
              </p>
              <p>
                <strong>Name:</strong> {lastOrder.name}
              </p>
              <p>
                <strong>Address:</strong> {lastOrder.address}, {lastOrder.city}
              </p>
              <h3>Items</h3>
              {lastOrder.cart.map((item, idx) => (
                <div style={summaryItemStyle} key={idx}>
                  <span>{item.name}</span>
                  <span>{parseFloat(item.price).toFixed(2)} NOK</span>
                </div>
              ))}
              <div style={totalStyle}>Total: {lastOrder.total} NOK</div>
            </>
          ) : (
            <p>No recent order found.</p>
          )}
        </div>

        {/* Star rating */}
        <div style={ratingStyle}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "32px",
                cursor: "pointer",
                color: (hoverRating || rating) >= star ? "#fd6128" : "#ccc",
                transition: "color 0.2s",
              }}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review form */}
        <form onSubmit={handleSubmitReview} style={writeReviewStyle}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Tell us what you think about your food..."
            rows="3"
            style={textareaStyle}
          />
          <button type="submit" style={submitBtnStyle}>
            Submit
          </button>
        </form>

        <div style={actionsStyle}>
          <a href="discovery" style={actionLinkStyle}>
            ← Back to Home
          </a>
          <a href="restaurants" style={actionLinkStyle}>
            🍽️ Order more
          </a>
        </div>
      </div>

      <footer style={footerStyle}>
        © 2025 Hooks Technology — Thank you for choosing Hooks Food
      </footer>
    </div>
  );
};

/* Inline Styles */
const headerStyle = {
  background: "#fff",
  padding: "5px 20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
  textAlign: "center",
};
const logoStyle = { width: "150px", height: "150px" };
const containerStyle = {
  maxWidth: "700px",
  margin: "40px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  textAlign: "center",
  position: "relative",
  zIndex: 2,
};
const scooterStyle = { width: "160px", margin: "20px auto 10px", display: "block" };
const deliveredIconStyle = { fontSize: "60px", color: "#4CAF50", marginBottom: "10px" };
const summaryStyle = {
  marginTop: "25px",
  textAlign: "left",
  padding: "20px",
  background: "#fafafa",
  borderRadius: "10px",
  border: "1px solid #eee",
};
const summaryItemStyle = { display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed #ddd" };
const totalStyle = { fontWeight: "bold", textAlign: "right", marginTop: "10px" };
const ratingStyle = { marginTop: "25px" };
const writeReviewStyle = { marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" };
const textareaStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", resize: "none", fontSize: "14px" };
const submitBtnStyle = { alignSelf: "flex-end", padding: "10px 20px", background: "#fd6128", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" };
const actionsStyle = { marginTop: "30px" };
const actionLinkStyle = { display: "inline-block", margin: "8px", padding: "12px 24px", background: "#fd6128", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 600 };
const footerStyle = { marginTop: "40px", textAlign: "center", padding: "16px", color: "#777" };

export default OrderDelivered;
