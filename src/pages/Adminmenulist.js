import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* SAMPLE IMAGES */
import burger from "../assets/burger2.jpg";
import moi from "../assets/moi1.jpeg";

export default function AdminRestaurantStore() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Mama Put", type: "Restaurant", status: "active", img: moi, menus: [] },
    { id: 2, name: "Food Palace", type: "Restaurant", status: "active", img: moi, menus: [] },
    { id: 3, name: "Mini Mart", type: "Store", status: "inactive", img: moi, menus: [] }
  ]);

  const [restaurantModalOpen, setRestaurantModalOpen] = useState(false);
  const [editingRestaurantIndex, setEditingRestaurantIndex] = useState(null);
  const [restaurantForm, setRestaurantForm] = useState({ name: "", type: "Restaurant", status: "active", img: null });

  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
  const [editingMenuIndex, setEditingMenuIndex] = useState(null);
  const [menuForm, setMenuForm] = useState({ name: "", price: "", status: "available", img: null });

  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------------- RESTAURANT HANDLERS ---------------- */
  const openAddRestaurantModal = () => {
    setEditingRestaurantIndex(null);
    setRestaurantForm({ name: "", type: "Restaurant", status: "active", img: null });
    setRestaurantModalOpen(true);
  };

  const openEditRestaurantModal = (index) => {
    setEditingRestaurantIndex(index);
    setRestaurantForm(restaurants[index]);
    setRestaurantModalOpen(true);
  };

  const handleRestaurantImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setRestaurantForm({ ...restaurantForm, img: reader.result });
    reader.readAsDataURL(file);
  };

  const saveRestaurant = () => {
    if (!restaurantForm.name) return alert("Enter restaurant/store name");
    const updated = [...restaurants];
    if (editingRestaurantIndex === null) {
      updated.push({ ...restaurantForm, id: Date.now(), menus: [] });
    } else {
      updated[editingRestaurantIndex] = { ...restaurantForm, menus: updated[editingRestaurantIndex].menus || [] };
    }
    setRestaurants(updated);
    setRestaurantModalOpen(false);
  };

  const deleteRestaurant = (index) => {
    if (window.confirm("Delete this restaurant/store?")) {
      setRestaurants(restaurants.filter((_, i) => i !== index));
    }
  };

  /* ---------------- MENU HANDLERS ---------------- */
  const openAddMenuModal = (restaurantIndex) => {
    setSelectedRestaurantIndex(restaurantIndex);
    setEditingMenuIndex(null);
    setMenuForm({ name: "", price: "", status: "available", img: null });
    setMenuModalOpen(true);
  };

  const openEditMenuModal = (restaurantIndex, menuIndex) => {
    setSelectedRestaurantIndex(restaurantIndex);
    setEditingMenuIndex(menuIndex);
    setMenuForm(restaurants[restaurantIndex].menus[menuIndex]);
    setMenuModalOpen(true);
  };

  const handleMenuImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setMenuForm({ ...menuForm, img: reader.result });
    reader.readAsDataURL(file);
  };

  const saveMenu = () => {
    if (!menuForm.name || !menuForm.price) return alert("Fill all fields");
    const updatedRestaurants = [...restaurants];
    const menus = [...updatedRestaurants[selectedRestaurantIndex].menus];
    if (editingMenuIndex === null) {
      menus.push(menuForm);
    } else {
      menus[editingMenuIndex] = menuForm;
    }
    updatedRestaurants[selectedRestaurantIndex].menus = menus;
    setRestaurants(updatedRestaurants);
    setMenuModalOpen(false);
  };

  const deleteMenu = (restaurantIndex, menuIndex) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[restaurantIndex].menus = updatedRestaurants[restaurantIndex].menus.filter((_, i) => i !== menuIndex);
    setRestaurants(updatedRestaurants);
  };

  return (
    <div className="bg-[#000814] min-h-screen text-white flex">
      {/* Sidebar */}
      <aside className={`bg-[#001d3d] w-56 p-5 flex flex-col fixed top-0 left-0 h-full transition-transform z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="mb-6 text-xl font-semibold">Admin Panel</h2>
        <ul className="flex flex-col gap-2">
          {[
            ["🏠 Home", "/admindashboard"],
            ["🧾 Orders", "/adminorder"],
            ["💳 Payments", "/adminpayment"],
            ["📊 Analytics", "/adminAnalytics"],
            ["🏪 Restaurants & Stores", "/adminrestaurants"],
            ["📝 Submissions", "/adminsubmissions"],
            ["🏍️ Courier Management", "/admincouriers"],
            ["⭐ Reviews", "/adminreviews"],
            ["💰 Wallet", "/adminwallet"],
            ["⚙️ Settings", "/adminsetting"],
            ["🚪 Log-out", "/adminindex"]
          ].map(([label, path], i) => (
            <li key={i} className={`px-4 py-2 rounded ${label.includes("Restaurants") ? "bg-orange-600/30 border-l-4 border-orange-500" : ""}`}>
              <Link to={path} className="text-white">{label}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile toggle */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 text-2xl md:hidden"
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>
      )}

      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-56 p-6">
        <h1 className="text-center text-orange-500 text-2xl mb-5">Restaurants & Stores</h1>
        <button
          onClick={openAddRestaurantModal}
          className="mb-5 px-4 py-2 bg-orange-500 rounded hover:opacity-90 transition"
        >
          ➕ Add Restaurant / Store
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {restaurants.map((r, ri) => (
            <div key={r.id} className="bg-white text-black rounded-lg p-3 flex flex-col items-center">
              <img src={r.img || moi} alt={r.name} className="w-full h-32 object-cover rounded mb-2" />
              <h3 className="font-semibold">{r.name}</h3>
              <p className="text-sm mb-1"><b>{r.type}</b></p>
              <div className={`px-2 py-1 rounded text-xs text-white ${r.status === "active" ? "bg-green-500" : "bg-red-500"}`}>{r.status}</div>

              <button onClick={() => openAddMenuModal(ri)} className="mt-2 text-xs px-2 py-1 bg-blue-500 rounded hover:opacity-90">➕ Add Menu</button>

              {/* Menus */}
              <div className="w-full mt-2 space-y-2">
                {r.menus.map((m, mi) => (
                  <div key={mi} className="bg-gray-200 text-black rounded p-2">
                    <img src={m.img || burger} alt={m.name} className="w-full h-20 object-cover rounded mb-1" />
                    <h4 className="text-sm font-medium">{m.name}</h4>
                    <span className="text-xs font-bold">₦{m.price}</span>
                    <div className={`mt-1 px-1 py-0.5 rounded text-white text-[10px] ${m.status === "available" ? "bg-green-500" : "bg-red-500"}`}>{m.status}</div>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => openEditMenuModal(ri, mi)} className="text-[10px] px-1 py-0.5 bg-yellow-400 rounded">Edit</button>
                      <button onClick={() => deleteMenu(ri, mi)} className="text-[10px] px-1 py-0.5 bg-red-500 rounded">Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex gap-2">
                <button onClick={() => openEditRestaurantModal(ri)} className="text-xs px-2 py-1 bg-yellow-400 rounded">Edit Restaurant</button>
                <button onClick={() => deleteRestaurant(ri)} className="text-xs px-2 py-1 bg-red-500 rounded">Delete Restaurant</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Restaurant Modal */}
      {restaurantModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white text-black p-5 rounded-lg w-80 flex flex-col gap-2">
            <h3 className="text-center text-orange-500">{editingRestaurantIndex !== null ? "Edit" : "Add"} Restaurant / Store</h3>
            <input
              placeholder="Name"
              value={restaurantForm.name}
              onChange={e => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={restaurantForm.type}
              onChange={e => setRestaurantForm({ ...restaurantForm, type: e.target.value })}
              className="p-2 border rounded"
            >
              <option>Restaurant</option>
              <option>Store</option>
            </select>
            <select
              value={restaurantForm.status}
              onChange={e => setRestaurantForm({ ...restaurantForm, status: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input type="file" onChange={handleRestaurantImage} className="p-1" />
            <div className="flex justify-between mt-2">
              <button onClick={saveRestaurant} className="px-3 py-1 bg-orange-500 rounded hover:opacity-90">Save</button>
              <button onClick={() => setRestaurantModalOpen(false)} className="px-3 py-1 bg-gray-400 rounded hover:opacity-90">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {menuModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white text-black p-5 rounded-lg w-80 flex flex-col gap-2">
            <h3 className="text-center text-orange-500">{editingMenuIndex !== null ? "Edit" : "Add"} Menu Item</h3>
            <input
              placeholder="Menu Name"
              value={menuForm.name}
              onChange={e => setMenuForm({ ...menuForm, name: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={menuForm.price}
              onChange={e => setMenuForm({ ...menuForm, price: e.target.value })}
              className="p-2 border rounded"
            />
            <select
              value={menuForm.status}
              onChange={e => setMenuForm({ ...menuForm, status: e.target.value })}
              className="p-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <input type="file" onChange={handleMenuImage} className="p-1" />
            <div className="flex justify-between mt-2">
              <button onClick={saveMenu} className="px-3 py-1 bg-orange-500 rounded hover:opacity-90">Save</button>
              <button onClick={() => setMenuModalOpen(false)} className="px-3 py-1 bg-gray-400 rounded hover:opacity-90">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
