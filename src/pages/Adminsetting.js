import { useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [fullName, setFullName] = useState("Gbenga Oladipopu");
  const [email, setEmail] = useState("adcsoufsemiat5003@gmail.com");

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewSrc(URL.createObjectURL(file));
  };

  return (
    <div className="flex bg-[#000814] text-white min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#001d3d] p-5 flex flex-col space-y-2 transition-transform z-50
          ${sidebarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 ml-1">Admin Panel</h2>
        <SidebarLink to="/admindashboard" icon="🏠" label="Home" />
        <SidebarLink to="/adminorder" icon="🧾" label="Orders" />
        <SidebarLink to="/adminpayment" icon="💳" label="Payments" />
        <SidebarLink to="/adminAnalytics" icon="📊" label="Analytics" />
        <SidebarLink to="/adminmenulist" icon="🏪" label="Restaurants & Stores" />
        <SidebarLink to="/adminsubmissions" icon="📝" label="Submissions" />
        <SidebarLink to="/admincouriers" icon="🏍️" label="Courier Management" />
        <SidebarLink to="/adminreviews" icon="⭐" label="Reviews" />
        <SidebarLink to="/adminwallet" icon="💰" label="Wallet" />
        <SidebarLink to="/adminsetting" icon="⚙️" label="Settings" active />
        <SidebarLink to="/adminindex" icon="🚪" label="Log-out" danger />
      </aside>

      {/* Hamburger */}
      <div
        className="fixed top-5 left-5 md:hidden z-50 cursor-pointer text-2xl"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? "✖" : "☰"}
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-60 p-6 relative">
        <div className="absolute top-5 right-6 text-2xl">
          <a href="adminnotification" className="hover:text-orange-500 transition-colors">🔔</a>
        </div>

        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-300 mb-8">
          Admin Settings
        </h1>

        <div className="bg-[#001d3d] rounded-lg p-6 md:p-8 max-w-lg mx-auto space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col items-center">
            {previewSrc && (
              <img
                src={previewSrc}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
            )}
            <label className="mb-2 text-sm font-semibold">Profile Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-sm text-white cursor-pointer bg-orange-600 rounded-lg py-2 px-3 mb-4"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Save Changes
          </button>
        </div>

        <footer className="text-center text-gray-400 text-sm mt-10 pb-4">
          © 2025 Hooks Food. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

/* ---------------- Sidebar Link Component ---------------- */
const SidebarLink = ({ to, icon, label, active, danger }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors
      ${danger ? "text-red-500 hover:bg-red-600" : active ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-[#1f3354] hover:text-white"}`}
  >
    <span>{icon}</span> {label}
  </Link>
);
