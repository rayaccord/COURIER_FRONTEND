import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function RestaurantApprovals() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Dummy submissions
  const [submissions, setSubmissions] = useState([
    { id: 1, restaurant: "Gbenga's Grill", type: "New Registration", date: "24 Jan 2026", status: "pending" },
    { id: 2, restaurant: "Olamide Pizza", type: "Menu Update", date: "22 Jan 2026", status: "pending" },
    { id: 3, restaurant: "Sweet Moi-Moi", type: "Profile Update", date: "20 Jan 2026", status: "pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  return (
    <div className="flex bg-[#000814] text-white min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#001d3d] p-5 flex flex-col space-y-2 transition-transform z-50
          ${sidebarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 ml-1">Admin Panel</h2>
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
          <Link
            key={path}
            to={path}
            className={`px-3 py-2 rounded text-sm flex items-center transition-colors ${
              location.pathname === path
                ? "bg-blue-700 text-white"
                : "text-gray-300 hover:bg-[#1f3354] hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </aside>

      {/* Hamburger */}
      <div
        className="fixed top-5 left-5 md:hidden z-50 cursor-pointer text-2xl"
        onClick={() => setSidebarVisible(!sidebarVisible)}
      >
        {sidebarVisible ? "✖" : "☰"}
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-60 p-6 relative">
        <div className="absolute top-5 right-6 text-2xl">
          <a href="adminnotification" className="hover:text-orange-500 transition-colors">
            🔔
          </a>
        </div>

        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-300 mb-8">
          Restaurant Submission Approvals
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-lg overflow-hidden bg-[#001d3d]">
            <thead>
              <tr className="bg-[#001f3d]">
                <th className="px-4 py-3">Restaurant</th>
                <th className="px-4 py-3">Submission Type</th>
                <th className="px-4 py-3">Date Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b border-[#1a1a2e]">
                  <td className="px-4 py-3">{s.restaurant}</td>
                  <td className="px-4 py-3">{s.type}</td>
                  <td className="px-4 py-3">{s.date}</td>
                  <td className="px-4 py-3 capitalize">{s.status}</td>
                  <td className="px-4 py-3 space-x-2">
                    {s.status === "pending" ? (
                      <>
                        <button
                          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors"
                          onClick={() => updateStatus(s.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
                          onClick={() => updateStatus(s.id, "rejected")}
                        >
                          Reject
                        </button>
                        <button className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors">
                          View
                        </button>
                      </>
                    ) : s.status === "approved" ? (
                      <span>✅ Approved</span>
                    ) : (
                      <span>❌ Rejected</span>
                    )}
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
