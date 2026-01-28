import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* SAMPLE IMAGES */
import burger from "../assets/burger2.jpg";
import moi from "../assets/moi1.jpeg";

const AdminRestaurantStore = () => {
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
    <div style={{ background: "#000814", minHeight: "100vh", color: "#fff" }}>
      {/* MOBILE TOGGLE */}
      {isMobile && (
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ position: "fixed", top: 10, left: 10, fontSize: 24, cursor: "pointer", zIndex: 1001 }}
        >
          {sidebarOpen ? "✖" : "☰"}
        </div>
      )}

      {/* SIDEBAR */}
      <div
        style={{
          width: 230,
          background: "#001d3d",
          height: "100vh",
          paddingTop: 20,
          position: "fixed",
          left: sidebarOpen ? 0 : isMobile ? -250 : 0,
          transition: "0.3s",
          zIndex: 1000
        }}
      >
        <h2 style={{ marginLeft: 20 }}>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
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
            <li
              key={i}
              style={{
                padding: "12px 20px",
                background: label.includes("Restaurants") ? "rgba(255,107,0,.25)" : "transparent",
                borderLeft: label.includes("Restaurants") ? "4px solid #ff6b00" : "none"
              }}
            >
              <Link to={path} style={{ color: "#fff", textDecoration: "none" }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: isMobile ? 0 : 250, padding: 40 }}>
        <h1 style={{ textAlign: "center", color: "#ff6b00" }}>Restaurants & Stores</h1>

        <button onClick={openAddRestaurantModal} style={{ marginBottom: 20 }}>
          ➕ Add Restaurant / Store
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 15 }}>
          {restaurants.map((r, ri) => (
            <div
              key={r.id}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: 10,
                padding: 10,
                textAlign: "center"
              }}
            >
              <img src={r.img || moi} alt={r.name} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
              <h3 style={{ fontSize: 16 }}>{r.name}</h3>
              <p style={{ fontSize: 14 }}><b>{r.type}</b></p>
              <div style={{
                background: r.status === "active" ? "green" : "red",
                color: "#fff",
                padding: 4,
                borderRadius: 6,
                fontSize: 12
              }}>{r.status}</div>

              <br />
              <button onClick={() => openAddMenuModal(ri)} style={{ fontSize: 12 }}>➕ Add Menu</button>

              {/* SHOW MENUS */}
              <div style={{ marginTop: 10 }}>
                {r.menus.map((m, mi) => (
                  <div key={mi} style={{ background: "#e0e0e0", borderRadius: 8, padding: 6, margin: "6px 0" }}>
                    <img src={m.img || burger} alt={m.name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 6 }} />
                    <h4 style={{ fontSize: 14 }}>{m.name}</h4>
                    <b style={{ fontSize: 12 }}>₦{m.price}</b>
                    <div style={{
                      background: m.status === "available" ? "green" : "red",
                      color: "#fff",
                      padding: 3,
                      borderRadius: 6,
                      fontSize: 10,
                      marginTop: 4
                    }}>{m.status}</div>
                    <button onClick={() => openEditMenuModal(ri, mi)} style={{ fontSize: 10 }}>Edit</button>{" "}
                    <button onClick={() => deleteMenu(ri, mi)} style={{ fontSize: 10 }}>Delete</button>
                  </div>
                ))}
              </div>

              <br />
              <button onClick={() => openEditRestaurantModal(ri)} style={{ fontSize: 12 }}>Edit Restaurant</button>{" "}
              <button onClick={() => deleteRestaurant(ri)} style={{ fontSize: 12 }}>Delete Restaurant</button>
            </div>
          ))}
        </div>
      </div>

      {/* RESTAURANT MODAL */}
      {restaurantModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 12, width: 300 }}>
            <h3 style={{ color: "#ff6b00", textAlign: "center" }}>
              {editingRestaurantIndex !== null ? "Edit" : "Add"} Restaurant / Store
            </h3>

            <input
              placeholder="Name"
              value={restaurantForm.name}
              onChange={e => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
            />

            <select
              value={restaurantForm.type}
              onChange={e => setRestaurantForm({ ...restaurantForm, type: e.target.value })}
            >
              <option>Restaurant</option>
              <option>Store</option>
            </select>

            <select
              value={restaurantForm.status}
              onChange={e => setRestaurantForm({ ...restaurantForm, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <input type="file" onChange={handleRestaurantImage} />

            <button onClick={saveRestaurant}>Save</button>
            <button onClick={() => setRestaurantModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* MENU MODAL */}
      {menuModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 2000 }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 12, width: 300 }}>
            <h3 style={{ color: "#ff6b00", textAlign: "center" }}>
              {editingMenuIndex !== null ? "Edit" : "Add"} Menu Item
            </h3>

            <input
              placeholder="Menu Name"
              value={menuForm.name}
              onChange={e => setMenuForm({ ...menuForm, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Price (₦)"
              value={menuForm.price}
              onChange={e => setMenuForm({ ...menuForm, price: e.target.value })}
            />

            <select
              value={menuForm.status}
              onChange={e => setMenuForm({ ...menuForm, status: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <input type="file" onChange={handleMenuImage} />

            <button onClick={saveMenu}>Save</button>
            <button onClick={() => setMenuModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurantStore;
