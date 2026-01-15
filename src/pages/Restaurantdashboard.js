import React, { useState, useEffect } from "react";
import burgerImg from "../assets/burger.jpg";


export default function RestaurantDashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Menu":
        return <MenuManagement />;
      case "History":
        return <OrderHistory />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* DESKTOP SIDEBAR */}
      {/* DESKTOP SIDEBAR */}
{!isMobile && (
  <aside style={styles.sidebar}>
    {/* TOP SECTION */}
    <div>
      <div style={styles.brand}>
        <div style={styles.brandIcon}>H</div>
        <span>Hooks Partner</span>
      </div>

      <nav style={styles.navContainer}>
        {["Dashboard", "Menu", "History"].map((tab) => (
          <div
            key={tab}
            style={{
              ...styles.navItem,
              ...(activeTab === tab ? styles.active : {}),
            }}
            onClick={() => setActiveTab(tab)}
          >
            <span style={styles.navIcon}>
              {tab === "Dashboard" ? "🏠" : tab === "Menu" ? "📋" : "🕒"}
            </span>
            {tab}
          </div>
        ))}
      </nav>
    </div>

    {/* BOTTOM SECTION */}
    <div style={styles.onlineBox}>
      <div style={styles.onlineDot} />
      Restaurant Online
    </div>
  </aside>
)}


      {/* MAIN */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={{ margin: 0 }}>Restaurant Dashboard</h2>
          {!isMobile && (
            <button
              style={styles.refreshBtn}
              onClick={() => alert("Dashboard refreshed")}
            >
              ⟳ Refresh
            </button>
          )}
        </header>

        {renderTabContent()}
      </main>

      {/* MOBILE NAV */}
      {isMobile && (
        <nav style={styles.mobileNav}>
          {["Dashboard", "Menu", "History"].map((tab) => (
            <div
              key={tab}
              style={{
                ...styles.mobileItem,
                flexDirection: "column",
                ...(activeTab === tab ? styles.activeMobile : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              <span style={styles.navIcon}>
                {tab === "Dashboard" ? "🏠" : tab === "Menu" ? "📋" : "🕒"}
              </span>
              <small style={{ fontSize: 10 }}>{tab}</small>
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}

/* ================= DASHBOARD (UNCHANGED) ================= */
function DashboardContent() {
  return (
    <>
      <section style={styles.stats}>
        <StatCard title="New Orders" value="0" icon="🛒" />
        <StatCard title="In Progress" value="1" icon="⏱" />
        <StatCard
          title="Today's Revenue"
          value="€0"
          sub="0 orders completed"
          icon="💶"
        />
        <StatCard title="Avg. Prep Time" value="0 min" icon="⏰" />
      </section>

      <div style={styles.filterRow}>
        <span style={styles.filterActive}>All</span>
        <span>New</span>
        <span>Active</span>
        <span>Ready</span>
        <span>Completed</span>
      </div>

      <section style={styles.orders}>
        <OrderColumn title="New Orders" count={0}>
          <p style={styles.empty}>No new orders</p>
        </OrderColumn>

        <OrderColumn title="In Progress" count={1}>
          <OrderCard
            id="#W1003"
            badge="Accepted"
            badgeColor="#3b82f6"
            customer="Sofia Martinez"
            type="Pickup"
            items="2 items"
            details="1x Quattro Formaggi, 1x Tiramisu"
            price="€25.40"
            button="Start Preparing"
            buttonColor="#facc15"
            onAction={() => alert("Preparing order")}
          />
        </OrderColumn>

        <OrderColumn title="Ready for Pickup" count={1}>
          <OrderCard
            id="#W1002"
            badge="Ready"
            badgeColor="#16a34a"
            customer="Marcus Lee"
            type="Delivery"
            items="3 items"
            details="2x Pepperoni Pizza, 1x Garlic Bread"
            price="€34.30"
            button="Picked Up"
            buttonColor="#9ca3af"
            onAction={() => alert("Order picked up")}
          />
        </OrderColumn>
      </section>
    </>
  );
}

/* ================= MENU (PHOTO UI) ================= */
function MenuManagement() {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);


  const [menuItems, setMenuItems] = useState([
  {
    name: "Tiramisu",
    price: "€7.90",
    category: "Desserts",
    time: "2 min",
    available: true,
  },
  {
    name: "Coca-Cola",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: false, // 👈 this one will look blurred
  },
  {
    name: "Sprite",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: true,
  },
  {
    name: "BBQ Chicken Pizza",
    price: "€18.90",
    category: "Mains",
    time: "18 min",
    available: true,
  },
  {
    name: "Coca-Cola",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: false, // 👈 this one will look blurred
  },
  {
    name: "Sprite",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: true,
  },{
    name: "Coca-Cola",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: false, // 👈 this one will look blurred
  },
  {
    name: "Sprite",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: true,
  },{
    name: "Coca-Cola",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: false, // 👈 this one will look blurred
  },
  {
    name: "Sprite",
    price: "€3.50",
    category: "Drinks",
    time: "1 min",
    available: true,
  },
]);


  return (
    <>
      <div style={styles.menuHeader}>
        <input
          placeholder="Search menu items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.menuSearch}
        />
        <button
  style={styles.addBtn}
  onClick={() => setShowAddModal(true)}
>
  + Add Item
</button>

      </div>

      <div style={styles.menuGrid}>
       {menuItems
  .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
  .map((item, index) => (
    <div
      key={index}
      style={{
        ...styles.menuCard,
        ...(item.available ? {} : styles.menuCardDisabled),
      }}
    >
      {/* IMAGE */}
      <img src={burgerImg} alt={item.name} style={styles.menuImg} />

      {/* TITLE + PRICE */}
      <div style={styles.menuTitleRow}>
        <strong>{item.name}</strong>
        <strong style={{ color: "#2563eb" }}>{item.price}</strong>
      </div>

      {/* CATEGORY */}
      <span style={styles.menuTag}>{item.category}</span>

      {/* DESCRIPTION */}
      <small style={{ color: "#6b7280" }}>
        {item.category === "Desserts"
          ? "Classic Italian dessert with espresso and mascarpone"
          : "330ml / can"}
      </small>

      {/* TIME + TOGGLE */}
      <div style={styles.menuBottom}>
        <span style={styles.menuTime}>⏱ {item.time}</span>

        <label style={styles.toggleRow}>
          <span>Available</span>
          <input
            type="checkbox"
            checked={item.available}
            onChange={() => {
              const updated = [...menuItems];
              updated[index].available = !updated[index].available;
              setMenuItems(updated);
            }}
          />
        </label>
      </div>
    </div>
  ))}

      </div>

            {showAddModal && (
        <AddMenuModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newItem) => {
            setMenuItems([newItem, ...menuItems]);
            setShowAddModal(false);
          }}
        />
      )}

    </>
  );
}



function AddMenuModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [time, setTime] = useState(15);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Item name is required");
      return;
    }

    onAdd({
      name,
      price: `€${Number(price).toFixed(2)}`,
      category: "Mains", // internal only, NOT shown in UI
      time: `${time} min`,
      available: true,
      description,
    });
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3>Add Menu Item</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        <label style={styles.modalLabel}>Name</label>
        <input
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.modalInput}
        />

        <label style={styles.modalLabel}>Description</label>
        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.modalTextarea}
        />

        <div style={styles.modalRow}>
          <div>
            <label style={styles.modalLabel}>Price (€)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.modalInput}
            />
          </div>

          <div>
            <label style={styles.modalLabel}>Prep Time (minutes)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={styles.modalInput}
            />
          </div>
        </div>

        <button style={styles.modalAddBtn} onClick={handleSubmit}>
          Add Item
        </button>
      </div>
    </div>
  );
}




