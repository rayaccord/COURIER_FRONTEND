import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  useEffect(() => {
    // MONTHLY SALES CHART
    new Chart(document.getElementById("monthlySalesChart"), {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Total",
            data: [40, 35, 25, 10, 5, 0],
            borderColor: "cyan",
            borderWidth: 2,
          },
        ],
      },
      options: { responsive: true },
    });

    // REVENUE CHART
    new Chart(document.getElementById("revenueChart"), {
      type: "line",
      data: {
        labels: ["Today", "This Week", "This Year"],
        datasets: [
          {
            label: "Total",
            data: [5, 12, 55],
            borderColor: "lime",
            borderWidth: 2,
          },
        ],
      },
      options: { responsive: true },
    });

    // STATUS PIE CHART
    new Chart(document.getElementById("statusChart"), {
      type: "pie",
      data: {
        labels: ["Delivered 57%", "Pending 43%", "Cancelled"],
        datasets: [
          {
            data: [57, 43, 0],
            backgroundColor: ["green", "yellow", "red"],
          },
        ],
      },
      options: { responsive: true },
    });
  }, []);

  // Sidebar toggle
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
    document.body.classList.toggle("sidebar-open");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#080f1a", color: "white" }}>
      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={toggleSidebar}
        style={{
          display: "none",
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 1000,
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <div style={{ width: "30px", height: "4px", background: "white", borderRadius: "2px" }} />
        <div style={{ width: "30px", height: "4px", background: "white", borderRadius: "2px" }} />
        <div style={{ width: "30px", height: "4px", background: "white", borderRadius: "2px" }} />
      </div>

      {/* Sidebar */}
      <div
        className="sidebar"
        id="sidebar"
        style={{
          width: "250px",
          background: "#050910",
          padding: "20px 10px",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease",
        }}
      >
        <h2 style={{ background: "#ff3333", padding: "10px", marginBottom: "20px", borderRadius: "5px", textAlign: "center", fontSize: "1.2rem" }}>
          Admin Panel
        </h2>

        <a className="nav-link active" href="admindashboard" style={linkStyle}>🏠 Home</a>
        <a className="nav-link" href="adminorder" style={linkStyle}>📦 Orders</a>
        <a className="nav-link" href="adminpayment" style={linkStyle}>💳 Payments</a>
        <a className="nav-link" href="adminAnalytics" style={linkStyle}>📊 Analytics</a>
        <a className="nav-link" href="adminmenulist" style={linkStyle}>🍽️ Menu Items</a>
        <a className="nav-link" href="adminreviews" style={linkStyle}>⭐ Reviews</a>
        <a className="nav-link" href="adminsetting" style={linkStyle}>⚙️ Settings</a>
        <a className="logout-btn" href="adminindex" style={logoutStyle}>🚪 Logout</a>
      </div>

      {/* Main Content */}
      <div className="main-content" style={{ flex: 1, padding: "25px", overflowY: "auto", transition: "all 0.3s ease" }}>
        {/* Notification Icon */}
        <div className="top-right-notification" style={{ position: "absolute", top: "20px", right: "25px", fontSize: "24px" }}>
          <a href="dashboard-notification.html" style={{ textDecoration: "none", color: "white" }}>🔔</a>
        </div>

        <div className="top-cards" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div className="card" style={cardStyle}>
            <h3>Total Orders</h3>
            <p>50</p>
          </div>
          <div className="card" style={cardStyle}>
            <h3>Total Revenue</h3>
            <p>£0.00</p>
          </div>
        </div>

        <div className="charts" style={{ display: "flex", gap: "20px", marginTop: "25px", flexWrap: "wrap" }}>
          <div className="chart-box" style={chartBoxStyle}>
            <h3>Monthly Sales</h3>
            <canvas id="monthlySalesChart"></canvas>
          </div>
          <div className="chart-box" style={chartBoxStyle}>
            <h3>Revenue Overview</h3>
            <canvas id="revenueChart"></canvas>
          </div>
          <div className="chart-box" style={chartBoxStyle}>
            <h3>Order Status Breakdown</h3>
            <canvas id="statusChart"></canvas>
          </div>
        </div>

        <div className="recent-activity-container" style={{ width: "100%", margin: "40px 0", background: "rgba(255,255,255,0.04)", padding: "25px", borderRadius: "12px" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px", fontSize: "22px", fontWeight: "bold" }}>Recent Activity</h2>
          <div className="activity-list" style={{ maxHeight: "420px", overflowY: "auto", paddingRight: "10px" }}>
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="activity-item" style={{ display: "flex", alignItems: "flex-start", gap: "15px", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="icon" style={{ fontSize: "22px", opacity: 0.9, color: activity.money ? "#00ff88" : "inherit" }}>{activity.icon}</span>
                <div>
                  <p className="activity-title" style={{ fontSize: "15px", fontWeight: 600 }}>{activity.title}</p>
                  <p className="activity-time" style={{ fontSize: "13px", opacity: 0.7 }}>{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Styles
const linkStyle = {
  display: "block",
  padding: "12px 15px",
  margin: "5px 0",
  textDecoration: "none",
  color: "white",
  borderRadius: "6px",
  transition: ".3s",
  fontSize: "0.9rem",
};

const logoutStyle = {
  marginTop: "10px",
  background: "#e60000",
  textAlign: "center",
  padding: "12px",
  color: "white",
  textDecoration: "none",
  borderRadius: "6px",
  transition: ".3s",
  fontSize: "0.9rem",
};

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "20px",
  borderRadius: "10px",
  flex: "1 1 200px",
};

const chartBoxStyle = {
  background: "rgba(255,255,255,0.04)",
  padding: "20px",
  borderRadius: "10px",
  flex: "1",
  minWidth: "300px",
};

// Dummy recent activity
const recentActivity = [
  { icon: "📦", title: "Order by Guest - £NaN (Paid)", time: "Dec 10, 2025 2:05 AM" },
  { icon: "📦", title: "Order by Guest - £NaN (Pending)", time: "Dec 10, 2025 1:53 AM" },
  { icon: "📦", title: "Order by Guest - £NaN (Pending)", time: "Dec 10, 2025 1:53 AM" },
  { icon: "📦", title: "Order by Guest - £NaN (Pending)", time: "Dec 10, 2025 1:53 AM" },
  { icon: "📦", title: "Order by Guest - £NaN (Pending)", time: "Dec 10, 2025 1:53 AM" },
  { icon: "💰", money: true, title: "Menu added: Beef pepper soup - £15.00", time: "Oct 24, 2025 6:28 AM" },
];
