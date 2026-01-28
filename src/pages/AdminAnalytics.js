import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Analytics() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Sample data
  const revenueData = {
    labels: ["Gbenga's Grill", "Olamide Pizza", "Sweet Moi-Moi"],
    datasets: [
      {
        label: "Revenue (₦)",
        data: [120000, 95000, 75000],
        backgroundColor: "#ff6b00",
      },
    ],
  };

  const popularMenuData = {
    labels: ["Jollof Rice", "Moi-Moi", "Pepper Soup", "Pizza", "Burger"],
    datasets: [
      {
        label: "Orders Count",
        data: [120, 80, 60, 90, 50],
        backgroundColor: ["#ff6b00", "#00a651", "#4da6ff", "#ffa500", "#ff4d4d"],
      },
    ],
  };

  const courierPerformanceData = {
    labels: ["Tunde Akintola", "Chinedu Okafor", "Amina Bello"],
    datasets: [
      {
        label: "Deliveries Completed",
        data: [45, 38, 50],
        backgroundColor: "#00a651",
      },
      {
        label: "Deliveries Pending",
        data: [5, 12, 2],
        backgroundColor: "#ff4d4d",
      },
    ],
  };

  return (
    <div className="analytics-root">
      <style>{`
        :root{--primary:#ff6b00;--bg:#000814;--panel:#001d3d;--text:#fff}
        body{margin:0;font-family:Arial,sans-serif;display:flex;background:var(--bg);color:var(--text)}
        .sidebar{width:230px;background:var(--panel);height:100vh;padding-top:20px;position:fixed;transition:0.3s;left:0;overflow-y:auto}
        .sidebar.show{left:0}
        .sidebar ul{list-style:none;padding:0;margin-top:20px}
        .sidebar ul li{padding:12px 20px;cursor:pointer}
        .sidebar ul li a{text-decoration:none;color:var(--text);display:block}
        .sidebar ul li.active{background:rgba(255,107,0,0.25);border-left:4px solid var(--primary)}
        .container{margin-left:250px;padding:40px;width:calc(100% - 250px)}
        h1{text-align:center;font-size:26px;margin-bottom:30px}
        .menu-btn{display:none;position:fixed;left:20px;top:20px;z-index:1000;font-size:30px;cursor:pointer;color:var(--text)}
        .top-right-notification{position:absolute;top:20px;right:25px;font-size:24px}
        .top-right-notification a{text-decoration:none;color:white;transition:0.3s}
        .top-right-notification a:hover{color:#ff6b00}

        /* Top stats horizontal */
        .stats-horizontal{display:flex;gap:20px;margin-bottom:30px;flex-wrap:wrap}
        .stat-card{flex:1;background:var(--panel);padding:20px;border-radius:10px;text-align:center;min-width:150px}
        .stat-card h3{margin:0;font-size:16px;color:#ddd}
        .stat-card .stat-number{font-size:24px;color:#ff6b00;margin-top:8px}

        /* Charts side by side */
        .charts-row{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:30px}
        .chart-box{flex:1;min-width:300px;background:var(--panel);padding:20px;border-radius:10px}

        @media(max-width:768px){
          .sidebar{left:-250px}
          .sidebar.show{left:0}
          .container{margin-left:0;width:100%;padding-top:70px}
          .menu-btn{display:block}
          .charts-row{flex-direction:column}
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
        {/* Notification */}
        <div className="top-right-notification">
          <a href="adminnotification">🔔</a>
        </div>

        <h1>Expanded Analytics Dashboard</h1>

        {/* Top Stats */}
        <div className="stats-horizontal">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <div className="stat-number">50</div>
          </div>
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <div className="stat-number">₦290,000</div>
          </div>
          <div className="stat-card">
            <h3>Total Reviews</h3>
            <div className="stat-number">5</div>
          </div>
        </div>

        {/* Charts side by side */}
        <div className="charts-row">
          <div className="chart-box">
            <h2>Revenue per Restaurant</h2>
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                plugins: { legend: { display: true }, title: { display: true, text: "Revenue per Restaurant" } },
              }}
            />
          </div>
          <div className="chart-box">
            <h2>Popular Menu Items</h2>
            <Pie
              data={popularMenuData}
              options={{
                responsive: true,
                plugins: { legend: { display: true, position: "bottom" }, title: { display: true, text: "Popular Menu Items" } },
              }}
            />
          </div>
        </div>

        {/* Courier Performance */}
        <div className="chart-box">
          <h2>Courier Performance</h2>
          <Bar
            data={courierPerformanceData}
            options={{
              responsive: true,
              plugins: { legend: { display: true }, title: { display: true, text: "Courier Performance" } },
            }}
          />
        </div>
      </div>
    </div>
  );
}
