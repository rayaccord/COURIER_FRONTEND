import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const monthlyChart = useRef(null);
  const revenueChart = useRef(null);
  const statusChart = useRef(null);

  const charts = useRef([]);

  /* ---------------- Responsive ---------------- */
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------------- Charts ---------------- */
  useEffect(() => {
    charts.current.forEach(c => c.destroy());
    charts.current = [];

    if (monthlyChart.current) {
      charts.current.push(
        new Chart(monthlyChart.current, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Orders",
                data: [40, 35, 25, 10, 5, 0],
                borderColor: "#00ffff",
                tension: 0.4
              }
            ]
          }
        })
      );
    }

    if (revenueChart.current) {
      charts.current.push(
        new Chart(revenueChart.current, {
          type: "line",
          data: {
            labels: ["Today", "This Week", "This Year"],
            datasets: [
              {
                label: "Revenue (£)",
                data: [5, 12, 55],
                borderColor: "#00ff88",
                tension: 0.4
              }
            ]
          }
        })
      );
    }

    if (statusChart.current) {
      charts.current.push(
        new Chart(statusChart.current, {
          type: "pie",
          data: {
            labels: ["Delivered", "Pending", "Cancelled"],
            datasets: [
              {
                data: [57, 43, 0],
                backgroundColor: ["#00ff88", "#ffaa00", "#ff4444"]
              }
            ]
          }
        })
      );
    }

    return () => charts.current.forEach(c => c.destroy());
  }, []);

  /* ---------------- Logout ---------------- */
  const logout = () => {
    // clear auth/session here
    navigate("/adminindex");
  };

  return (
    <div style={layout}>
      {/* Mobile Toggle */}
      {isMobile && (
        <div style={hamburger} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <div /><div /><div />
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ ...sidebar, display: sidebarOpen ? "flex" : "none" }}>
        <h2 style={logo}>Admin Panel</h2>

        <SidebarLink to="/admindashboard" icon="🏠" label="Dashboard" />
        <SidebarLink to="/adminorder" icon="📦" label="Orders" />
        <SidebarLink to="/adminpayment" icon="💳" label="Payments" />
        <SidebarLink to="/adminanalytics" icon="📊" label="Analytics" />
        <SidebarLink to="/adminmenulist" icon="🏪" label="Restaurants & Stores" />
        <SidebarLink to="/adminsubmissions" icon="📝" label="Submissions" />
        <SidebarLink to="/admincouriers" icon="🏍️ " label="Courier Management" />
        <SidebarLink to="/adminreviews" icon="⭐" label="Reviews" />
        <SidebarLink to="/adminwallet" icon="💰" label="Wallet" />
        <SidebarLink to="/adminsetting" icon="⚙️" label="Settings" />

        <button onClick={logout} style={logoutBtn}>
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main style={content}>
        {/* Stats */}
        <div style={statsRow}>
          <StatCard title="Total Orders" value="50" />
          <StatCard title="Total Revenue" value="£0.00" />
        </div>

        {/* Charts */}
        <div style={chartsRow}>
          <ChartCard title="Monthly Sales">
            <canvas ref={monthlyChart} />
          </ChartCard>

          <ChartCard title="Revenue Overview">
            <canvas ref={revenueChart} />
          </ChartCard>

          <ChartCard title="Order Status">
            <canvas ref={statusChart} />
          </ChartCard>
        </div>

        {/* Activity */}
        <section style={activityBox}>
          <h3>Recent Activity</h3>

          {recentActivity.map((item, index) => (
            <div key={index} style={activityItem}>
              <span>{item.icon}</span>
              <div>
                <p>{item.title}</p>
                <small>{item.time}</small>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    style={({ isActive }) => ({
      ...menuLink,
      background: isActive ? "#ff3333" : "transparent"
    })}
  >
    {icon} {label}
  </NavLink>
);

const StatCard = ({ title, value }) => (
  <div style={statCard}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div style={chartCard}>
    <h4>{title}</h4>
    {children}
  </div>
);

/* ---------------- Styles ---------------- */

const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#080f1a",
  color: "#fff"
};

const sidebar = {
  width: 250,
  background: "#050910",
  padding: 20,
  flexDirection: "column"
};

const logo = {
  background: "#ff3333",
  padding: 12,
  borderRadius: 6,
  textAlign: "center",
  marginBottom: 20
};

const menuLink = {
  padding: "12px 15px",
  marginBottom: 6,
  borderRadius: 6,
  textDecoration: "none",
  color: "#fff",
  fontSize: 14,
  transition: "0.3s"
};

const logoutBtn = {
  marginTop: "auto",
  padding: 12,
  background: "transparent",
  color: "#ff5555",
  border: "1px solid #ff3333",
  borderRadius: 6,
  cursor: "pointer"
};

const content = { flex: 1, padding: 25 };

const statsRow = { display: "flex", gap: 20, flexWrap: "wrap" };
const statCard = {
  background: "rgba(255,255,255,0.05)",
  padding: 20,
  borderRadius: 10,
  flex: 1
};

const chartsRow = {
  display: "flex",
  gap: 20,
  marginTop: 25,
  flexWrap: "wrap"
};

const chartCard = {
  background: "rgba(255,255,255,0.05)",
  padding: 20,
  borderRadius: 10,
  flex: 1,
  minWidth: 280
};

const activityBox = {
  marginTop: 40,
  background: "rgba(255,255,255,0.04)",
  padding: 20,
  borderRadius: 10
};

const activityItem = {
  display: "flex",
  gap: 12,
  padding: "10px 0",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
};

const hamburger = {
  position: "fixed",
  top: 15,
  left: 15,
  cursor: "pointer",
  zIndex: 1000
};

/* ---------------- Data ---------------- */

const recentActivity = [
  { icon: "📦", title: "Order by Guest – Paid", time: "Dec 10, 2025 2:05 AM" },
  { icon: "📦", title: "Order by Guest – Pending", time: "Dec 10, 2025 1:53 AM" },
  { icon: "💰", title: "Menu added: Beef Pepper Soup (£15)", time: "Oct 24, 2025" }
];
