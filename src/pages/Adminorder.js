import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const orders = [
    {id:1, name:"adeosun amilat", items:"Beef Roll (x1)", total:"£2.50", status:"processing", pay:"Pending", date:"12/10/2025"},
    {id:2, name:"adeosun amilat", items:"Beef Roll (x1)", total:"£2.50", status:"processing", pay:"Pending", date:"12/10/2025"},
    {id:3, name:"adeosun amilat", items:"Beef Roll (x1)", total:"£2.50", status:"processing", pay:"Pending", date:"12/10/2025"},
    {id:4, name:"adeosun amilat", items:"Beef Roll (x1)", total:"£2.50", status:"processing", pay:"Pending", date:"12/10/2025"},
    {id:5, name:"adeosun amilat", items:"Beef Roll (x1)", total:"£2.50", status:"processing", pay:"Pending", date:"12/10/2025"},
    {id:6, name:"Adeosun Semiat", items:"Jollof Rice (x1)", total:"£3.50", status:"pending", pay:"Unpaid", date:"12/10/2025"},
    {id:7, name:"TIMAKS KITCHEN", items:"Chicken Pie (x1)", total:"£2.50", status:"confirmed", pay:"Paid", date:"12/10/2025"},
    {id:8, name:"Adeosun Semiat", items:"Ogbono Assorted (x1)", total:"£7.00", status:"confirmed", pay:"Paid", date:"12/10/2025"},
    {id:9, name:"Sabomi Janik", items:"Beef pepper soup (x1)", total:"£5.50", status:"pending", pay:"Pending", date:"12/10/2025"},
  ];

  const getPillClass = (status) => {
    if (status === "pending") return "pill pending";
    if (status === "processing") return "pill processing";
    if (status === "confirmed") return "pill confirmed";
    return "pill canceled";
  };

  return (
    <>
      {/* INLINE CSS */}
      <style>{`
        :root {
          --bg:#0a0c14;
          --panel:#0f0f19;
          --text:#e6eef8;
          --muted:rgba(255,255,255,0.55);
          --accent:#4da4ff;
          --accent-2:#66e0c4;
          --danger:#ff6b6b;
          --warning:#ff9a3c;
          --card:#12121c;
          --rounded:10px;
          --glass:rgba(255,255,255,0.04);
        }
        * { box-sizing:border-box; margin:0; padding:0; font-family:Inter, Arial, sans-serif; }
        .orders-body { background:var(--bg); color:var(--text); display:flex; min-height:100vh; width:100%; }
        .sidebar { width:250px; background:var(--panel); border-right:1px solid rgba(255,255,255,0.05); padding:18px; display:flex; flex-direction:column; transition:transform .3s ease; }
        .show { transform:translateX(260px); }
        .brand { display:flex; gap:10px; align-items:center; margin-bottom:20px; }
        .brand-logo { width:36px; height:36px; background:var(--accent); border-radius:8px; display:flex; justify-content:center; align-items:center; font-size:18px; font-weight:700; color:#06243c; }
        .sidebar nav { display:flex; flex-direction:column; gap:8px; }
        .nav-item { padding:10px 12px; border-radius:8px; display:flex; align-items:center; gap:10px; color:var(--muted); text-decoration:none; cursor:pointer; transition:.2s; }
        .nav-item:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .nav-item.active { background:#ff6b6b33; color:#fff; }
        .nav-icon { font-size:18px; }
        .main-content { flex:1; width:100%; position:relative; }
        .main { padding:22px; flex-direction:column; display:flex; }
        .page-title { font-size:22px; font-weight:700; display:flex; gap:10px; }
        .filter-row { margin-top:10px; display:flex; gap:8px; flex-wrap:wrap; }
        .filter { padding:6px 12px; background:var(--glass); border-radius:20px; font-size:13px; cursor:pointer; }
        .filter.active { background:var(--accent); color:#04121e; }
        .table-box { background:var(--card); margin-top:18px; padding:10px; border-radius:var(--rounded); overflow-x:auto; border:1px solid rgba(255,255,255,0.05); }
        table { width:100%; border-collapse:collapse; font-size:14px; }
        th,td { padding:10px; text-align:left; }
        th { background:rgba(255,255,255,0.05); }
        tr:nth-child(even){ background:rgba(255,255,255,0.03); }
        tr:hover { background:rgba(255,255,255,0.1); }
        .pill { padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; }
        .pending { background:#4da4ff33; color:#4da4ff; }
        .processing { background:#ff9a3c33; color:#ff9a3c; }
        .confirmed { background:#66e0c433; color:#66e0c4; }
        .canceled { background:#ff6b6b33; color:#ff6b6b; }
        .view-link { color:#4da4ff; cursor:pointer; font-size:13px; }
        footer { text-align:center; padding:15px; font-size:13px; margin-top:auto; color:var(--muted); border-top:1px solid rgba(255,255,255,0.05); }
        .hamburger { display:none; position:fixed; top:15px; left:15px; z-index:101; font-size:22px; background:var(--panel); padding:8px 10px; border-radius:6px; color:#fff; cursor:pointer; }
        .top-right-notification { position:absolute; top:20px; right:25px; font-size:24px; }
        .top-right-notification a { color:#fff; text-decoration:none; }
        .top-right-notification a:hover { color:#ff6b00; }

        @media(max-width:900px) {
          .orders-body{flex-direction:column;}
          .sidebar{position:fixed; left:-260px; top:0; height:100%; z-index:100; background:var(--panel);}
          .hamburger{display:block;}
        }
        @media(max-width:600px){
          .page-title{font-size:18px;}
          th,td{padding:8px;font-size:13px;}
          .filter{font-size:12px;}
        }
      `}</style>

      {/* BODY */}
      <div className="orders-body">

        <div className="hamburger" onClick={toggleSidebar}>☰</div>

        <aside className={`sidebar ${sidebarOpen ? "show" : ""}`}>
          <div className="brand">
            <div className="brand-logo">A</div>
            <div style={{ fontWeight: 600 }}>Admin Panel</div>
          </div>

          <nav>
            <Link className="nav-item" to="/admindashboard"><span className="nav-icon">🏠</span>Home</Link>
            <Link className="nav-item active" to="/adminorder"><span className="nav-icon">🧾</span>Orders</Link>
            <Link className="nav-item" to="/adminpayment"><span className="nav-icon">💳</span>Payments</Link>
            <Link className="nav-item" to="/adminAnalytics"><span className="nav-icon">📊</span>Analytics</Link>
            <Link className="nav-item" to="/adminmenulist"><span className="nav-icon">🏪</span> Restaurants & Stores</Link>
            <Link className="nav-item" to="/adminsubmissions"><span className="nav-icon">📝</span>Submissions</Link>
            <Link className="nav-item" to="/admincouriers"><span className="nav-icon">🏍️</span>Courier Management</Link>
            <Link className="nav-item" to="/adminreviews"><span className="nav-icon">⭐</span>Reviews</Link>
            <Link className="nav-item" to="/adminwallet"><span className="nav-icon">💰 </span>Wallet</Link>
            <Link className="nav-item" to="/adminsetting"><span className="nav-icon">⚙️</span>Settings</Link>
            <Link className="nav-item" to="/adminindex" style={{color:"var(--danger)", fontWeight:600}}>
              <span className="nav-icon">🚪</span>Logout
            </Link>
          </nav>
        </aside>

        <div className="main-content">
          <div className="top-right-notification">
            <a href="adminnotification">🔔</a>
          </div>

          <main className="main">
            <div className="page-title">🧾 Orders</div>
            <div className="filter-row">
              <div className="filter active">Pending</div>
              <div className="filter">Processing</div>
              <div className="filter">Confirmed</div>
              <div className="filter">Canceled</div>
            </div>

            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Order Status</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.id}</td>
                      <td>{o.name}</td>
                      <td>{o.items}</td>
                      <td>{o.total}</td>
                      <td><span className={getPillClass(o.status)}>{o.status}</span></td>
                      <td>{o.pay}</td>
                      <td>{o.date}</td>
                      <td><span className="view-link">View</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
