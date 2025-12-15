import React from "react";



import notifi from "../assets/mamajollof/notifi.png";

export default function Notifications() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f8fafc",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", color: "#475569" }}>
        <img
  src={notifi}
  alt="No notifications"
  style={{
    width: "180px",
    opacity: 0.9,
    marginBottom: "20px",

          }}
        />

        <h2
          style={{
            fontSize: "22px",
            marginBottom: "8px",
            fontWeight: 700,
          }}
        >
          No Notifications Yet
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
          }}
        >
          When something arrives, it will show up here.
        </p>
      </div>
    </div>
  );
}