/* ================= HISTORY (PHOTO UI) ================= */
function OrderHistory() {
  return (
    <div style={styles.historyWrapper}>
      <div style={styles.historyHeader}>
        <div>
          <h3 style={{ margin: 0 }}>Order History</h3>
          <p style={styles.historySub}>View and manage past orders</p>
        </div>
        <button
          style={styles.exportBtn}
          onClick={() => alert("Export orders")}
        >
          ⬇ Export
        </button>
      </div>

      <div style={styles.historyFilters}>
        <input
          placeholder="Search by order # or customer..."
          style={styles.historySearch}
        />
        <select style={styles.historySelect}>
          <option>All Status</option>
        </select>
        <select style={styles.historySelect}>
          <option>Last 7 days</option>
        </select>
      </div>

      <div style={styles.historyStats}>
        <HistoryStat title="Total Orders" value="0" />
        <HistoryStat title="Completed" value="0" />
        <HistoryStat title="Cancelled" value="0" />
        <HistoryStat title="Revenue" value="€0.00" highlight />
      </div>

      <div style={styles.historyTable}>
        <div style={styles.historyTableHead}>
          <span>Order #</span>
          <span>Customer</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        <div style={styles.historyEmpty}>No orders found</div>
      </div>
    </div>
  );
}

/* ================= SHARED COMPONENTS ================= */
function StatCard({ title, value, sub, icon }) {
  return (
    <div style={styles.statCard}>
      <div>
        <small style={{ color: "#6b7280" }}>{title}</small>
        <h3 style={{ margin: "6px 0" }}>{value}</h3>
        {sub && <small style={{ color: "#6b7280" }}>{sub}</small>}
      </div>
      <div style={styles.statIcon}>{icon}</div>
    </div>
  );
}

function OrderColumn({ title, count, children }) {
  return (
    <div style={styles.column}>
      <div style={styles.columnHeader}>
        <span>{title}</span>
        <span style={styles.count}>{count}</span>
      </div>
      {children}
    </div>
  );
}

