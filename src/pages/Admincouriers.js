import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function CourierManagement() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Courier list
  const [couriers, setCouriers] = useState([
    {
      id: 1,
      name: "Tunde Akintola",
      phone: "08012345678",
      vehicle: "Bike",
      status: "Available",
      earnings: 12000,
    },
    {
      id: 2,
      name: "Chinedu Okafor",
      phone: "08087654321",
      vehicle: "Car",
      status: "On Delivery",
      earnings: 22000,
    },
  ]);

  // New courier registration
  const [newCourier, setNewCourier] = useState({
    name: "",
    phone: "",
    vehicle: "",
  });

  const registerCourier = () => {
    if (!newCourier.name || !newCourier.phone || !newCourier.vehicle) {
      return alert("Please fill all fields");
    }
    setCouriers([
      ...couriers,
      { ...newCourier, id: couriers.length + 1, status: "Available", earnings: 0 },
    ]);
    setNewCourier({ name: "", phone: "", vehicle: "" });
    alert("Courier registered successfully!");
  };

  const toggleStatus = (id) => {
    setCouriers(
      couriers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Available" ? "On Delivery" : "Available" }
          : c
      )
    );
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

        <h1 className="text-3xl font-bold text-center mb-10">Courier Management</h1>

        {/* Register New Courier */}
        <div className="bg-[#001d3d] p-6 rounded-lg flex flex-wrap gap-4 mb-10">
          <input
            className="flex-1 px-4 py-2 rounded-md bg-[#001f3d] text-white focus:outline-none"
            placeholder="Courier Name"
            value={newCourier.name}
            onChange={(e) => setNewCourier({ ...newCourier, name: e.target.value })}
          />
          <input
            className="flex-1 px-4 py-2 rounded-md bg-[#001f3d] text-white focus:outline-none"
            placeholder="Phone Number"
            value={newCourier.phone}
            onChange={(e) => setNewCourier({ ...newCourier, phone: e.target.value })}
          />
          <input
            className="flex-1 px-4 py-2 rounded-md bg-[#001f3d] text-white focus:outline-none"
            placeholder="Vehicle Type"
            value={newCourier.vehicle}
            onChange={(e) => setNewCourier({ ...newCourier, vehicle: e.target.value })}
          />
          <button
            className="px-6 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
            onClick={registerCourier}
          >
            Register Courier
          </button>
        </div>

        {/* Courier List */}
        <h2 className="text-2xl font-semibold mb-4">Current Couriers</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-[#001d3d] text-left text-white">
            <thead className="bg-[#001f3d]">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Earnings (₦)</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {couriers.map((c) => (
                <tr key={c.id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.vehicle}</td>
                  <td className="px-4 py-2">{c.status}</td>
                  <td className="px-4 py-2">{c.earnings.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <button
                      className={`px-3 py-1 rounded-md text-white font-semibold transition ${
                        c.status === "Available" ? "bg-green-600 hover:bg-green-700" : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                      onClick={() => toggleStatus(c.id)}
                    >
                      {c.status === "Available" ? "Set On Delivery" : "Set Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
