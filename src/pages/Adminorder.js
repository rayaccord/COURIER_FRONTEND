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
    switch(status) {
      case "pending": return "bg-blue-100 text-blue-500";
      case "processing": return "bg-orange-100 text-orange-500";
      case "confirmed": return "bg-teal-100 text-teal-500";
      default: return "bg-red-100 text-red-500";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-5 flex flex-col transition-transform z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500 w-9 h-9 flex justify-center items-center rounded font-bold text-gray-900">A</div>
          <span className="font-semibold text-white">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-2">
          <SidebarLink to="/admindashboard" icon="🏠" label="Home" />
          <SidebarLink to="/adminorder" icon="🧾" label="Orders" active />
          <SidebarLink to="/adminpayment" icon="💳" label="Payments" />
          <SidebarLink to="/adminAnalytics" icon="📊" label="Analytics" />
          <SidebarLink to="/adminmenulist" icon="🏪" label="Restaurants & Stores" />
          <SidebarLink to="/adminsubmissions" icon="📝" label="Submissions" />
          <SidebarLink to="/admincouriers" icon="🏍️" label="Courier Management" />
          <SidebarLink to="/adminreviews" icon="⭐" label="Reviews" />
          <SidebarLink to="/adminwallet" icon="💰" label="Wallet" />
          <SidebarLink to="/adminsetting" icon="⚙️" label="Settings" />
          <SidebarLink to="/adminindex" icon="🚪" label="Logout" danger />
        </nav>
      </aside>

      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <button className="text-2xl p-2 bg-gray-800 rounded" onClick={toggleSidebar}>
          {sidebarOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6 relative">
        <div className="absolute top-5 right-6 text-2xl">
          <a href="adminnotification">🔔</a>
        </div>

        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">🧾 Orders</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["Pending", "Processing", "Confirmed", "Canceled"].map((f, i) => (
            <div key={i} className={`px-3 py-1 rounded-full text-sm cursor-pointer ${f === "Pending" ? "bg-blue-500 text-gray-900" : "bg-gray-700 text-gray-300"}`}>
              {f}
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700 p-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Items</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Order Status</th>
                <th className="p-2 text-left">Payment</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-gray-700 even:bg-gray-800">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.name}</td>
                  <td className="p-2">{o.items}</td>
                  <td className="p-2">{o.total}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPillClass(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-2">{o.pay}</td>
                  <td className="p-2">{o.date}</td>
                  <td className="p-2">
                    <span className="text-blue-400 cursor-pointer text-xs">View</span>
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

/* Sidebar Link Component */
const SidebarLink = ({ to, icon, label, active, danger }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-sm
      ${danger ? "text-red-500 hover:bg-red-600" : active ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-700"}`}
  >
    <span>{icon}</span> {label}
  </Link>
);
