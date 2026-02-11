import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

export default function Payments() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["COD", "Online", "Paid", "Unpaid"],
        datasets: [
          {
            label: "Amount (£)",
            data: [36, 132.5, 60, 108.5],
            backgroundColor: ["#ffcc5c", "#4da6ff", "#66cc7a", "#ff6b81"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#fff" },
            grid: { color: "#ffffff22" },
          },
          x: {
            ticks: { color: "#fff" },
            grid: { display: false },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  const toggleSidebar = () => {
    document.getElementById("sidebar")?.classList.toggle("translate-x-0");
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className="fixed top-0 left-0 h-full w-60 bg-gray-800 p-5 flex flex-col space-y-2 transform -translate-x-full md:translate-x-0 transition-transform z-50"
      >
        <h2 className="text-orange-500 text-xl font-bold mb-6">Admin Panel</h2>
        <SidebarLink to="/admindashboard" icon="🏠" label="Home" />
        <SidebarLink to="/adminorder" icon="🧾" label="Orders" />
        <SidebarLink to="/adminpayment" icon="💳" label="Payments" active />
        <SidebarLink to="/adminAnalytics" icon="📊" label="Analytics" />
        <SidebarLink to="/adminmenulist" icon="🏪" label="Restaurants & Stores" />
        <SidebarLink to="/adminsubmissions" icon="📝" label="Submissions" />
        <SidebarLink to="/admincouriers" icon="🏍️" label="Courier Management" />
        <SidebarLink to="/adminreviews" icon="⭐" label="Reviews" />
        <SidebarLink to="/adminwallet" icon="💰" label="Wallet" />
        <SidebarLink to="/adminsetting" icon="⚙️" label="Settings" />
        <SidebarLink to="/adminindex" icon="🚪" label="Logout" danger />
      </aside>

      {/* Hamburger */}
      <div className="fixed top-5 left-5 md:hidden z-50 flex flex-col gap-2 cursor-pointer" onClick={toggleSidebar}>
        <div className="w-8 h-1 bg-orange-500"></div>
        <div className="w-8 h-1 bg-orange-500"></div>
        <div className="w-8 h-1 bg-orange-500"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-60 p-6">
        <h1 className="text-2xl font-bold text-orange-500 mb-6">Payments</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <PaymentCard title="Total Payments" amount="£168.50" color="bg-orange-500" />
          <PaymentCard title="Total COD" amount="£36.00" color="bg-yellow-400" />
          <PaymentCard title="Total Online" amount="£132.50" color="bg-blue-500" />
          <PaymentCard title="Total Paid" amount="£60.00" color="bg-teal-500" />
          <PaymentCard title="Total Unpaid" amount="£108.50" color="bg-pink-500" />
        </div>

        {/* Chart */}
        <div className="bg-white/10 p-5 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-3">Payment Trends</h3>
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input type="text" placeholder="Search payments" className="px-3 py-2 rounded bg-white/20 focus:outline-none" />
          <input type="date" className="px-3 py-2 rounded bg-white/20 focus:outline-none" />
          <input type="date" className="px-3 py-2 rounded bg-white/20 focus:outline-none" />
          <select className="px-3 py-2 rounded bg-white/20 focus:outline-none">
            <option>All Status</option>
          </select>
          <button className="px-4 py-2 rounded bg-red-600 font-semibold">Refresh</button>
          <button className="px-4 py-2 rounded bg-green-600 font-semibold">Export CSV</button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white/10 rounded-lg">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">ORDER ID</th>
                <th className="p-3 text-left">CUSTOMER</th>
                <th className="p-3 text-left">AMOUNT</th>
                <th className="p-3 text-left">METHOD</th>
                <th className="p-3 text-left">STATUS</th>
                <th className="p-3 text-left">DATE</th>
                <th className="p-3 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="even:bg-white/10 hover:bg-white/20">
                  <td className="p-3">693945d8bfadf4ea618324533</td>
                  <td className="p-3">adeosun semiat</td>
                  <td className="p-3">£2.50</td>
                  <td className="p-3">CARD</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-400 text-green-900">Paid</span>
                  </td>
                  <td className="p-3">12/10/2025</td>
                  <td className="p-3">
                    <button className="px-3 py-1 bg-green-600 rounded text-white text-sm">Mark as Paid</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */
const SidebarLink = ({ to, icon, label, active, danger }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors
      ${danger ? "text-red-500 hover:bg-red-600" : active ? "bg-orange-600 text-white" : "text-gray-400 hover:bg-gray-700"}`}
  >
    <span>{icon}</span> {label}
  </Link>
);

const PaymentCard = ({ title, amount, color }) => (
  <div className={`p-4 rounded-lg text-white ${color} flex flex-col justify-between`}>
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="text-lg font-bold">{amount}</p>
  </div>
);
