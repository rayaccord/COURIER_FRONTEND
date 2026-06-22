import React, { useState, useEffect } from "react";import { useNavigate } from "react-router-dom";
import CourierMap from "./CourierMap";

import API from "../api";
import socket from "../socket";


/* ================= MAIN DASHBOARD ================= */
export default function CourierDashboard() {
  const navigate = useNavigate();

  const [online, setOnline] = useState(
  localStorage.getItem("courierOnline") === "true"
);
  const [profileData, setProfileData] =
  useState({});
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useState({ lat: 6.5244, lng: 3.3792 });
  const [wallet, setWallet] = useState({
  available: 0,
  pending: 0,
  today: 0,
  weekly: 0,
  monthly: 0,
  totalEarned: 0,
});

const [bankAccount, setBankAccount] = useState({
  bankName: "",
  accountName: "",
  accountNumber: "",
});


  const [rating, setRating] = useState(0);
const [completedOrders, setCompletedOrders] =
  useState(0);
  const [orderStage, setOrderStage] = useState("Assigned");
  const [incomingOrders, setIncomingOrders] =
  useState([]);
  const incomingOrder = incomingOrders[0] || null;

  const [activeOrder, setActiveOrder] =useState(null);
  const [orderTimer, setOrderTimer] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);

  
const [showWithdrawModal, setShowWithdrawModal] =
  useState(false);

const [withdrawAmount, setWithdrawAmount] =
  useState("");

  const [showMoreMenu, setShowMoreMenu] =
  useState(false);

  const [surge, setSurge] = useState("1x");
  const multipliers = ["1x", "2.4x", "2.3x", "3x"];

  const [transactions, setTransactions] =
useState([]);

const [deliveryHistory, setDeliveryHistory] =
  useState([]);

  const [stats, setStats] =
  useState({
    totalDeliveries: 0,
    totalEarnings: 0,
    averageFee: 0,
  });
  

  useEffect(() => {
  if (
    Notification.permission !==
    "granted"
  ) {
    Notification.requestPermission();
  }
}, []);


useEffect(() => {
  localStorage.setItem(
    "courierOnline",
    online
  );
}, [online]);

  /* ================= DELIVERY HISTORY ================= */
useEffect(() => {

  const fetchHistory =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "courierToken"
          );

        const response =
          await API.get(
            "/orders/history",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setDeliveryHistory(
          response.data
        );

      } catch (error) {

        console.log(
          "History fetch failed",
          error
        );

      }
    };

  fetchHistory();

}, []);


useEffect(() => {

  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "courierToken"
          );

        const response =
          await API.get(
            "/orders/stats",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(
          response.data
        );

      } catch (error) {

        console.log(
          "Stats fetch failed",
          error
        );

      }
    };

  fetchStats();

}, []);


