import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  // ---- PROFILE STATE ----
  const [name, setName] = useState(localStorage.getItem("profile_name") || "Jeff Martin");
  const [email, setEmail] = useState(localStorage.getItem("profile_email") || "jeffmartins172@gmail.com");
  const [phone, setPhone] = useState(localStorage.getItem("profile_phone") || "+2347085514315");
  const [avatar, setAvatar] = useState(localStorage.getItem("profile_pic") || null);
  const [activeTab, setActiveTab] = useState("personal");
  const [redeemCode, setRedeemCode] = useState("");
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("orders") || "[]"));
  const [orderFilter, setOrderFilter] = useState("all");
  const [modalOrder, setModalOrder] = useState(null);

  // ---- AVATAR HELPERS ----
  const getInitials = (str) => {
    if (!str) return "U";
    const parts = str.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      localStorage.setItem("profile_pic", dataUrl);
      setAvatar(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // ---- SAVE PROFILE ----
  const saveProfile = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_phone", phone);
    setAvatar(localStorage.getItem("profile_pic"));
    alert("Profile saved!");
  };

  const cancelProfile = () => {
    setName(localStorage.getItem("profile_name") || "Jeff Martin");
    setEmail(localStorage.getItem("profile_email") || "jeffmartins172@gmail.com");
    setPhone(localStorage.getItem("profile_phone") || "+2347085514315");
  };

  // ---- LOGOUT & DELETE ----
  const logout = () => {
    if (!window.confirm("Log out?")) return;
    sessionStorage.clear();
    window.location.href = "discovery";
  };

  const deleteAccount = () => {
    if (!window.confirm("Delete account and all saved info? This is irreversible for demo.")) return;
    localStorage.removeItem("profile_name");
    localStorage.removeItem("profile_email");
    localStorage.removeItem("profile_phone");
    localStorage.removeItem("profile_pic");
    sessionStorage.clear();
    alert("Account data removed (demo).");
    window.location.reload();
  };

  // ---- ORDER HANDLERS ----
  const filteredOrders = orders.filter((o) => (orderFilter === "all" ? true : o.status === orderFilter));

  const openOrderModal = (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    setModalOrder(order);
  };

  const closeModal = () => setModalOrder(null);

  const reorder = (id) => {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    order.items.forEach((i) => cart.push({ ...i }));
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Items added back to cart!");
  };

  const applyRedeem = () => {
    if (!redeemCode.trim()) { alert("Enter a code"); return; }
    alert(`Code "${redeemCode}" applied (demo).`);
  };

  // ---- JSX ----
  return (
    <div style={{ fontFamily: "Poppins, system-ui, sans-serif", background: "#faf9f8", color: "#222" }}>
      {/* HEADER */}
      <header style={{
        background: "#fff", borderBottom: "1px solid #e9e9e9",
        padding: "18px 5%", position: "sticky", top: 0, display: "flex",
        justifyContent: "space-between", alignItems: "center", zIndex: 40
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={{ fontSize: "20px" }}>Profile</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{
            display: "inline-flex", gap: "8px", padding: "10px 12px", borderRadius: "10px",
            background: "#f5f8ff", color: "#0f4bd6", border: "1px solid #e8f0ff", cursor: "pointer",
            fontWeight: 600
          }}
            onClick={() => window.location.href = "mailto:support@hooksfood.example?subject=Support%20request"}
          >
            💬 Contact Support
          </button>
          <button style={{ background: "transparent", border: "1px solid #e9e9e9", borderRadius: "10px", cursor: "pointer" }} onClick={logout}>Log out</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: "1100px", margin: "26px auto", padding: "0 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px" }}>
          {/* LEFT */}
          <aside style={{
            background: "#fff", borderRadius: "12px", border: "1px solid #e9e9e9",
            padding: "22px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div onClick={() => setActiveTab("personal")} style={{
                width: "88px", height: "88px", borderRadius: "50%", background: "#dff3eb",
                display: "flex", justifyContent: "center", alignItems: "center", fontSize: "26px", fontWeight: "700",
                color: "#2f6b59", overflow: "hidden", boxShadow: "0 6px 18px rgba(32,32,32,0.05)", cursor: "pointer"
              }}>
                {avatar ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : getInitials(name)}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{name}</h2>
                <p style={{ margin: "6px 0 0", color: "#8a8a8a", fontSize: "14px" }}>{email}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <label style={{ cursor: "pointer" }}>
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                    <button style={{ border: "none", background: "transparent", color: "#fd6128", cursor: "pointer", fontWeight: 600, padding: "6px", borderRadius: "8px" }}>Change photo</button>
                  </label>
                  <button onClick={deleteAccount} style={{ color: "#e05454", background: "none", border: 0, fontWeight: 700 }}>Delete</button>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "18px", padding: "14px", borderRadius: "10px", background: "#fbfbfb", border: "1px solid #e9e9e9", fontSize: "14px", color: "#444" }}>
              <strong>Hooks gift cards</strong>
              <div style={{ color: "#8a8a8a" }}>You can use gift cards to pay for your orders.</div>
              <a href="#" style={{ color: "#fd6128", fontWeight: 700, marginTop: "8px", display: "inline-block" }}>View gift cards</a>
            </div>

            <div style={{ marginTop: "12px", padding: "14px", borderRadius: "10px", background: "#fbfbfb", border: "1px solid #e9e9e9", fontSize: "14px", color: "#444" }}>
              <strong>Hooks credits</strong>
              <div style={{ color: "#8a8a8a" }}>You can use credits to pay for your orders.</div>
              <div style={{ marginTop: "8px", fontWeight: 700 }}>€0.00</div>
            </div>
          </aside>

          {/* RIGHT */}
          <section>
            {/* Tabs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "18px", alignItems: "center", borderBottom: "1px solid #e9e9e9", paddingBottom: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
                {["personal", "payment", "addresses", "orders", "redeem", "settings"].map(tab => (
                  <div key={tab} onClick={() => setActiveTab(tab)} style={{
                    padding: "10px 6px", cursor: "pointer",
                    color: activeTab === tab ? "#222" : "#8a8a8a", fontWeight: 600,
                    borderBottom: activeTab === tab ? "3px solid #fd6128" : "3px solid transparent"
                  }}>{tab === "personal" ? "Personal info" :
                    tab === "payment" ? "Payment methods" :
                      tab === "addresses" ? "Addresses" :
                        tab === "orders" ? "Orders" :
                          tab === "redeem" ? "Redeem code" :
                            "Settings"
                  }</div>
                ))}
              </div>
            </div>

            {/* PANELS */}
            {/* PERSONAL INFO */}
            {activeTab === "personal" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <div style={{ width: "160px", color: "#8a8a8a", fontSize: "14px" }}>Name</div>
                  <div style={{ flex: 1 }}><input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e6e6e6", fontSize: "14px" }} /></div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <div style={{ width: "160px", color: "#8a8a8a", fontSize: "14px" }}>Email</div>
                  <div style={{ flex: 1 }}><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e6e6e6", fontSize: "14px" }} /></div>
                </div>
                <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
                  <div style={{ width: "160px", color: "#8a8a8a", fontSize: "14px" }}>Phone number</div>
                  <div style={{ flex: 1 }}><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e6e6e6", fontSize: "14px" }} /></div>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button onClick={saveProfile} style={{ padding: "10px 14px", borderRadius: "10px", cursor: "pointer", border: 0, fontWeight: 700, background: "#fd6128", color: "#fff" }}>Save</button>
                  <button onClick={cancelProfile} style={{ padding: "10px 14px", borderRadius: "10px", cursor: "pointer", border: 1, fontWeight: 700, background: "transparent", color: "#8a8a8a", borderStyle: "solid", borderColor: "#e9e9e9" }}>Cancel</button>
                </div>
              </div>
            )}

            {/* PAYMENT METHODS */}
            {activeTab === "payment" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <h2>Payment Methods</h2>
                <p style={{ color: "#8a8a8a" }}>You can add, edit or remove your payment methods here. (Demo)</p>
                <button style={{ padding: "10px 20px", borderRadius: "10px", border: 0, background: "#fd6128", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Add New Card</button>
              </div>
            )}

            {/* ADDRESSES */}
            {activeTab === "addresses" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <h2>Addresses</h2>
                <p style={{ color: "#8a8a8a" }}>You can manage your delivery addresses here. (Demo)</p>
                <button style={{ padding: "10px 20px", borderRadius: "10px", border: 0, background: "#fd6128", color: "#fff", cursor: "pointer", fontWeight: 600 }}>Add New Address</button>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <h2>Order History</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", marginBottom: "14px" }}>
                  {["all", "completed", "pending", "cancelled"].map(f => (
                    <button key={f} onClick={() => setOrderFilter(f)} style={{
                      border: "1px solid #e9e9e9", padding: "6px 14px", borderRadius: "20px",
                      background: orderFilter === f ? "#fd6128" : "#fff", color: orderFilter === f ? "#fff" : "#000", cursor: "pointer"
                    }}>{f.charAt(0).toUpperCase() + f.slice(1)}</button>
                  ))}
                </div>
                {filteredOrders.length === 0 ? <div style={{ color: "#8a8a8a" }}>No orders found.</div> :
                  filteredOrders.map(order => (
                    <div key={order.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px", borderRadius: "16px", border: "1px solid #e9e9e9", marginBottom: "14px", background: "#fff" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <strong>Order #{order.id}</strong>
                        <div style={{ fontSize: "14px", color: "#8a8a8a" }}>{order.items.length} items • ₦{order.total}</div>
                        <div style={{ fontSize: "12px", color: "#8a8a8a" }}>{order.date}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          padding: "3px 10px", borderRadius: "30px", fontSize: "13px",
                          background: order.status === "completed" ? "#e7ffe7" : order.status === "pending" ? "#fff5cc" : "#ffe7e7",
                          color: order.status === "completed" ? "#2a8a2a" : order.status === "pending" ? "#b88a00" : "#c55454"
                        }}>{order.status}</div>
                        <button onClick={() => openOrderModal(order.id)} style={{ marginTop: "5px", display: "block", cursor: "pointer", border: "1px solid #e9e9e9", borderRadius: "10px", padding: "4px 8px", background: "transparent" }}>Details</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {/* REDEEM CODE TAB */}
            {activeTab === "redeem" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <h2>Redeem Code</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <input type="text" value={redeemCode} onChange={(e) => setRedeemCode(e.target.value)} placeholder="Enter code" style={{ flex: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid #e9e9e9" }} />
                  <button onClick={applyRedeem} style={{ padding: "10px 14px", borderRadius: "10px", border: 0, background: "#fd6128", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Apply</button>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <h2>Settings</h2>
                <div style={{ marginTop: "10px" }}>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span>Newsletter</span>
                    <input type="checkbox" checked={true} onChange={() => alert("Toggle demo")} />
                  </label>
                  <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Notifications</span>
                    <input type="checkbox" checked={true} onChange={() => alert("Toggle demo")} />
                  </label>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
