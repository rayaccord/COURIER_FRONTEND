import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
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

  const navItems = [
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
  ];

  return (
    <div className="flex bg-[#000814] text-white min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-56 bg-[#001d3d] p-5 transition-transform duration-300 z-50
          ${sidebarVisible ? "translate-x-0" : "-translate-x-56"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          {navItems.map(([label, path]) => (
            <li
              key={path}
              className={`rounded-l-md ${
                location.pathname === path ? "bg-orange-700 border-l-4 border-orange-500" : ""
              }`}
            >
              <Link to={path} className="block px-4 py-2 hover:bg-orange-600 transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu button */}
      <button
        className="fixed top-5 left-5 md:hidden z-50 text-3xl"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? "✖" : "☰"}
      </button>

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-56 p-6 md:p-10 relative">
        {/* Notification */}
        <div className="absolute top-5 right-5 text-2xl">
          <Link to="/adminnotification">🔔</Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-10">Expanded Analytics Dashboard</h1>

        {/* Top Stats */}
        <div className="flex flex-wrap gap-6 justify-center mb-10">
          <div className="bg-[#001d3d] p-6 rounded-lg min-w-[150px] text-center flex-1">
            <h3 className="text-gray-300">Total Orders</h3>
            <p className="text-orange-500 text-2xl mt-2">50</p>
          </div>
          <div className="bg-[#001d3d] p-6 rounded-lg min-w-[150px] text-center flex-1">
            <h3 className="text-gray-300">Total Revenue</h3>
            <p className="text-orange-500 text-2xl mt-2">₦290,000</p>
          </div>
          <div className="bg-[#001d3d] p-6 rounded-lg min-w-[150px] text-center flex-1">
            <h3 className="text-gray-300">Total Reviews</h3>
            <p className="text-orange-500 text-2xl mt-2">5</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="bg-[#001d3d] p-6 rounded-lg flex-1 min-w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Revenue per Restaurant</h2>
            <Bar
              data={revenueData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  title: { display: true, text: "Revenue per Restaurant" },
                },
              }}
            />
          </div>

          <div className="bg-[#001d3d] p-6 rounded-lg flex-1 min-w-[300px]">
            <h2 className="text-xl font-semibold mb-4">Popular Menu Items</h2>
            <Pie
              data={popularMenuData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, position: "bottom" },
                  title: { display: true, text: "Popular Menu Items" },
                },
              }}
            />
          </div>
        </div>

        {/* Courier Performance */}
        <div className="bg-[#001d3d] p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">Courier Performance</h2>
          <Bar
            data={courierPerformanceData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true },
                title: { display: true, text: "Courier Performance" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
