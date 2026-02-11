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
    charts.current.forEach((c) => c.destroy());
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
                tension: 0.4,
              },
            ],
          },
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
                tension: 0.4,
              },
            ],
          },
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
                backgroundColor: ["#00ff88", "#ffaa00", "#ff4444"],
              },
            ],
          },
        })
      );
    }

    return () => charts.current.forEach((c) => c.destroy());
  }, []);

  /* ---------------- Logout ---------------- */
  const logout = () => {
    // clear auth/session here
    navigate("/adminindex");
  };

  const navItems = [
    ["🏠 Dashboard", "/admindashboard"],
    ["📦 Orders", "/adminorder"],
    ["💳 Payments", "/adminpayment"],
    ["📊 Analytics", "/adminanalytics"],
    ["🏪 Restaurants & Stores", "/adminmenulist"],
    ["📝 Submissions", "/adminsubmissions"],
    ["🏍️ Courier Management", "/admincouriers"],
    ["⭐ Reviews", "/adminreviews"],
    ["💰 Wallet", "/adminwallet"],
    ["⚙️ Settings", "/adminsetting"],
  ];

  return (
    <div className="flex min-h-screen bg-[#080f1a] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#050910] p-5 flex flex-col transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <h2 className="bg-red-600 text-center py-3 rounded mb-6 font-bold">Admin Panel</h2>

        <nav className="flex flex-col gap-1 mb-auto">
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive ? "bg-red-600" : "hover:bg-red-700"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto px-4 py-2 border border-red-600 text-red-500 rounded hover:bg-red-700 hover:text-white transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          className="fixed top-5 left-5 z-50 flex flex-col gap-1 text-2xl md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6 md:p-10">
        {/* Stats */}
        <div className="flex flex-wrap gap-5 mb-6">
          <div className="flex-1 min-w-[150px] bg-white/5 p-5 rounded text-center">
            <h4 className="text-sm text-gray-300">Total Orders</h4>
            <p className="text-2xl text-teal-400 font-bold">50</p>
          </div>
          <div className="flex-1 min-w-[150px] bg-white/5 p-5 rounded text-center">
            <h4 className="text-sm text-gray-300">Total Revenue</h4>
            <p className="text-2xl text-green-400 font-bold">£0.00</p>
          </div>
        </div>

        {/* Charts */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[280px] bg-white/5 p-5 rounded">
            <h4 className="mb-3 font-semibold">Monthly Sales</h4>
            <canvas ref={monthlyChart}></canvas>
          </div>
          <div className="flex-1 min-w-[280px] bg-white/5 p-5 rounded">
            <h4 className="mb-3 font-semibold">Revenue Overview</h4>
            <canvas ref={revenueChart}></canvas>
          </div>
          <div className="flex-1 min-w-[280px] bg-white/5 p-5 rounded">
            <h4 className="mb-3 font-semibold">Order Status</h4>
            <canvas ref={statusChart}></canvas>
          </div>
        </div>

        {/* Recent Activity */}
        <section className="mt-10 bg-white/5 p-5 rounded">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          {recentActivity.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-3 items-start py-2 border-b border-white/10 last:border-b-0"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p>{item.title}</p>
                <small className="text-gray-400">{item.time}</small>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

/* ---------------- Recent Activity Data ---------------- */
const recentActivity = [
  { icon: "📦", title: "Order by Guest – Paid", time: "Dec 10, 2025 2:05 AM" },
  { icon: "📦", title: "Order by Guest – Pending", time: "Dec 10, 2025 1:53 AM" },
  { icon: "💰", title: "Menu added: Beef Pepper Soup (£15)", time: "Oct 24, 2025" },
];
