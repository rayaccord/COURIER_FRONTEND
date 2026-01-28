import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function RestaurantApprovals() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Dummy submissions
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      restaurant: "Gbenga's Grill",
      type: "New Registration",
      date: "24 Jan 2026",
      status: "pending",
    },
    {
      id: 2,
      restaurant: "Olamide Pizza",
      type: "Menu Update",
      date: "22 Jan 2026",
      status: "pending",
    },
    {
      id: 3,
      restaurant: "Sweet Moi-Moi",
      type: "Profile Update",
      date: "20 Jan 2026",
      status: "pending",
    },
  ]);

  // Approve / Reject submissions
  const updateStatus = (id, newStatus) => {
    setSubmissions(
      submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <div className="approvals-root">
      <style>{`
        :root{--primary:#ff6b00;--bg:#000814;--panel:#001d3d;--text:#fff}
        body{margin:0;font-family:Arial,sans-serif;display:flex;background:var(--bg);color:var(--text)}
        .sidebar{width:230px;background:var(--panel);height:100vh;padding-top:20px;position:fixed;transition:0.3s;left:0}
        .sidebar ul{list-style:none;padding:0;margin-top:20px}
        .sidebar ul li{padding:12px 20px;cursor:pointer}
        .sidebar ul li a{text-decoration:none;color:var(--text);display:block}
        .sidebar ul li.active{background:rgba(255,107,0,0.25);border-left:4px solid var(--primary)}
        .container{margin-left:250px;padding:40px;width:calc(100% - 250px)}
        h1{text-align:center;font-size:26px;margin-bottom:30px}
        table{width:100%;border-collapse:collapse;background:var(--panel);border-radius:8px;overflow:hidden}
        th, td{padding:12px;text-align:left;border-bottom:1px solid #1a1a2e}
        th{background:#001f3d}
        button.status-btn{padding:6px 12px;border:none;border-radius:6px;color:#fff;cursor:pointer;margin-right:6px}
        .approve{background:#00a651}
        .reject{background:#ff4d4d}
        .view{background:#4da6ff}
        .menu-btn{display:none;position:fixed;left:20px;top:20px;z-index:1000;font-size:30px;cursor:pointer;color:var(--text)}
        .top-right-notification{position:absolute;top:20px;right:25px;font-size:24px}
        .top-right-notification a{text-decoration:none;color:white;transition:0.3s}
        .top-right-notification a:hover{color:#ff6b00}
        @media(max-width:768px){.sidebar{left:-250px}.sidebar.show{left:0}.container{margin-left:0;width:100%;padding-top:70px}.menu-btn{display:block}}
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

        <h1>Restaurant Submission Approvals</h1>

        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Submission Type</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id}>
                <td>{s.restaurant}</td>
                <td>{s.type}</td>
                <td>{s.date}</td>
                <td>{s.status}</td>
                <td>
                  {s.status === "pending" && (
                    <>
                      <button
                        className="status-btn approve"
                        onClick={() => updateStatus(s.id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="status-btn reject"
                        onClick={() => updateStatus(s.id, "rejected")}
                      >
                        Reject
                      </button>
                      <button className="status-btn view">View</button>
                    </>
                  )}
                  {s.status === "approved" && <span>✅ Approved</span>}
                  {s.status === "rejected" && <span>❌ Rejected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