/* ================= LIVE GPS TRACKING ================= */
useEffect(() => {
  if (!online) return;

  const watchId =
    navigator.geolocation.watchPosition(

      async (pos) => {

        const lat =
          pos.coords.latitude;

        const lng =
          pos.coords.longitude;

        setLocation({
          lat,
          lng,
        });

        try {

          const token =
            localStorage.getItem(
              "courierToken"
            );

          await API.put(
            "/profile/location",
            {
              lat,
              lng,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        } catch (error) {

          console.log(
            "Location update failed",
            error
          );

        }

      },

      (err) =>
        console.log(
          "GPS error",
          err
        ),

      {
        enableHighAccuracy: true,
      }
    );

  return () =>
    navigator.geolocation.clearWatch(
      watchId
    );

}, [online]);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth <= 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  

  
/* ================= FETCH SOCKET ORDERS ================= */

useEffect(() => {

  const handleNewOrder = (order) => {

    // Don't receive orders when offline
    if (!online) return;

    console.log("📦 NEW ORDER RECEIVED:", order);

    // Add new order to the list
    setIncomingOrders(prev => [
      order,
      ...prev
    ]);

    // Show notification
    if (
      Notification.permission === "granted"
    ) {

      const notification =
        new Notification(
          "📦 New Delivery Request",
          {
            body: `
Restaurant: ${order.restaurantName}
Customer: ${order.customerName}
Fee: €${order.fee}
Pickup: ${order.pickupAddress}
            `,
          }
        );

      notification.onclick = () => {
        window.focus();
        setActiveTab("Requests");
      };
    }
  };

  socket.on("new-order", (order) => {
  console.log(
    "🔥 SOCKET ORDER RECEIVED",
    order
  );

  handleNewOrder(order);
});

  return () => {
    socket.off(
      "new-order",
      handleNewOrder
    );
  };

}, [online]);

  /* ================= ORDER TIMER ================= */
  useEffect(() => {
    if (!incomingOrder) {
      setOrderTimer(0);
      return;
    }

    setOrderTimer(20);
    const interval = setInterval(() => {
      setOrderTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setIncomingOrders(prev => prev.slice(1));
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [incomingOrder]);


/* ================= courier id ================= */

useEffect(() => {

  const registerCourier = () => {

    const courierId =
      localStorage.getItem(
        "courierId"
      );

    console.log(
      "REGISTERING:",
      courierId
    );

    if (courierId) {

      socket.emit(
        "register-courier",
        courierId
      );

    }
  };

  if (socket.connected) {
    registerCourier();
  }

  socket.on(
    "connect",
    registerCourier
  );

  return () => {
    socket.off(
      "connect",
      registerCourier
    );
  };

}, []);


useEffect(() => {

  const handleCancelled =
    () => {

      alert(
        "This order has been cancelled by the customer."
      );

      setActiveOrder(null);

      setIncomingOrders([]);

      setOrderStage(
        "Assigned"
      );

      setActiveTab(
        "Home"
      );
    };

  socket.on(
    "order-cancelled",
    handleCancelled
  );

  return () => {

    socket.off(
      "order-cancelled",
      handleCancelled
    );

  };

}, []);


  /* ================= PROFILE TOKEN ================= */

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("courierToken");

      const response = await API.get(
        "/profile",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setProfileData(response.data);

      setRating(
        response.data.rating || 0
      );

      setCompletedOrders(
        response.data.completedOrders || 0
      );

    } catch (error) {
      console.log(
        "Profile fetch failed",
        error
      );
    }
  };

  fetchProfile();
}, []);

  /* ================= WALLET SYSTEM ================= */
useEffect(() => {
  const fetchWallet = async () => {
    try {
      const token =
        localStorage.getItem("courierToken");

      const response = await API.get(
        "/wallet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWallet(response.data.wallet);

      setBankAccount(
        response.data.bankAccount || {
          bankName: "",
          accountName: "",
          accountNumber: "",
        }
      );

      setTransactions(
        response.data.transactions || []
      );

    } catch (error) {
      console.log(
        "Wallet fetch failed",
        error
      );
    }
  };

  fetchWallet();
}, []);


/* ================= activeorder SYSTEM ================= */

useEffect(() => {

  const loadActiveOrder =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "courierToken"
          );

        const response =
          await API.get(
            "/orders/active",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (response.data) {

  const stageMap = {
    accepted: "Assigned",
    heading_to_restaurant:
      "Heading to Restaurant",
    arrived_restaurant:
      "Arrived at Restaurant",
    picked_up: "Picked Up",
    on_the_way: "On the Way",
    delivered: "Delivered",
  };

  setActiveOrder(
    response.data
  );

  setOrderStage(
    stageMap[
      response.data.status
    ] || "Assigned"
  );

  setActiveTab(
    "Orders"
  );

}

      } catch (error) {
        console.log(
          "Failed to load active order",
          error
        );
      }
    };

  loadActiveOrder();

}, []);


  /* ================= SURGE SYSTEM ================= */
  useEffect(() => {
    if (!online) {
      setSurge("1x");
      return;
    }

    const interval = setInterval(() => {
      const random =
        multipliers[Math.floor(Math.random() * multipliers.length)];

      setSurge(random);
    }, 5000);

    return () => clearInterval(interval);
  }, [online]);

  const isWithinRadius = (target, radius = 100) => {
    if (!target) return false;

    const R = 6371e3;
    const φ1 = (location.lat * Math.PI) / 180;
    const φ2 = (target.lat * Math.PI) / 180;
    const Δφ = ((target.lat - location.lat) * Math.PI) / 180;
    const Δλ = ((target.lng - location.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) <= radius;
  };

  const nextStage = async () => {
    const flow = [
      "Assigned",
      "Heading to Restaurant",
      "Arrived at Restaurant",
      "Picked Up",
      "On the Way",
      "Delivered",
    ];

    
    /*if (
      orderStage === "Heading to Restaurant" &&
      !isWithinRadius(incomingOrder?.restaurant)
    ) {
      alert("You must be at the restaurant to proceed");
      return;
    }

    if (
      orderStage === "On the Way" &&
      !isWithinRadius(incomingOrder?.customer)
    ) {
      alert("You must be at the customer location to proceed");
      return;
    }*/
    

    const index = flow.indexOf(orderStage);
    if (index < flow.length - 1) {
  const next = flow[index + 1];

  const statusMap = {
  Assigned:
    "accepted",

  "Heading to Restaurant":
    "heading_to_restaurant",

  "Arrived at Restaurant":
    "arrived_restaurant",

  "Picked Up":
    "picked_up",

  "On the Way":
    "on_the_way",

  Delivered:
    "delivered",
};
  setOrderStage(next);

  try {
  const token =
    localStorage.getItem(
      "courierToken"
    );

  await API.put(
    `/orders/${activeOrder._id}/status`,
    {
      status:
        statusMap[next],
    },
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

} catch (error) {
  console.log(
    "Status update failed",
    error
  );
}

  }
};

  

  

const acceptOrder = async (order) => {
  try {
    const token =
      localStorage.getItem(
        "courierToken"
      );

    const response = await API.put(
      `/orders/${order._id}/accept`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setOrderStage(
      "Assigned"
    );

    setActiveOrder(
  response.data.order
);

setOrderStage(
  "Assigned"
);

    setActiveTab(
      "Orders"
    );

    setIncomingOrders(prev =>
  prev.filter(
    o => o._id !== order._id
  )
);

} catch (error) {

  console.log(
    "Accept Order Error:",
    error.response?.data
  );

  alert(
    error.response?.data?.message ||
    "Failed to accept order"
  );
}
};

  const rejectOrder = async (order) => {

  if (!incomingOrder) return;

  try {

    const token =
      localStorage.getItem(
        "courierToken"
      );

    await API.put(
      `/orders/${order._id}/reject`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setIncomingOrders(prev =>
  prev.filter(
    o => o._id !== order._id
  )
);

    if (activeTab === "Requests") {
      setActiveTab("Home");
    }

  } catch (error) {

    console.log(
      "Reject order failed",
      error
    );

  }
};

  const handleLogout = () => {
  localStorage.removeItem(
    "courierToken"
  );

  navigate("/courierlogin");
};


  const renderContent = () => {
    switch (activeTab) {

      case "Requests":
  return (
    <RequestOrder
  orders={incomingOrders}
  acceptOrder={acceptOrder}
  rejectOrder={rejectOrder}
/>
  );

      case "Orders":
  return (
    <ActiveOrder
      stage={orderStage}
      onNext={nextStage}
      order={activeOrder}
    />
  );
      case "Wallet":
  return (
    <Wallet
      wallet={wallet}
      bankAccount={bankAccount}
      setBankAccount={setBankAccount}
      setShowWithdrawModal={
        setShowWithdrawModal
      }
    />
  );
        case "History":
  return (
    <DeliveryHistory
      orders={deliveryHistory}
    />
  );
      case "Profile":
  return (
    <>
      <Profile
        rating={rating}
        completed={completedOrders}
        online={online}
        profileData={profileData}
        setProfileData={setProfileData}
        setShowEditModal={setShowEditModal}
        handleLogout={handleLogout}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-gray-500 text-sm">
            Total Deliveries
          </div>

          <div className="text-2xl font-bold">
            {stats.totalDeliveries}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-gray-500 text-sm">
            Total Earnings
          </div>

          <div className="text-2xl font-bold">
            €{stats.totalEarnings}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-gray-500 text-sm">
            Average Fee
          </div>

          <div className="text-2xl font-bold">
            €{stats.averageFee}
          </div>
        </div>

      </div>
    </>
  );
      default:
        return (
          <Home
            online={online}
            setOnline={setOnline}
            wallet={wallet}
            rating={rating}
            location={location}
            incomingOrder={incomingOrder}
            surge={surge}
            navigate={navigate}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isMobile && (
<aside className="w-56 bg-orange-500 text-white p-5 flex flex-col justify-between">
            <div>
            <h3 className="text-lg mb-4">🛵 Courier</h3>

            {[
  "Home",
  "Requests",
  "Orders",
  "Wallet",
  "History",
  "Profile",
].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                  activeTab === tab
  ? "bg-orange-700 font-semibold text-white"
  : "text-white hover:bg-orange-600"
                }`}
              >
                {tab === "Home" && "🏠"}
                {tab === "Requests" && "🔔"}
                {tab === "Orders" && "📦"}
                {tab === "Wallet" && "💰"}
                {tab === "History" && "📜"}
                {tab === "Profile" && "👤"}
                <span>{tab}</span>
              </div>
            ))}

            <div
              onClick={handleLogout}
              className="mt-5 p-2 text-center bg-red-600 text-white rounded-md cursor-pointer"
            >
              🔒 Logout
            </div>
          </div>

          <div
            className={`text-sm ${
              online ? "text-green-600" : "text-gray-400"
            }`}
          >
            ● {online ? "ONLINE" : "OFFLINE"}
          </div>
        </aside>
      )}

      <main className="flex-1 p-5 pb-28 relative">
        {renderContent()}
      </main>

      



      {/* EDIT PROFILE MODAL */}
{showEditModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">
    <div className="bg-white rounded-3xl p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-5">
        Edit Profile
      </h2>

      <div className="space-y-4">
        <input
  type="text"
  placeholder="Name"
  value={profileData?.fullName || ""}
          onChange={(e) =>
            setProfileData({
  ...profileData,
  fullName: e.target.value,
})
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Phone"
          value={profileData?.phone}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              phone: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="email"
          placeholder="Email"
          value={profileData?.email}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              email: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Vehicle"
          value={profileData?.vehicle}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              vehicle: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
  type="text"
  placeholder="City"
  value={profileData?.city || ""}
  onChange={(e) =>
    setProfileData({
      ...profileData,
      city: e.target.value,
    })
  }
  className="w-full border p-3 rounded-xl"
/>

      </div>

      <div className="flex gap-3 mt-6">
       <button
  onClick={() => setShowEditModal(false)}
  className="flex-1 bg-gray-200 py-3 rounded-xl"
>
  Cancel
</button>

       <button
  onClick={async () => {
    try {
      const token =
        localStorage.getItem(
          "courierToken"
        );

      await API.put(
        "/profile",
        {
          fullName:
            profileData.fullName,
          phone:
            profileData.phone,
          vehicle:
            profileData.vehicle,
          city:
            profileData.city,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Profile updated successfully"
      );

      setShowEditModal(false);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    }
  }}
  className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
>
  Save Changes
</button>
      </div>
    </div>
  </div>
)}


{/* WITHDRAW MODAL */}
{showWithdrawModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99999] p-4">
    <div className="bg-white rounded-3xl p-6 w-full max-w-md">

      <h2 className="text-2xl font-bold mb-4">
        Withdraw Earnings
      </h2>

      <div className="space-y-3 mb-4">

        <p>
          <strong>Available:</strong>
          {" "}€{wallet.available}
        </p>

        <p>
          <strong>Bank:</strong>
          {" "}{bankAccount.bankName}
        </p>

        <p>
          <strong>Account Name:</strong>
          {" "}{bankAccount.accountName}
        </p>

        <p>
          <strong>Account Number:</strong>
          {" "}{bankAccount.accountNumber}
        </p>

      </div>

      <input
        type="number"
        placeholder="Enter amount"
        value={withdrawAmount}
        onChange={(e) =>
          setWithdrawAmount(e.target.value)
        }
        className="w-full border p-3 rounded-xl"
      />

      <div className="flex gap-3 mt-5">

        <button
          onClick={() =>
            setShowWithdrawModal(false)
          }
          className="flex-1 bg-gray-200 py-3 rounded-xl"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            try {
              const token =
                localStorage.getItem(
                  "courierToken"
                );

              const response =
                await API.post(
                  "/wallet/withdraw",
                  {
                    amount:
                      Number(withdrawAmount),
                  },
                  {
                    headers: {
                      Authorization:
                        `Bearer ${token}`,
                    },
                  }
                );

              alert(
                response.data.message
              );

              setWallet(
                response.data.wallet
              );

              setWithdrawAmount("");

              setShowWithdrawModal(
                false
              );

            } catch (error) {
              alert(
                error.response?.data
                  ?.message ||
                "Withdrawal failed"
              );
            }
          }}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl"
        >
          Withdraw
        </button>

      </div>

    </div>
  </div>
)}

      {showMoreMenu && (
  <div className="fixed inset-0 bg-black/40 z-[99998]">

    <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl p-6 mx-3 shadow-2xl">

  <div className="flex justify-between items-center mb-4">

    <h3 className="text-lg font-bold">
      More
    </h3>

    <button
      onClick={() =>
        setShowMoreMenu(false)
      }
      className="text-2xl font-bold text-gray-500 hover:text-black"
    >
      ✕
    </button>

  </div>

  <div className="space-y-3">

        <button
          onClick={() => {
            setActiveTab("History");
            setShowMoreMenu(false);
          }}
          className="w-full text-left p-3 rounded-xl bg-gray-100"
        >
          📜 History
        </button>

        <button
          onClick={() => {
            setActiveTab("Profile");
            setShowMoreMenu(false);
          }}
          className="w-full text-left p-3 rounded-xl bg-gray-100"
        >
          👤 Profile
        </button>

        <button
          onClick={() => {
            setShowMoreMenu(false);
            handleLogout();
          }}
          className="w-full text-left p-3 rounded-xl bg-red-600 text-white"
        >
          🚪 Logout
        </button>


      </div>

    </div>

  </div>
)}

{isMobile && (
  <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white flex justify-around items-center py-4 shadow-2xl z-[99999]">

    <button
      onClick={() => setActiveTab("Home")}
      className={`text-2xl ${
        activeTab === "Home"
          ? "scale-125"
          : "opacity-80"
      }`}
    >
      🏠
    </button>

    <button
      onClick={() => setActiveTab("Requests")}
      className="relative text-2xl"
    >
      🔔

      {incomingOrder && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
          1
        </span>
      )}
    </button>

    <button
      onClick={() => setActiveTab("Orders")}
      className={`text-2xl ${
        activeTab === "Orders"
          ? "scale-125"
          : "opacity-80"
      }`}
    >
      📦
    </button>

    <button
      onClick={() => setActiveTab("Wallet")}
      className={`text-2xl ${
        activeTab === "Wallet"
          ? "scale-125"
          : "opacity-80"
      }`}
    >
      💰
    </button>

    <button
      onClick={() =>
        setShowMoreMenu(true)
      }
      className="text-2xl"
    >
      ☰
    </button>

  </div>
)}
      

    </div>
  );
}

function Home({
  online,
  setOnline,
  wallet,
  rating,
  location,
  surge,
  navigate,
}) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Home</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Card title="Status" value={online ? "ONLINE" : "OFFLINE"} />
        <Card title="Today’s Earnings" value={`€${wallet?.today || 0}`} />
<Card title="Wallet Balance" value={`€${wallet?.available || 0}`} />
        <Card title="Rating" value={`⭐ ${rating}`} />
      </div>

      <button
        className={`py-3 px-4 rounded-lg mb-4 text-white ${
          online ? "bg-red-600" : "bg-green-600"
        }`}
        onClick={async () => {

  const newStatus =
    !online;

  setOnline(
    newStatus
  );

  try {

    const token =
      localStorage.getItem(
        "courierToken"
      );

    await API.put(
      "/profile/online",
      {
        online:
          newStatus,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  } catch (error) {

    console.log(
      "Failed to update online status",
      error
    );

  }

}}
      >
        {online ? "Go Offline" : "Go Online"}
      </button>

      {/* ===== MAP ONLY (NO POPUP HERE) ===== */}
      <CourierMap
        location={location}
        surge={surge}
        online={online}
        navigate={navigate}
      />
    </>
  );
}



function DeliveryHistory({
  orders,
}) {

  if (!orders.length) {
    return (
      <div className="bg-white p-6 rounded-2xl">
        No completed deliveries yet
      </div>
    );
  }

  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold">
        Delivery History
      </h2>

      {orders.map((order) => (

        <div
          key={order._id}
          className="bg-white p-4 rounded-2xl shadow-sm"
        >

          <p>
            📦 {order.orderNumber}
          </p>

          <p>
            🍗 {order.restaurantName}
          </p>

          <p>
            👤 {order.customerName}
          </p>

          <p>
            💰 €{order.fee}
          </p>

          <p className="text-green-600">
            ✅ Delivered
          </p>

        </div>

      ))}
    </div>
  );
}

/* ================= ACTIVE ORDER ================= */
function ActiveOrder({
  stage,
  onNext,
  order,
}) {
  if (!order) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          Active Order
        </h2>

        <p className="text-gray-500">
          No active order
        </p>
      </div>
    );
  }

  const stages = [
    "Assigned",
    "Heading to Restaurant",
    "Arrived at Restaurant",
    "Picked Up",
    "On the Way",
    "Delivered",
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">
        Active Delivery
      </h2>

      {/* ORDER CARD */}
      <div className="bg-white p-5 rounded-3xl shadow-sm space-y-3">
        <h3 className="font-bold text-lg">
          {order.restaurantName}
        </h3>

        <p>
          📦 Order ID: {order.id}
        </p>

        <p>
          👤 Customer: {order.customerName}
        </p>

        <p>
          📍 Pickup: {order.pickupAddress}
        </p>

        <p>
          🏠 Dropoff: {order.dropoffAddress}
        </p>

        <p>
          💳 Payment: {order.payment}
        </p>

        <p>
          🛣 Distance: {order.distance}
        </p>

        <p className="font-semibold text-green-600">
          💰 €{order.fee}
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white p-5 rounded-3xl shadow-sm">
        <h3 className="font-semibold mb-4">
          Delivery Progress
        </h3>

        <div className="flex flex-wrap gap-2">
          {stages.map((s, index) => (
            <div
              key={s}
              className={`px-3 py-2 rounded-full text-sm ${
                index <= stages.indexOf(stage)
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="mt-5">
          {stage !== "Delivered" ? (
            <button
              onClick={onNext}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl"
            >
              Next Step →
            </button>
          ) : (
            <p className="text-green-600 font-semibold">
              ✔ Delivery Completed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function RequestOrder({
  orders,
  acceptOrder,
  rejectOrder,
}) {

  if (!orders?.length) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        No pending requests
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">

      {orders.map((order) => (

        <div
          key={order._id}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >

          <div className="bg-green-600 text-white p-5">

            <h2 className="text-xl font-bold">
              📦 New Delivery Request
            </h2>

          </div>

          <div className="p-5 space-y-4">

            <div>
              <p className="text-xs text-gray-500">
                Restaurant
              </p>

              <p className="font-semibold">
                {order.restaurantName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Customer
              </p>

              <p className="font-semibold">
                {order.customerName}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Pickup Address
              </p>

              <p className="font-semibold">
                {order.pickupAddress}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Dropoff Address
              </p>

              <p className="font-semibold">
                {order.dropoffAddress}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Delivery Fee
              </p>

              <p className="font-bold text-green-600">
                €{order.fee}
              </p>
            </div>

            <div className="flex gap-3 pt-4">

              <button
                onClick={() =>
                  acceptOrder(order)
                }
                className="flex-1 bg-green-600 text-white py-3 rounded-xl"
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectOrder(order)
                }
                className="flex-1 bg-red-600 text-white py-3 rounded-xl"
              >
                Decline
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

/* ================= WALLET ================= */
function Wallet({
  wallet,
  bankAccount,
  setBankAccount,
  setShowWithdrawModal,
}) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">
        Wallet & Earnings
      </h2>

      {/* BALANCE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-600 text-white p-5 rounded-3xl shadow">
          <small>Available Balance</small>
          <h2 className="text-3xl font-bold mt-2">
            €{wallet?.available || 0}
          </h2>
        </div>

        <div className="bg-yellow-500 text-white p-5 rounded-3xl shadow">
          <small>Pending Earnings</small>
          <h2 className="text-3xl font-bold mt-2">
            €{wallet?.pending || 0}
          </h2>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-3xl shadow">
          <small>Today's Earnings</small>
          <h2 className="text-3xl font-bold mt-2">
            €{wallet?.today || 0}
          </h2>
        </div>
      </div>

      {/* WITHDRAW CARD */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="font-semibold text-lg mb-3">
          Withdraw Earnings
        </h3>

        <p className="text-gray-500 mb-4">
          Transfer your available balance
          directly to your bank account.
        </p>

        <button
  onClick={() =>
    setShowWithdrawModal(true)
  }
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl"
>
  Withdraw Funds
</button>
      </div>

      {/* EARNING STATS */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="font-semibold text-lg mb-4">
          Earnings Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>This Week</span>
            <strong>€{wallet?.weekly || 0}</strong>
          </div>

          <div className="flex justify-between">
            <span>This Month</span>
            <strong>€{wallet?.monthly || 0}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total Earned</span>
            <strong>€{wallet?.totalEarned || 0}</strong>
          </div>
        </div>
      </div>

      {/* BANK ACCOUNT */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <h3 className="font-semibold text-lg mb-4">
          Payment Account
        </h3>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">
              Bank Account
            </p>

            <small className="text-gray-500 block">
  {bankAccount?.bankName || "No Bank"}
</small>

<small className="text-gray-500 block">
  {bankAccount?.accountName}
</small>

<small className="text-gray-500 block">
  {bankAccount?.accountNumber}
</small>
          </div>

          <button
  onClick={async () => {
    const bankName =
      prompt("Bank Name");

    const accountName =
      prompt("Account Name");

    const accountNumber =
      prompt("Account Number");

    if (
      !bankName ||
      !accountName ||
      !accountNumber
    )
      return;

    try {
      const token =
        localStorage.getItem(
          "courierToken"
        );

      await API.put(
        "/wallet/bank-account",
        {
          bankName,
          accountName,
          accountNumber,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setBankAccount({
        bankName,
        accountName,
        accountNumber,
      });

      alert("Saved");

    } catch (error) {
      alert("Failed");
    }
  }}
  className="bg-gray-200 px-4 py-2 rounded-xl"
>
  Edit
</button>
        </div>
      </div>
    </div>
  );
}

/* ================= TRANSACTION HISTORY ================= */
function TransactionHistory({ transactions }) {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Transaction History
      </h2>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-500">
            No transactions yet
          </p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">
  {tx.type === "withdrawal"
    ? "Withdrawal"
    : "Delivery"}
</h4>

                <small className="text-gray-500">
  {new Date(tx.date).toLocaleDateString()}
</small>
              </div>

              <div className="text-right">
                <h4
  className={`font-semibold ${
    tx.type === "withdrawal"
      ? "text-red-600"
      : "text-green-600"
  }`}
>
  {tx.type === "withdrawal"
    ? "-"
    : "+"}
  €{tx.amount}
</h4>

                <small className="text-blue-600">
                  {tx.status}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

/* ================= PROFILE ================= */
function Profile({
  rating,
  completed,
  online,
  profileData,
  setProfileData,
  setShowEditModal,
  handleLogout,
}) {
  return (
    <div className="space-y-5">
      {/* PROFILE CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-4xl border border-white/30">
            🛵
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold">
  {profileData?.fullName || "Courier Rider"}
</h2>
            <p className="opacity-90">
              {profileData.city}
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                ⭐ {rating} Rating
              </span>

              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                📦 {completed} Deliveries
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  online
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                {online ? "ONLINE" : "OFFLINE"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <small className="text-gray-500">
            Phone Number
          </small>

          <h3 className="font-semibold mt-1">
            {profileData.phone}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <small className="text-gray-500">
            Email Address
          </small>

          <h3 className="font-semibold mt-1">
            {profileData.email}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <small className="text-gray-500">
            Delivery Vehicle
          </small>

          <h3 className="font-semibold mt-1">
            {profileData.vehicle}
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <small className="text-gray-500">
            Courier Level
          </small>

          <h3 className="font-semibold mt-1">
            Gold Rider 🏆
          </h3>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <span>Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="p-4 border-b flex justify-between items-center">
          <span>Dark Mode</span>
          <input type="checkbox" />
        </div>

        <div className="p-4 border-b flex justify-between items-center">
          <span>Live Tracking</span>
          <input type="checkbox" defaultChecked />
        </div>

        <div className="p-4 flex justify-between items-center">
          <span>Auto Accept Orders</span>
          <input type="checkbox" />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-2xl font-semibold"
        >
          ✏ Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-2xl font-semibold"
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function Card({ title, value }) {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <small className="text-gray-500">{title}</small>
      <h3 className="font-semibold">{value}</h3>
    </div>
  );
}