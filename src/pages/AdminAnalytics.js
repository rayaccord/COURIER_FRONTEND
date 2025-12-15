import React, { useEffect } from "react";
import Chart from "chart.js/auto";

export default function Analytics() {

  useEffect(() => {
    // REVENUE CHART
    new Chart(document.getElementById("revenueChart"), {
      type: "line",
      data: {
        labels: ["Today", "This Week", "This Month", "This Year"],
        datasets: [
          {
            label: "total",
            data: [0, 2.5, 0, 50],
            borderColor: "#38b6ff",
            backgroundColor: "rgba(56,182,255,0.3)",
            fill: true,
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
    });

    // SALES CHART
    new Chart(document.getElementById("salesChart"), {
      type: "line",
      data: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "total",
            data: [40, 0],
            borderColor: "#2a9df4",
            backgroundColor: "rgba(42,157,244,0.3)",
            fill: false,
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      },
      options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
    });

    // ORDER STATUS PIE CHART
    new Chart(document.getElementById("orderStatusChart"), {
      type: "pie",
      data: {
        labels: ["Cancelled", "Delivered", "Pending"],
        datasets: [
          {
            data: [0, 57, 43],
            backgroundColor: ["#ffcc33", "#4caf50", "#3d7eff"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { position: "bottom", labels: { color: "white" } } },
      },
    });
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("show");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; background: #0f121b; color: white; }

        .mobile-header { display:none; width:100%; background:#151a24; padding:15px; font-size:20px; position:fixed; top:0; left:0; z-index:999; }
        .hamburger { font-size:30px; cursor:pointer; user-select:none; }

        .sidebar { width:230px; background:#151a24; height:100vh; padding:20px; position:fixed; left:0; top:0; transition:0.3s; z-index:998; }
        .sidebar.hidden { left:-250px; }
        .sidebar.show { left:0; }

        .sidebar h2 { margin-bottom:20px; font-size:20px; color:#ff4444; }
        .menu-item { margin:12px 0; padding:10px 15px; border-radius:4px; cursor:pointer; color:#ddd; display:block; text-decoration:none;}
        .menu-item:hover, .active { background:#242b3a; color:white; }

        .main-content { margin-left:230px; padding:30px; transition:0.3s; }
        .content { padding-top:20px; }

        .stats-container { display:flex; gap:20px; flex-wrap:wrap; }
        .stat-box { background:#151a24; padding:20px; width:220px; border-radius:8px; text-align:center; min-width:160px; }
        .stat-number { font-size:30px; margin-top:10px; }

        .charts { display:flex; gap:25px; flex-wrap:wrap; }
        .chart-card { background:#151a24; padding:20px; border-radius:10px; flex:1; min-width:300px; }

        canvas { width:100% !important; height:300px !important; }

        .dashboard-row { display:flex; gap:25px; margin-top:40px; flex-wrap:wrap; }
        .dashboard-card { background:#151a24; padding:20px; border-radius:10px; flex:1; min-width:300px; }

        .activity-card { max-height:420px; overflow:hidden; display:flex; flex-direction:column; }
        .activity-list { margin-top:15px; overflow-y:auto; height:350px; padding-right:10px; }
        .activity-item { display:flex; gap:12px; padding:12px 0; border-bottom:1px solid #242b3a; color:#ddd; }

        /* Notification */
        .top-right-notification { position:absolute; top:20px; right:25px; font-size:24px; }
        .top-right-notification a { color:white; text-decoration:none; }

        @media (max-width:768px) {
          .mobile-header { display:block; }
          .sidebar { left:-250px; }
          .main-content { margin-left:0; padding-top:80px; }
        }
      `}</style>

      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <span className="hamburger" onClick={toggleSidebar}>☰</span>
        <span style={{ marginLeft: 15 }}>Admin Panel</span>
      </div>

      {/* SIDEBAR */}
      <div className="sidebar" id="sidebar">
        <h2>Admin Panel</h2>

        <a href="admindashboard" className="menu-item">Home</a>
        <a href="adminorder" className="menu-item">Orders</a>
        <a href="adminpayment" className="menu-item">Payments</a>
        <a href="adminAnalytics" className="menu-item active">Analytics</a>
        <a href="adminmenulist" className="menu-item">Menu Items</a>
        <a href="adminreviews" className="menu-item">Reviews</a>
        <a href="adminsetting" className="menu-item">Settings</a>

        <a href="adminindex" className="menu-item" style={{ color: "#ff4444", fontWeight: "bold" }}>
          Logout
        </a>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* Notification Icon */}
        <div className="top-right-notification">
          <a href="dashboard-notification.html">🔔</a>
        </div>

        <div className="content">
          <h1>Analytics Dashboard</h1>

          {/* STATS */}
          <div className="stats-container">
            <div className="stat-box"><div>Total Orders</div><div className="stat-number">50</div></div>
            <div className="stat-box"><div>Total Revenue</div><div className="stat-number">0</div></div>
            <div className="stat-box"><div>Total Reviews</div><div className="stat-number">5</div></div>
          </div>

          {/* CHARTS */}
          <div className="charts">
            <div className="chart-card">
              <h3>Revenue Overview</h3>
              <canvas id="revenueChart"></canvas>
            </div>

            <div className="chart-card">
              <h3>Monthly Sales</h3>
              <canvas id="salesChart"></canvas>
            </div>
          </div>

          {/* ORDER STATUS + ACTIVITY */}
          <div className="dashboard-row">

            <div className="dashboard-card">
              <h3>Order Status Breakdown</h3>
              <canvas id="orderStatusChart"></canvas>
            </div>

            <div className="dashboard-card activity-card">
              <h3>Recent Activity</h3>

              <div className="activity-list">
                <div className="activity-item"><span>👤</span><div><strong>Order – £2.5 (Paid)</strong><br /><small>Dec 10</small></div></div>
                <div className="activity-item"><span>👤</span><div><strong>Order – £6.5 (Pending)</strong><br /><small>Dec 10</small></div></div>
                {Array(7).fill(0).map((_, i) => (
                  <div key={i} className="activity-item">
                    <span>$</span>
                    <div><strong>Menu Added – £9.5</strong><br /><small>Oct 31</small></div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
