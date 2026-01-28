import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function CourierManagement() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Courier list
  const [couriers, setCouriers] = useState([
    {
      id: 1,
      name: "Tunde Akintola",
      phone: "08012345678",
      vehicle: "Bike",
      status: "Available",
      earnings: 12000,
    },
    {
      id: 2,
      name: "Chinedu Okafor",
      phone: "08087654321",
      vehicle: "Car",
      status: "On Delivery",
      earnings: 22000,
    },
  ]);

  // New courier registration
  const [newCourier, setNewCourier] = useState({
    name: "",
    phone: "",
    vehicle: "",
  });

  const registerCourier = () => {
    if (!newCourier.name || !newCourier.phone || !newCourier.vehicle) {
      return alert("Please fill all fields");
    }
    setCouriers([
      ...couriers,
      { ...newCourier, id: couriers.length + 1, status: "Available", earnings: 0 },
    ]);
    setNewCourier({ name: "", phone: "", vehicle: "" });
    alert("Courier registered successfully!");
  };

  const toggleStatus = (id) => {
    setCouriers(
      couriers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Available" ? "On Delivery" : "Available" }
          : c
      )
    );
  };

  return (
    <div className="courier-root">
      <style>{`
        :root{--primary:#ff6b00;--bg:#000814;--panel:#001d3d;--text:#fff}
        body{margin:0;font-family:Arial,sans-serif;display:flex;background:var(--bg);color:var(--text)}
        .sidebar{width:230px;background:var(--panel);height:100vh;padding-top:20px;position:fixed;transition:0.3s;left:0;overflow-y:auto}
        .sidebar ul{list-style:none;padding:0;margin-top:20px}
        .sidebar ul li{padding:12px 20px;cursor:pointer}
        .sidebar ul li a{text-decoration:none;color:var(--text);display:block}
        .sidebar ul li.active{background:rgba(255,107,0,0.25);border-left:4px solid var(--primary)}
        .container{margin-left:250px;padding:40px;width:calc(100% - 250px)}
        h1{text-align:center;font-size:26px;margin-bottom:30px}
        .top-up-box, .register-box{background:var(--panel);padding:20px;border-radius:10px;margin-bottom:30px;display:flex;gap:10px;flex-wrap:wrap}
        input, select{flex:1;padding:10px;border-radius:6px;border:none;background:rgba(255,255,255,0.08);color:#fff}
        button{padding:10px 16px;border:none;border-radius:6px;background:#00a651;color:#fff;cursor:pointer}
        table{width:100%;border-collapse:collapse;background:var(--panel);border-radius:8px;overflow:hidden}
        th, td{padding:12px;text-align:left;border-bottom:1px solid #1a1a2e}
        th{background:#001f3d}
        button.status-btn{padding:6px 12px;border:none;border-radius:6px;color:#fff;cursor:pointer;margin-right:6px}
        .available{background:#00a651}
        .ondelivery{background:#ffb400}
        .menu-btn{display:none;position:fixed;left:20px;top:20px;z-index:1000;font-size:30px;cursor:pointer;color:var(--text)}
        .top-right-notification{position:absolute;top:20px;right:25px;font-size:24px}
        .top-right-notification a{text-decoration:none;color:white;transition:0.3s}
        .top-right-notification a:hover{color:#ff6b00}
        @media(max-width:768px){
          .sidebar{left:-250px}
          .sidebar.show{left:0}
          .container{margin-left:0;width:100%;padding-top:70px}
          .menu-btn{display:block}
        }
      `}</style>

      {/* MOBILE MENU BUTTON */}
      <div className="menu-btn" onClick={() => setSidebarVisible(!sidebarVisible)}>
        {sidebarVisible ? "✖" : "☰"}
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarVisible ? "show" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          {[
            ["🏠 Home", "/admindashboard"],
            ["🧾 Orders", "/adminorder"],
            ["💳 Payments", "/adminpayment"],
            ["📊 Analytics", "/adminAnalytics"],
            ["🏪 Restaurants & Stores", "/adminmenulist"],
            ["📝 Submissions", "/adminsubmissions"],
            ["🏍️ Courier Management", "/admincouriers"],
            ["⭐ Reviews", "/adminreviews"],
            ["💰 Wallet", "/adminwallet"],
            ["⚙️ Settings", "/adminsetting"],
            ["🚪 Log-out", "/adminindex"],
          ].map(([label, path]) => (
            <li key={path} className={location.pathname === path ? "active" : ""}>
              <a href={path}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="top-right-notification">
          <a href="adminnotification">🔔</a>
        </div>

        <h1>Courier Management</h1>

        {/* Register New Courier */}
        <div className="register-box">
          <input
            placeholder="Courier Name"
            value={newCourier.name}
            onChange={(e) => setNewCourier({ ...newCourier, name: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            value={newCourier.phone}
            onChange={(e) => setNewCourier({ ...newCourier, phone: e.target.value })}
          />
          <input
            placeholder="Vehicle Type"
            value={newCourier.vehicle}
            onChange={(e) => setNewCourier({ ...newCourier, vehicle: e.target.value })}
          />
          <button onClick={registerCourier}>Register Courier</button>
        </div>

        {/* Courier List */}
        <h2>Current Couriers</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Earnings (₦)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.vehicle}</td>
                <td>{c.status}</td>
                <td>{c.earnings.toLocaleString()}</td>
                <td>
                  <button
                    className={`status-btn ${c.status === "Available" ? "available" : "ondelivery"}`}
                    onClick={() => toggleStatus(c.id)}
                  >
                    {c.status === "Available" ? "Set On Delivery" : "Set Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