function OrderCard(props) {
  return (
    <div style={styles.orderCard}>
      <div style={styles.orderTop}>
        <strong>{props.id}</strong>
        <span style={{ ...styles.badge, background: props.badgeColor }}>
          {props.badge}
        </span>
      </div>
      <small>{props.customer}</small>
      <small>{props.type}</small>
      <small>{props.items}</small>
      <small>{props.details}</small>
      <div style={styles.orderBottom}>
        <strong>{props.price}</strong>
        <button
          style={{ ...styles.actionBtn, background: props.buttonColor }}
          onClick={props.onAction}
        >
          {props.button}
        </button>
      </div>
    </div>
  );
}

function HistoryStat({ title, value, highlight }) {
  return (
    <div style={styles.historyStat}>
      <small>{title}</small>
      <h3 style={{ color: highlight ? "#2563eb" : "#111827" }}>{value}</h3>
    </div>
  );
}

/* ================= STYLES ================= */
/* (UNCHANGED from your original, kept fully intact) */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Inter, sans-serif",
  },

  /* ===== SIDEBAR ===== */
  sidebar: {
  width: 240,
  background: "#ffffff",
  padding: 20,
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between", // ✅ keeps top at top and bottom at bottom
  height: "100vh", // make it full viewport height
},



  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    fontSize: 18,
  },

  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  navContainer: {
    marginTop: 30,
  },

  navItem: {
    padding: "12px 14px",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#374151",
    marginBottom: 6,
  },

  navIcon: {
    fontSize: 18,
  },

  active: {
    background: "#eff6ff",
    color: "#2563eb",
    fontWeight: 600,
  },

  activeMobile: {
    color: "#2563eb",
  },

  onlineBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    color: "#16a34a",
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#16a34a",
  },

  /* ===== MAIN ===== */
  main: {
  flex: 1,
  padding: 20,
  paddingBottom: 90, // ✅ ADD THIS LINE
},


  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  refreshBtn: {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
  },

  /* ===== DASHBOARD ===== */
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginBottom: 20,
  },

  statCard: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },

  statIcon: {
    fontSize: 28,
  },

  filterRow: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
    fontSize: 14,
    color: "#6b7280",
  },

  filterActive: {
    color: "#2563eb",
    fontWeight: 600,
  },

  orders: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
  },

  column: {
    background: "#fff",
    borderRadius: 12,
    padding: 14,
  },

  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    fontWeight: 600,
  },

  count: {
    background: "#e5e7eb",
    borderRadius: 12,
    padding: "2px 8px",
    fontSize: 12,
  },

  empty: {
    color: "#9ca3af",
    fontSize: 14,
  },

  orderCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
  },

  badge: {
    padding: "2px 8px",
    borderRadius: 12,
    color: "#fff",
    fontSize: 12,
  },

  orderBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  actionBtn: {
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },

  /* ===== MENU ===== */
  menuHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  menuSearch: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
  },

  addBtn: {
    padding: "10px 14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  menuGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },

  menuCard: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  menuImg: {
  height: 90,
  borderRadius: 8,
  marginBottom: 6,
  objectFit: "cover",
  width: "100%",
},


  /* ===== HISTORY ===== */
  historyWrapper: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
  },

  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  historySub: {
    color: "#6b7280",
    fontSize: 14,
  },

  exportBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 12px",
    cursor: "pointer",
  },

  historyFilters: {
    display: "flex",
    gap: 10,
    marginBottom: 14,
  },

  historySearch: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
  },

  historySelect: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
  },

  historyStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 12,
    marginBottom: 14,
  },

  historyStat: {
    background: "#f9fafb",
    padding: 12,
    borderRadius: 8,
  },

  historyTable: {
    borderTop: "1px solid #e5e7eb",
  },

  historyTableHead: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    padding: 10,
    fontWeight: 600,
    fontSize: 14,
  },

  historyEmpty: {
    padding: 20,
    textAlign: "center",
    color: "#9ca3af",
  },

  /* ===== MOBILE ===== */
  mobileNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
  },


  mobileItem: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
  fontSize: 12,
  cursor: "pointer",
  color: "#6b7280",
  flex: 1,
},

menuCardDisabled: {
  opacity: 0.4,
  filter: "grayscale(100%)",
},

menuTitleRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
},

menuTag: {
  background: "#f3f4f6",
  color: "#374151",
  fontSize: 12,
  padding: "2px 8px",
  borderRadius: 12,
  width: "fit-content",
},

menuBottom: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 6,
},

menuTime: {
  fontSize: 12,
  color: "#6b7280",
},

toggleRow: {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
},

modalOverlay: {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
},

modal: {
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  width: "100%",
  maxWidth: 420,
},

modalHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
},

closeBtn: {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
},

modalLabel: {
  fontSize: 14,
  fontWeight: 500,
  marginTop: 10,
  display: "block",
},

modalInput: {
  width: "100%",
  padding: 10,
  marginTop: 4,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
},

modalTextarea: {
  width: "100%",
  padding: 10,
  height: 80,
  marginTop: 4,
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  resize: "vertical",
},

modalRow: {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 10,
  marginTop: 10,
},

modalAddBtn: {
  marginTop: 16,
  width: "100%",
  padding: 12,
  background: "#7dd3fc",
  border: "none",
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
},


};


