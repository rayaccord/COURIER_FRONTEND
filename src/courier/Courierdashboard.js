import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourierMap from "./CourierMap";

/* ================= MAIN DASHBOARD ================= */
export default function CourierDashboard() {
  const navigate = useNavigate();

  /* ---------- CORE STATE ---------- */
  const [online, setOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- LIVE LOCATION ---------- */
  const [location, setLocation] = useState({ lat: 6.5244, lng: 3.3792 });

  /* ---------- COURIER STATS ---------- */
  const [wallet] = useState({ available: 85.5, pending: 22.0, today: 18.5 });
  const [rating] = useState(4.7);
  const [completedOrders] = useState(126);

  /* ---------- ORDER FLOW ---------- */
  const [orderStage, setOrderStage] = useState("Assigned");

  /* ---------- ORDER REQUEST ---------- */
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [orderTimer, setOrderTimer] = useState(0);

  /* ================= LIVE GPS TRACKING ================= */
  useEffect(() => {
    if (!online) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("GPS error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [online]);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ================= MOCK INCOMING ORDER ================= */
  useEffect(() => {
    if (!online) return;

    const mock = setInterval(() => {
      setIncomingOrder({
        id: `ORD-${Math.floor(Math.random() * 10000)}`, // unique order id
        restaurant: { lat: 6.5249, lng: 3.3798 },
        customer: { lat: 6.5281, lng: 3.3812 },
      });
    }, 15000); // new order every 15 seconds for testing

    return () => clearInterval(mock);
  }, [online]);

  /* ================= ORDER TIMER ================= */
  useEffect(() => {
    if (!incomingOrder) {
      setOrderTimer(0);
      return;
    }

    setOrderTimer(20);

    const interval = setInterval(() => {
      setOrderTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setIncomingOrder(null); // auto dismiss order
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [incomingOrder]);

  /* ================= GEO-RADIUS CHECK ================= */
  const isWithinRadius = (target, radius = 100) => {
    if (!target) return false;

    const R = 6371e3; // meters
    const φ1 = (location.lat * Math.PI) / 180;
    const φ2 = (target.lat * Math.PI) / 180;
    const Δφ = ((target.lat - location.lat) * Math.PI) / 180;
    const Δλ = ((target.lng - location.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) <= radius;
  };

  /* ================= ORDER STEP LOCKING ================= */
  const nextStage = () => {
    const flow = ["Assigned", "Heading to Restaurant", "Arrived at Restaurant", "Picked Up", "On the Way", "Delivered"];

    if (orderStage === "Heading to Restaurant" && !isWithinRadius(incomingOrder?.restaurant)) {
      alert("You must be at the restaurant to proceed");
      return;
    }

    if (orderStage === "On the Way" && !isWithinRadius(incomingOrder?.customer)) {
      alert("You must be at the customer location to proceed");
      return;
    }

    const index = flow.indexOf(orderStage);
    if (index < flow.length - 1) setOrderStage(flow[index + 1]);
  };

  /* ================= ACCEPT / REJECT ORDER ================= */
  const acceptOrder = () => {
    setOrderStage("Assigned");
    setActiveTab("Orders");
    setIncomingOrder(null);
  };

  const rejectOrder = () => setIncomingOrder(null);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    navigate("/courierlogin");
  };

  /* ================= PAGE SWITCHER ================= */
  const renderContent = () => {
    switch (activeTab) {
      case "Orders":
        return <ActiveOrder stage={orderStage} onNext={nextStage} />;
      case "Wallet":
        return <Wallet wallet={wallet} />;
      case "Profile":
        return <Profile rating={rating} completed={completedOrders} online={online} />;
      default:
        return (
          <Home
            online={online}
            setOnline={setOnline}
            wallet={wallet}
            rating={rating}
            location={location}
            incomingOrder={incomingOrder}
          />
        );
    }
  };

  /* ================= LAYOUT ================= */
  return (
    <div style={styles.wrapper}>
      {!isMobile && (
        <aside style={styles.sidebar}>
          <div>
            <h3>🛵 Courier</h3>
            {["Home", "Orders", "Wallet", "Profile"].map((tab) => (
              <div
                key={tab}
                style={{ ...styles.navItem, ...(activeTab === tab ? styles.active : {}) }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Home" && "🏠 "}
                {tab === "Orders" && "📦 "}
                {tab === "Wallet" && "💰 "}
                {tab === "Profile" && "👤 "}
                {tab}
              </div>
            ))}
            <div
              style={{ ...styles.navItem, marginTop: 20, background: "#dc2626", color: "#fff", textAlign: "center" }}
              onClick={handleLogout}
            >
              🔒 Logout
            </div>
          </div>

          <div style={{ color: online ? "#16a34a" : "#6b7280" }}>● {online ? "ONLINE" : "OFFLINE"}</div>
        </aside>
      )}

      <main style={styles.main}>{renderContent()}</main>

      {/* ===== ORDER POPUP ===== */}
      {incomingOrder && (
        <div style={styles.orderPopup}>
          <h3>📦 New Order</h3>
          <p>Order ID: {incomingOrder.id}</p>
          <p>⏳ Time left: {orderTimer}s</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={styles.acceptBtn} onClick={acceptOrder}>
              Accept
            </button>
            <button style={styles.rejectBtn} onClick={rejectOrder}>
              Reject
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <nav style={styles.mobileNav}>
          {["Home", "Orders", "Wallet", "Profile"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ ...styles.mobileItem, ...(activeTab === tab ? styles.activeMobile : {}) }}
            >
              <small>{tab}</small>
            </div>
          ))}
          <div
            style={{ ...styles.mobileItem, background: "#dc2626", color: "#fff" }}
            onClick={handleLogout}
          >
            🔒 Logout
          </div>
        </nav>
      )}
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */
function Home({ online, setOnline, wallet, rating, location, incomingOrder }) {
  return (
    <>
      <h2>Home</h2>
      <div style={styles.cardRow}>
        <Card title="Status" value={online ? "ONLINE" : "OFFLINE"} />
        <Card title="Today’s Earnings" value={`€${wallet.today}`} />
        <Card title="Wallet Balance" value={`€${wallet.available}`} />
        <Card title="Rating" value={`⭐ ${rating}`} />
      </div>
      <button
        style={{ ...styles.toggleBtn, background: online ? "#dc2626" : "#16a34a" }}
        onClick={() => setOnline(!online)}
      >
        {online ? "Go Offline" : "Go Online"}
      </button>

      {/* ================= MAP ================= */}
      <CourierMap location={location} incomingOrder={incomingOrder} />
    </>
  );
}

function ActiveOrder({ stage, onNext }) {
  return (
    <>
      <h2>Active Order</h2>
      <h3>{stage}</h3>
      {stage !== "Delivered" && (
        <button style={styles.primaryBtn} onClick={onNext}>
          Next Step →
        </button>
      )}
      {stage === "Delivered" && <p style={{ color: "#16a34a" }}>✔ Delivery Completed</p>}
    </>
  );
}

function Wallet({ wallet }) {
  return (
    <>
      <h2>Wallet</h2>
      <div style={styles.cardRow}>
        <Card title="Available" value={`€${wallet.available}`} />
        <Card title="Pending" value={`€${wallet.pending}`} />
      </div>
    </>
  );
}

function Profile({ rating, completed, online }) {
  return (
    <>
      <h2>Profile</h2>
      <p>⭐ Rating: {rating}</p>
      <p>📦 Completed Orders: {completed}</p>
      <p>Status: {online ? "ONLINE" : "OFFLINE"}</p>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <small>{title}</small>
      <h3>{value}</h3>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: { display: "flex", minHeight: "100vh", background: "#f8fafc" },
  sidebar: { width: 220, background: "#fff", padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #e5e7eb" },
  navItem: { padding: 10, cursor: "pointer", borderRadius: 8 },
  active: { background: "#eff6ff", fontWeight: 600 },
  main: { flex: 1, padding: 20, paddingBottom: 90 },
  mobileNav: { position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", background: "#fff", borderTop: "1px solid #e5e7eb" },
  mobileItem: { flex: 1, textAlign: "center", padding: 10 },
  activeMobile: { color: "#2563eb" },
  cardRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 },
  card: { background: "#fff", padding: 14, borderRadius: 12 },
  toggleBtn: { padding: 12, borderRadius: 10, border: "none", color: "#fff", marginBottom: 20 },
  primaryBtn: { padding: 12, borderRadius: 10, border: "none", background: "#2563eb", color: "#fff" },
  orderPopup: { position: "fixed", bottom: 100, right: 20, background: "#fff", padding: 16, borderRadius: 14, boxShadow: "0 10px 25px rgba(0,0,0,0.15)", width: 260, zIndex: 999 },
  acceptBtn: { background: "#16a34a", color: "#fff", border: "none", padding: 10, borderRadius: 8, flex: 1 },
  rejectBtn: { background: "#dc2626", color: "#fff", border: "none", padding: 10, borderRadius: 8, flex: 1 },
};
