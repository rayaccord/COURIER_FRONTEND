import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourierMap from "./CourierMap";

/* ================= MAIN DASHBOARD ================= */
export default function CourierDashboard() {
  const navigate = useNavigate();

  const [online, setOnline] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useState({ lat: 6.5244, lng: 3.3792 });
  const [wallet] = useState({ available: 85.5, pending: 22.0, today: 18.5 });
  const [rating] = useState(4.7);
  const [completedOrders] = useState(126);
  const [orderStage, setOrderStage] = useState("Assigned");
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [orderTimer, setOrderTimer] = useState(0);

  /* ================= LIVE GPS TRACKING ================= */
  useEffect(() => {
    if (!online) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
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
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        restaurant: { lat: 6.5249, lng: 3.3798 },
        customer: { lat: 6.5281, lng: 3.3812 },
      });
    }, 15000);

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
          setIncomingOrder(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [incomingOrder]);

  const isWithinRadius = (target, radius = 100) => {
    if (!target) return false;

    const R = 6371e3; 
    const φ1 = (location.lat * Math.PI) / 180;
    const φ2 = (target.lat * Math.PI) / 180;
    const Δφ = ((target.lat - location.lat) * Math.PI) / 180;
    const Δλ = ((target.lng - location.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) <= radius;
  };

  const nextStage = () => {
    const flow = [
      "Assigned",
      "Heading to Restaurant",
      "Arrived at Restaurant",
      "Picked Up",
      "On the Way",
      "Delivered",
    ];

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

  const acceptOrder = () => {
    setOrderStage("Assigned");
    setActiveTab("Orders");
    setIncomingOrder(null);
  };

  const rejectOrder = () => setIncomingOrder(null);

  const handleLogout = () => navigate("/courierlogin");

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isMobile && (
        <aside className="w-56 bg-white p-5 flex flex-col justify-between border-r border-gray-200">
          <div>
            <h3 className="text-lg mb-4">🛵 Courier</h3>
            {["Home", "Orders", "Wallet", "Profile"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                  activeTab === tab ? "bg-blue-100 font-semibold" : ""
                }`}
              >
                {tab === "Home" && "🏠"}
                {tab === "Orders" && "📦"}
                {tab === "Wallet" && "💰"}
                {tab === "Profile" && "👤"}
                <span>{tab}</span>
              </div>
            ))}
            <div
              onClick={handleLogout}
              className="mt-5 p-2 text-center bg-red-600 text-white rounded-md cursor-pointer"
            >
              🔒 Logout
            </div>
          </div>
          <div className={`text-sm ${online ? "text-green-600" : "text-gray-400"}`}>
            ● {online ? "ONLINE" : "OFFLINE"}
          </div>
        </aside>
      )}

      <main className="flex-1 p-5 pb-24">{renderContent()}</main>

      {/* ===== ORDER POPUP ===== */}
      {incomingOrder && (
        <div className="fixed bottom-24 right-5 bg-white p-4 rounded-xl shadow-lg w-64 z-50">
          <h3 className="font-semibold mb-1">📦 New Order</h3>
          <p className="text-sm">Order ID: {incomingOrder.id}</p>
          <p className="text-sm">⏳ Time left: {orderTimer}s</p>
          <div className="flex gap-2 mt-2">
            <button
              className="flex-1 bg-green-600 text-white py-2 rounded-md"
              onClick={acceptOrder}
            >
              Accept
            </button>
            <button
              className="flex-1 bg-red-600 text-white py-2 rounded-md"
              onClick={rejectOrder}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 flex bg-white border-t border-gray-200">
          {["Home", "Orders", "Wallet", "Profile"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center p-2 ${
                activeTab === tab ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <small>{tab}</small>
            </div>
          ))}
          <div
            onClick={handleLogout}
            className="flex-1 text-center p-2 bg-red-600 text-white"
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
      <h2 className="text-xl font-semibold mb-4">Home</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Card title="Status" value={online ? "ONLINE" : "OFFLINE"} />
        <Card title="Today’s Earnings" value={`€${wallet.today}`} />
        <Card title="Wallet Balance" value={`€${wallet.available}`} />
        <Card title="Rating" value={`⭐ ${rating}`} />
      </div>
      <button
        className={`py-3 px-4 rounded-lg mb-4 text-white ${
          online ? "bg-red-600" : "bg-green-600"
        }`}
        onClick={() => setOnline(!online)}
      >
        {online ? "Go Offline" : "Go Online"}
      </button>

      <CourierMap location={location} incomingOrder={incomingOrder} />
    </>
  );
}

function ActiveOrder({ stage, onNext }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Active Order</h2>
      <h3 className="mb-3">{stage}</h3>
      {stage !== "Delivered" && (
        <button
          className="py-2 px-4 bg-blue-600 text-white rounded-lg"
          onClick={onNext}
        >
          Next Step →
        </button>
      )}
      {stage === "Delivered" && <p className="text-green-600">✔ Delivery Completed</p>}
    </>
  );
}

function Wallet({ wallet }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Wallet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Card title="Available" value={`€${wallet.available}`} />
        <Card title="Pending" value={`€${wallet.pending}`} />
      </div>
    </>
  );
}

function Profile({ rating, completed, online }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Profile</h2>
      <p>⭐ Rating: {rating}</p>
      <p>📦 Completed Orders: {completed}</p>
      <p>Status: {online ? "ONLINE" : "OFFLINE"}</p>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <small className="text-gray-500">{title}</small>
      <h3 className="font-semibold">{value}</h3>
    </div>
  );
}
