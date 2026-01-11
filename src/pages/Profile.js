import React, { useState, useEffect } from "react";

const Field = ({ label, children }) => (
  <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
    <div style={{ width: "160px", color: "#8a8a8a", fontSize: "14px" }}>{label}</div>
    <div style={{ flex: 1 }}>
      {React.cloneElement(children, {
        style: {
          width: "100%",
          padding: "12px 14px",
          borderRadius: "8px",
          border: "1px solid #e6e6e6",
          fontSize: "14px",
        },
      })}
    </div>
  </div>
);

const ProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem("userProfile"));

  // --- FIX OLD ORDERS ---
  useEffect(() => {
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

  const fixedOrders = existingOrders.map(order => ({
  ...order,
  status: order.status || "ongoing",
  items:
    order.items ||
    order.cart?.map(item => ({
      name: item.name || "Unnamed Item",
      price: parseFloat(item.price) || 0,
      quantity: item.quantity || 1,
      image: item.image || item.img || null, // ✅ ADD IMAGE
    })) ||
    [],
}));


  localStorage.setItem("orders", JSON.stringify(fixedOrders));
}, []);


  // ... rest of your state and useEffects


  const [paymentMethods, setPaymentMethods] = useState(
    JSON.parse(localStorage.getItem("paymentMethods") || "[]")
  );

  const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem("addresses") || "[]"));

  // ---- PROFILE STATE ----
  const [name, setName] = useState(storedUser?.firstName || "");
  const [otherName, setOtherName] = useState(storedUser?.otherName || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [country, setCountry] = useState(storedUser?.country || "");
  const [stateLocation, setStateLocation] = useState(storedUser?.state || "");
  const [address, setAddress] = useState(storedUser?.address || "");
  const [password, setPassword] = useState(storedUser?.password || "");
  const [showPassword, setShowPassword] = useState(false);

  // ---- UI STATE ----
  const [avatar, setAvatar] = useState(localStorage.getItem("profile_pic") || null);
  const [activeTab, setActiveTab] = useState("personal");
  const [redeemCode, setRedeemCode] = useState("");
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem("orders") || "[]"));
  const [orderFilter, setOrderFilter] = useState("ongoing");
  const [modalOrder, setModalOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);




  // ---------- SYNC PAYMENT METHODS WHEN TAB OPENS ----------
  useEffect(() => {
    if (activeTab === "payment") {
      const saved = JSON.parse(localStorage.getItem("paymentMethods") || "[]");
      setPaymentMethods(saved);
    }
  }, [activeTab]);

  /* ---------- SYNC ADDRESSES WHEN TAB OPENS ---------- */
useEffect(() => {
  if (activeTab === "addresses") {
    const savedUser = JSON.parse(localStorage.getItem("userProfile")) || {};
    setAddresses(savedUser.addresses || []);
  }
}, [activeTab]);

/* ---------- SYNC ORDERS WHEN TAB OPENS ---------- */
useEffect(() => {
  if (activeTab === "orders") {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }
}, [activeTab]);




  // ---- HELPERS ----
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

  const cancelProfile = () => {
    if (!storedUser) return;
    setName(storedUser.firstName || "");
    setOtherName(storedUser.otherName || "");
    setEmail(storedUser.email || "");
    setPhone(storedUser.phone || "");
    setCountry(storedUser.country || "");
    setStateLocation(storedUser.state || "");
    setAddress(storedUser.address || "");
    setPassword(storedUser.password || "");
  };

  const saveProfile = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    const updatedUser = {
      ...storedUser,
      firstName: name.trim(),
      otherName,
      email,
      phone,
      country,
      state: stateLocation,
      address,
      password,
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  const logout = () => {
    if (!window.confirm("Log out?")) return;

    // Clear auth + user data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    localStorage.removeItem("profile_pic");
    localStorage.removeItem("paymentMethods"); // clear payment methods

    sessionStorage.clear();

    // Clear state immediately
    setPaymentMethods([]);

    window.location.href = "/discovery";
  };

  const deleteAccount = () => {
    if (!window.confirm("Delete account and all saved info? This is irreversible.")) return;
    localStorage.clear();
    sessionStorage.clear();
    alert("Account data removed.");
    window.location.reload();
  };

const filteredOrders = orders.filter((order) => {
  if (orderFilter === "cancelled") {
    return order.status === "cancelled";
  }

  if (orderFilter === "ongoing") {
    return order.status !== "cancelled" && order.status !== "delivered";
  }

  return true;
});


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
    if (!redeemCode.trim()) {
      alert("Enter a code");
      return;
    }
    alert(`Code "${redeemCode}" applied (demo).`);
  };


  const STATUS_FLOW = [
  "Order Placed",
  "Pending Confirmation",
  "Waiting to Ship",
  "Delivered",
];

