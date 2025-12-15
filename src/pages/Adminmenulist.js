import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* IMAGE IMPORTS */
import burger from "../assets/burger2.jpg";
import moi from "../assets/moi1.jpeg";
import pizza from "../assets/pizza2.jpg";
import friedRice from "../assets/rice7.jpeg";
import jollof from "../assets/rice8.jpeg";
import yamEgg from "../assets/yam4.jpeg";
import banga from "../assets/swallow5.jpeg";
import salad from "../assets/salad2.jpg";
import shawarma from "../assets/shawarma.jpeg";
import amala from "../assets/swallow1.jpeg";

const Adminmenulist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const [foods, setFoods] = useState([
    { name: "Burger", price: 1800, status: "unavailable", img: burger },
    { name: "Moi-Moi", price: 1500, status: "available", img: moi },
    { name: "Pizza", price: 2000, status: "available", img: pizza },
    { name: "Fried-Rice", price: 1200, status: "available", img: friedRice },
    { name: "Jollof-Rice", price: 500, status: "unavailable", img: jollof },
    { name: "Yam and Egg", price: 1200, status: "available", img: yamEgg },
    { name: "Starch and Banga Soup", price: 500, status: "unavailable", img: banga },
    { name: "Salad", price: 800, status: "available", img: salad },
    { name: "Shawarma", price: 500, status: "unavailable", img: shawarma },
    { name: "Amala and Egusi Soup", price: 2200, status: "available", img: amala }
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", status: "available" });

  const filteredFoods = foods.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const handleImage = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result);
    reader.readAsDataURL(file);
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setUploadedImage(null);
    setForm({ name: "", price: "", status: "available" });
    setModalOpen(true);
  };

  const openEditModal = index => {
    setEditingIndex(index);
    setForm({ ...foods[index] });
    setUploadedImage(null);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveItem = () => {
    if (!form.name || !form.price) return alert("Fill all fields");

    const img =
      uploadedImage || (editingIndex !== null ? foods[editingIndex].img : foods[0].img);

    const newItem = { ...form, img };

    if (editingIndex === null) setFoods([...foods, newItem]);
    else {
      const updated = [...foods];
      updated[editingIndex] = newItem;
      setFoods(updated);
    }

    setModalOpen(false);
    setUploadedImage(null);
  };

  const deleteItem = index => {
    if (window.confirm(`Delete "${foods[index].name}"?`)) {
      setFoods(foods.filter((_, i) => i !== index));
    }
  };

  return (
    <div style={{ background: "#000814", minHeight: "100vh", color: "#fff" }}>
      {/* MOBILE MENU TOGGLE */}
      {isMobile && (
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "fixed",
            top: 10,
            left: 10,
            fontSize: 24,
            cursor: "pointer",
            zIndex: 1001
          }}
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
            ["📊 Analytics", "/adminAanalytics"],
            ["📋 Menu Items", "/adminmenulist"],
            ["⭐ Reviews", "/adminreviews"],
            ["⚙️ Settings", "/adminsetting"],
            ["🚪 Log-out", "/adminindex"]
          ].map(([label, path], i) => (
            <li
              key={i}
              style={{
                padding: "12px 20px",
                background: label.includes("Menu") ? "rgba(255,107,0,.25)" : "transparent",
                borderLeft: label.includes("Menu") ? "4px solid #ff6b00" : "none"
              }}
            >
              <Link
                to={path}
                style={{ color: "#fff", textDecoration: "none", display: "block" }}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: isMobile ? 0 : 250, padding: 40 }}>
        <h1 style={{ textAlign: "center", color: "#ff6b00" }}>Menu Items</h1>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: 10, borderRadius: 6 }}
          />
          <button onClick={openAddModal}>Add Item</button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: 20
          }}
        >
          {filteredFoods.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                color: "#000",
                borderRadius: 10,
                padding: 10,
                textAlign: "center"
              }}
            >
              <img
                src={f.img}
                alt={f.name}
                style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 10 }}
              />
              <h4>{f.name}</h4>
              <b>₦{f.price}</b>
              <div
                style={{
                  background: f.status === "available" ? "green" : "red",
                  color: "#fff",
                  padding: 5,
                  borderRadius: 6,
                  margin: "8px 0"
                }}
              >
                {f.status}
              </div>
              <button onClick={() => openEditModal(i)}>Edit</button>{" "}
              <button onClick={() => deleteItem(i)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000
          }}
        >
          <div
            style={{
              background: "#fff",
              color: "#000",
              padding: 20,
              width: 360,
              borderRadius: 14
            }}
          >
            <h3 style={{ color: "#ff6b00", textAlign: "center" }}>
              {editingIndex !== null ? "Edit" : "Add"} Menu Item
            </h3>

            {uploadedImage || editingIndex !== null ? (
              <img
                src={uploadedImage || foods[editingIndex]?.img}
                alt=""
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 10
                }}
              />
            ) : null}

            <input type="file" onChange={handleImage} />
            <input
              placeholder="Food Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price (₦)"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <button onClick={saveItem}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminmenulist;