const STATUS_ICONS = {
  "Order Placed": "🛒",
  "Pending Confirmation": "⏳",
  "Waiting to Ship": "📦",
  "Delivered": "✅",
};



useEffect(() => {
  if (!selectedOrder) return;

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const index = orders.findIndex(o => o.id === selectedOrder.id);
  if (index === -1) return;

  const order = orders[index];
  const currentIndex = STATUS_FLOW.indexOf(order.status);

  if (order.status === "Delivered") return;

  const timer = setTimeout(() => {
    const nextStatus = STATUS_FLOW[currentIndex + 1];

    order.status = nextStatus;
    order.statusHistory.push({
      stage: nextStatus,
      time: new Date().toISOString(),
    });

    orders[index] = order;
    localStorage.setItem("orders", JSON.stringify(orders));
    setSelectedOrder({ ...order });
  }, 12000); // ⏱️ 12 seconds per step

  return () => clearTimeout(timer);
}, [selectedOrder]);



  return (
    <div style={{ fontFamily: "Poppins, system-ui, sans-serif", background: "#faf9f8", color: "#222" }}>

         {/* STATUS PULSE ANIMATION */}
    <style>
      {`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(253,97,40,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(253,97,40,0); }
          100% { box-shadow: 0 0 0 0 rgba(253,97,40,0); }
        }
      `}
    </style>


      {/* HEADER */}
      <header style={{ background: "#fff", borderBottom: "1px solid #e9e9e9", padding: "18px 5%", position: "sticky", top: 0, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 40 }}>
        <h1 style={{ fontSize: "20px" }}>Profile</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => window.location.href = "mailto:support@hooksfood.example?subject=Support%20request"} style={{ padding: "10px 12px", borderRadius: "10px", background: "#f5f8ff", color: "#0f4bd6", border: "1px solid #e8f0ff", fontWeight: 600 }}>💬 Contact Support</button>
          <button onClick={logout} style={{ background: "transparent", border: "1px solid #e9e9e9", borderRadius: "10px" }}>Log out</button>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: "1100px", margin: "26px auto", padding: "0 5%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px" }}>
          {/* LEFT */}
          <aside style={{ background: "#fff", borderRadius: "12px", border: "1px solid #e9e9e9", padding: "22px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div onClick={() => setActiveTab("personal")} style={{ width: "88px", height: "88px", borderRadius: "50%", background: "#dff3eb", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "26px", fontWeight: 700, color: "#2f6b59", overflow: "hidden", boxShadow: "0 6px 18px rgba(32,32,32,0.05)", cursor: "pointer" }}>
                {avatar ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : getInitials(name)}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{name}</h2>
                <p style={{ margin: "6px 0 0", color: "#8a8a8a", fontSize: "14px" }}>{email}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <label style={{ cursor: "pointer" }}>
                    <input type="file" style={{ display: "none" }} accept="image/*" onChange={handleAvatarUpload} />
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

            <a
  href="/wallet"
  style={{
    marginTop: "14px",
    padding: "16px",
    borderRadius: "12px",
    background: "#ffffff",
    border: "1px solid #e9e9e9",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textDecoration: "none",
    color: "inherit",
  }}
>
  <div>
    <strong style={{ display: "block", marginBottom: "4px" }}>
      My Wallet
    </strong>
    <span style={{ fontSize: "13px", color: "#8a8a8a" }}>
      View balance & transactions
    </span>
  </div>

  <span style={{ fontSize: "18px", color: "#fd6128" }}>›</span>
</a>

          </aside>

          {/* RIGHT */}
          <section>
            {/* Tabs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "18px", alignItems: "center", borderBottom: "1px solid #e9e9e9", paddingBottom: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
                {["personal", "payment", "addresses", "orders", "redeem"].map(tab => (
                  <div key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 6px", cursor: "pointer", color: activeTab === tab ? "#222" : "#8a8a8a", fontWeight: 600, borderBottom: activeTab === tab ? "3px solid #fd6128" : "3px solid transparent" }}>
                    {tab === "personal" ? "Personal info" :
                      tab === "payment" ? "Payment methods" :
                        tab === "addresses" ? "Addresses" :
                          tab === "orders" ? "Orders" :
                            tab === "redeem" ? "Redeem code" : ""}
                  </div>
                ))}
              </div>
            </div>

            {/* PERSONAL INFO */}
            {activeTab === "personal" && (
              <div style={{ background: "#fff", borderRadius: "8px", padding: "18px", border: "1px solid #e9e9e9", boxShadow: "0 6px 18px rgba(0,0,0,0.03)" }}>
                <Field label="First Name"><input value={name} onChange={(e) => setName(e.target.value)} /></Field>
                <Field label="Other Name"><input value={otherName} onChange={(e) => setOtherName(e.target.value)} /></Field>
                <Field label="Email"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
                <Field label="Phone Number"><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></Field>
                <Field label="Country"><input value={country} onChange={(e) => setCountry(e.target.value)} /></Field>
                <Field label="State / City"><input value={stateLocation} onChange={(e) => setStateLocation(e.target.value)} /></Field>
                <Field label="Home Address"><input value={address} onChange={(e) => setAddress(e.target.value)} /></Field>

                <Field label="Password">
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", paddingRight: "44px", borderRadius: "8px", border: "1px solid #e6e6e6", fontSize: "14px" }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: "absolute", right: "18%", top: "91%", transform: "translateY(-50%)", cursor: "pointer", color: "#8a8a8a", fontSize: "14px", userSelect: "none" }}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                </Field>

                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                  <button onClick={saveProfile} style={{ padding: "10px 14px", borderRadius: "10px", border: 0, fontWeight: 700, background: "#fd6128", color: "#fff", cursor: "pointer" }}>Save</button>
                  <button onClick={cancelProfile} style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid #e9e9e9", background: "transparent", color: "#8a8a8a", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            )}

        
            {/* PAYMENT METHODS */}
{activeTab === "payment" && (
  <div style={{ background: "#fff", padding: "18px", borderRadius: "8px", border: "1px solid #e9e9e9" }}>
    <h3>Payment methods</h3>


   {paymentMethods.length === 0 ? (
  <div
    style={{
      padding: "16px",
      border: "1px dashed #e9e9e9",
      borderRadius: "10px",
      textAlign: "center",
      color: "#8a8a8a",
      background: "#fafafa",
      fontSize: "14px",
      marginTop: "12px",
    }}
  >
    Payment method empty, please place order.
  </div>
) : (
  paymentMethods.map((method, index) => {
    if (!method) return null;
    return (
      <div
        key={index}
        style={{
          padding: "14px",
          border: "1px solid #e9e9e9",
          borderRadius: "10px",
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
  {method.type === "bank" ? "Bank Transfer" :
   method.type === "door" ? "Cash on Delivery / Door Delivery" :
   method.type}
</span>

        <button
          onClick={() => {
            const updatedMethods = paymentMethods.filter((_, i) => i !== index);
            setPaymentMethods(updatedMethods);
            localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods));
          }}
        >
          Delete
        </button>
      </div>
    );
  })
)}




    
  </div>
)}


{/* ADDRESSES */}
{activeTab === "addresses" && (
  <div style={{ background: "#fff", padding: "18px", borderRadius: "8px", border: "1px solid #e9e9e9" }}>
    <h3>Saved Addresses</h3>

    {addresses.length === 0 ? (
  <div
    style={{
      padding: "16px",
      border: "1px dashed #e9e9e9",
      borderRadius: "10px",
      textAlign: "center",
      color: "#8a8a8a",
      background: "#fafafa",
      fontSize: "14px",
      marginTop: "12px",
    }}
  >
    No saved addresses, please add one.
  </div>
) : (
  addresses.map((addr, index) => (
    <div
      key={index}
      style={{
        padding: "14px",
        border: "1px solid #e9e9e9",
        borderRadius: "10px",
        marginTop: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "14px" }}>{addr}</div>

          {/* DELETE BUTTON */}
          <button
  onClick={() => {
    if (!window.confirm("Delete this address?")) return;
    const savedUser = JSON.parse(localStorage.getItem("userProfile")) || {};
    const updatedAddresses = savedUser.addresses.filter((_, i) => i !== index);
    savedUser.addresses = updatedAddresses;
    localStorage.setItem("userProfile", JSON.stringify(savedUser));
    setAddresses(updatedAddresses); // update state without reload
  }}
  style={{
    padding: "6px 10px",
    borderRadius: "8px",
    border: "none",
    background: "#e05454",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  }}
>
  Delete
</button>

        </div>
      ))
    )}
  </div>
)}


{/* ---------- ORDERS TAB ---------- */}
{activeTab === "orders" && !selectedOrder && (
  <>
    {/* FILTER BUTTONS */}
    <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
      {["ongoing", "cancelled"].map((type) => (
        <div
          key={type}
          onClick={() => setOrderFilter(type)}
          style={{
            cursor: "pointer",
            padding: "6px 14px",
            borderRadius: "8px",
            fontWeight: 600,
            background: orderFilter === type ? "#fd6128" : "#f5f5f5",
            color: orderFilter === type ? "#fff" : "#222",
          }}
        >
          {type === "ongoing" ? "Ongoing" : "Cancelled"}
        </div>
      ))}
    </div>

    {/* FILTERED ORDERS */}
    {filteredOrders.length === 0 ? (
      <div style={{ padding: "16px", textAlign: "center", color: "#8a8a8a" }}>
        No {orderFilter} orders.
      </div>
    ) : (
      filteredOrders.map((order) => {
        const items = order.items || [];
        const statusHistory = order.statusHistory || [];
        const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

        const cancelOrder = () => {
          if (!window.confirm(`Cancel Order #${order.id}?`)) return;
          const updatedOrders = orders.map((o) =>
            o.id === order.id ? { ...o, status: "cancelled" } : o
          );
          setOrders(updatedOrders);
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        };

        return (
          <div
            key={order.id}
            style={{
              padding: "14px",
              border: "1px solid #e9e9e9",
              borderRadius: "12px",
              background: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            {/* LEFT SIDE: Order info */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* ITEM IMAGE */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "#f3f3f3",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  color: "#999",
                }}
              >
                {items[0]?.image ? (
                  <img
                    src={items[0].image}
                    alt={items[0].name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : "No image"}
              </div>

              <div>
                <strong>Order #{order.id}</strong>
                <div style={{ fontSize: "14px", color: "#8a8a8a" }}>
                  Total: €{total.toFixed(2)}
                </div>

               
                {/* VIEW DETAILS BUTTON */}
{order.status !== "cancelled" ? (
  <button
    onClick={() => setSelectedOrder(order)}
    style={{
      marginTop: "6px",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #fd6128",
      background: "transparent",
      color: "#fd6128",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    View Details
  </button>
) : (
  <button
    onClick={() => {
      if (!window.confirm(`Delete Order #${order.id}?`)) return;
      const updatedOrders = orders.filter(o => o.id !== order.id);
      setOrders(updatedOrders);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    }}
    style={{
      marginTop: "6px",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #e05454",
      background: "transparent",
      color: "#e05454",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Delete Order
  </button>
)}



              </div>
            </div>

            {/* RIGHT SIDE: Cancel button */}
            {order.status !== "cancelled" && (
  <button
    onClick={cancelOrder}
    style={{
      marginTop: "6px",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #fd6128",
      background: "transparent",
      color: "#fd6128",
      cursor: "pointer",
      fontWeight: 600,
    }}
  >
    Cancel Order
  </button>
)}

          </div>
        );
      })
    )}
  </>
)}



{/* ---------- SELECTED ORDER DETAILS ---------- */}
{selectedOrder && (
  <div style={{ padding: "16px", background: "#fff", borderRadius: "12px" }}>
    {/* Back Button */}
    <button
      onClick={() => setSelectedOrder(null)}
      style={{
        marginBottom: "12px",
        cursor: "pointer",
        color: "#fd6128",
        border: "none",
        background: "transparent",
        fontWeight: 600,
      }}
    >
      ← Back
    </button>

    <h3>Order #{selectedOrder.id}</h3>

    {/* ITEMS */}
    <div style={{ marginTop: "12px" }}>
      {(selectedOrder.items || []).length === 0 ? (
        <div style={{ color: "#999" }}>No items in this order.</div>
      ) : (
        (selectedOrder.items || []).map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "8px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "#f3f3f3",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                "No image"
              )}
            </div>
            <div>
              <strong>{item.name}</strong>
              <div style={{ fontSize: "14px", color: "#555" }}>
                {item.quantity || 1} × €{item.price?.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* TRACK ORDER BUTTON */}
    <button
      onClick={() =>
        window.location.href = `/tracking?id=${selectedOrder.id}`
      }
      style={{
        marginTop: "12px",
        padding: "8px 14px",
        borderRadius: "8px",
        border: "1px solid #fd6128",
        background: "transparent",
        color: "#fd6128",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      Track Order
    </button>

   



    {/* SEE STATUS HISTORY TOGGLE */}
    <button
      onClick={() =>
        setSelectedOrder({
          ...selectedOrder,
          showStatusHistory: !selectedOrder.showStatusHistory,
        })
      }
      style={{
        marginTop: "12px",
        padding: "8px 14px",
        background: "#fd6128",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {selectedOrder.showStatusHistory ? "Hide Status History" : "See Status History"}
    </button>

    {/* VERTICAL STATUS HISTORY */}
    {selectedOrder.showStatusHistory && (
      <div style={{ marginTop: "20px", position: "relative", paddingLeft: "18px" }}>
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: 0,
            height: `${((selectedOrder.statusHistory || []).length / STATUS_FLOW.length) * 100}%`,
            width: "3px",
            background: "#fd6128",
            transition: "height 0.6s ease",
          }}
        />

        {(selectedOrder.statusHistory || []).map((s, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              marginBottom: "18px",
              position: "relative",
            }}
          >
            {/* Dot */}
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#fd6128",
                marginTop: "4px",
              }}
            />

            {/* Text */}
            <div>
              <strong>
                {STATUS_ICONS[s.stage]} {s.stage}
              </strong>
              <div style={{ fontSize: "12px", color: "#777" }}>
                {new Date(s.time).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}







          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
