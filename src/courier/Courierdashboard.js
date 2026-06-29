import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourierMap from "./CourierMap";
import EarningsChart from "./EarningsChart";

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

const [weeklyEarnings, setWeeklyEarnings] =
useState([0, 0, 0, 0, 0, 0, 0]);

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


/* ================= WEEKLY EARNINGS ================= */
useEffect(() => {

  const fetchWeeklyEarnings =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "courierToken"
          );

        const response =
          await API.get(
            "/orders/weekly-earnings",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setWeeklyEarnings(
          response.data
        );

      } catch (error) {

        console.log(
          "Weekly earnings fetch failed",
          error
        );

      }

    };

  fetchWeeklyEarnings();

}, []);


/* ================= FeTch stat ================= */

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

  

  /* ================= LOAD PENDING ORDERS ================= */

useEffect(() => {

  const fetchPendingOrders = async () => {

    try {

      const token = localStorage.getItem("courierToken");

      const response = await API.get(
        "/orders/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomingOrders(response.data);

    } catch (error) {

      console.log(
        "Failed to load pending orders",
        error
      );

    }

  };

  fetchPendingOrders();

}, []);

  
/* ================= FETCH SOCKET ORDERS ================= */

useEffect(() => {

  const handleNewOrder = (order) => {

    if (!online) return;

    console.log("📦 NEW ORDER RECEIVED:", order);

    setIncomingOrders(prev => {

  const exists = prev.some(
    o => o._id === order._id
  );

  if (exists) {
    return prev;
  }

  return [
    order,
    ...prev
  ];

});

    if (Notification.permission === "granted") {

      const notification = new Notification(
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

  socket.on("new-order", handleNewOrder);

  return () => {
    socket.off("new-order", handleNewOrder);
  };

}, [online]);

  /* ================= ORDER TIMER ================= */
  useEffect(() => {
    if (!incomingOrder) {
      setOrderTimer(0);
      return;
    }

    setOrderTimer(60);
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



  /* ================= Listen for "order-accepted"================ */

useEffect(() => {

  const handleOrderAccepted = (orderId) => {

    setIncomingOrders(prev =>
      prev.filter(
        order => order._id !== orderId
      )
    );

  };

  socket.on(
    "order-accepted",
    handleOrderAccepted
  );

  return () => {

    socket.off(
      "order-accepted",
      handleOrderAccepted
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
  surge={surge}
  navigate={navigate}
  incomingOrders={incomingOrders}
  weeklyEarnings={weeklyEarnings}
/>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isMobile && (
<aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-orange-500 text-white flex-col justify-between shadow-2xl z-50">
<div className="p-6 flex flex-col h-full">
  
<h3 className="text-2xl font-bold mb-10 text-center">
  🛵 Courier
</h3>

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
                className={`flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer transition-all duration-200 mb-3 ${
                  activeTab === tab
  ? "bg-orange-700 font-semibold text-white"
  : "text-white hover:bg-orange-600"
                }`}
              >
               {tab === "Home" && "🏠"}

{tab === "Requests" && (
  <div className="relative">
    <span>🔔</span>

    {incomingOrders.length > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
        {incomingOrders.length}
      </span>
    )}
  </div>
)}

{tab === "Orders" && "📦"}
{tab === "Wallet" && "💰"}
{tab === "History" && "📜"}
{tab === "Profile" && "👤"}

<span>{tab}</span>

              </div>
            ))}

           <div className="mt-auto pt-8">

  <div
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 transition py-4 rounded-xl text-center cursor-pointer font-semibold"
  >
    🔒 Logout
  </div>

  <div
    className={`mt-6 text-center font-semibold ${
      online
        ? "text-green-300"
        : "text-orange-200"
    }`}
  >
    ● {online ? "ONLINE" : "OFFLINE"}
  </div>

</div>

</div>
        </aside>
      )}

      <main className="flex-1 md:ml-64 p-6 pb-28 relative overflow-y-auto">
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

      {incomingOrders.length > 0 && (
  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
    {incomingOrders.length}
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
  incomingOrders,
  weeklyEarnings,
}) {
  
  return (
  <div className="space-y-6">

    {/* ================= HEADER ================= */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-gray-500">
          Ready for your next delivery today.
        </p>
      </div>

      <button
        className={`py-3 px-6 rounded-xl text-white font-semibold ${
          online
            ? "bg-red-600"
            : "bg-green-600"
        }`}
        onClick={async () => {

          const newStatus = !online;

          setOnline(newStatus);

          try {

            const token =
              localStorage.getItem(
                "courierToken"
              );

            await API.put(
              "/profile/online",
              {
                online: newStatus,
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

    </div>


    {/* ================= TOP CARDS ================= */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

  {/* STATUS */}
  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm">
          Status
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {online ? "ONLINE" : "OFFLINE"}
        </h2>

        <p className="text-sm text-green-600 mt-1">
          {online
            ? "🟢 Receiving Orders"
            : "🔴 Not Receiving Orders"}
        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
        🚦
      </div>

    </div>

  </div>


  {/* TODAY */}

  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm">
          Today's Earnings
        </p>

        <h2 className="text-2xl font-bold mt-2">
          €{wallet?.today || 0}
        </h2>

        <p className="text-green-600 text-sm mt-1">
          💶 Earnings Today
        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
        💰
      </div>

    </div>

  </div>


  {/* WALLET */}

  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm">
          Wallet Balance
        </p>

        <h2 className="text-2xl font-bold mt-2">
          €{wallet?.available || 0}
        </h2>

        <p className="text-blue-600 text-sm mt-1">
          💳 Available Balance
        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
        👛
      </div>

    </div>

  </div>


  {/* RATING */}

  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm">
          Rating
        </p>

        <h2 className="text-2xl font-bold mt-2">
          ⭐ {rating}
        </h2>

        <p className="text-orange-600 text-sm mt-1">
          Excellent
        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">
        ⭐
      </div>

    </div>

  </div>


  {/* SURGE */}

  <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg transition">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-gray-500 text-sm">
          Surge
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {surge}
        </h2>

        <p className="text-purple-600 text-sm mt-1">
          ⚡ Live Multiplier
        </p>

      </div>

      <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
        ⚡
      </div>

    </div>

  </div>

</div>


    {/* ================= MAP + OVERVIEW ================= */}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* LEFT SIDE */}

      <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg overflow-hidden">

  {/* ================= MAP HEADER ================= */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 px-5 py-3 border-b">

    <div>

      <h2 className="text-xl font-bold flex items-center gap-2">
        🗺️ Live Delivery Map
      </h2>

      <p className="text-sm text-gray-500">
        Track your position and nearby deliveries in real time.
      </p>

    </div>

    <div className="flex items-center gap-2">

      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
        🟢 LIVE
      </span>

    </div>

  </div>


  {/* ================= QUICK MAP STATS ================= */}

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50">

    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <p className="text-gray-500 text-sm">
        📍 Latitude
      </p>

      <h3 className="font-bold mt-2">
        {location?.lat?.toFixed(4)}
      </h3>

    </div>

    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <p className="text-gray-500 text-sm">
        📍 Longitude
      </p>

      <h3 className="font-bold mt-2">
        {location?.lng?.toFixed(4)}
      </h3>

    </div>

    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <p className="text-gray-500 text-sm">
        📦 Pending Requests
      </p>

      <h3 className="font-bold mt-2">
        {incomingOrders.length}
      </h3>

    </div>

    <div className="bg-white rounded-2xl p-4 shadow-sm">

      <p className="text-gray-500 text-sm">
        ⚡ Surge
      </p>

      <h3 className="font-bold mt-2">
        {surge}
      </h3>

    </div>

  </div>


  {/* ================= MAP ================= */}

  <div className="h-[450px]">

    <CourierMap
      location={location}
      surge={surge}
      online={online}
      navigate={navigate}
    />

  </div>

</div>


      {/* RIGHT SIDE */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

  {/* HEADER */}

  <div className="flex justify-between items-center mb-4">

    <div>

      <h2 className="text-xl font-bold">
        🚚 Courier Performance
      </h2>

      <p className="text-gray-500 text-xs">
  Live activity today
</p>

    </div>

    <div className="text-3xl">
      🛵
    </div>

  </div>


  {/* STATUS */}

  <div className="bg-orange-50 rounded-2xl p-4 mb-5">

    <div className="flex justify-between">

      <span className="text-gray-500">
        Current Status
      </span>

      <strong className={online ? "text-green-600" : "text-red-600"}>

        {online ? "🟢 ONLINE" : "🔴 OFFLINE"}

      </strong>

    </div>

  </div>


  {/* STATS */}

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-gray-50 rounded-2xl p-4">

      <p className="text-gray-500 text-sm">
        💶 Earnings
      </p>

      <h3 className="text-xl font-bold mt-2">
        €{wallet?.today || 0}
      </h3>

    </div>

    <div className="bg-gray-50 rounded-2xl p-4">

      <p className="text-gray-500 text-sm">
        👛 Wallet
      </p>

      <h3 className="text-xl font-bold mt-2">
        €{wallet?.available || 0}
      </h3>

    </div>

    <div className="bg-gray-50 rounded-2xl p-4">

      <p className="text-gray-500 text-sm">
        ⭐ Rating
      </p>

      <h3 className="text-xl font-bold mt-2">
        {rating}
      </h3>

    </div>

    <div className="bg-gray-50 rounded-2xl p-4">

      <p className="text-gray-500 text-sm">
        📦 Pending
      </p>

      <h3 className="text-xl font-bold mt-2">
        {incomingOrders.length}
      </h3>

    </div>

  </div>


  {/* DAILY GOAL */}

  <div className="mt-6">

    <div className="flex justify-between mb-2">

      <span className="font-semibold">
        🎯 Daily Goal
      </span>

      <span>
        €{wallet?.today || 0} / €100
      </span>

    </div>

    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

      <div
        className="bg-orange-500 h-full transition-all"
        style={{
          width: `${Math.min((wallet?.today || 0), 100)}%`,
        }}
      />

    </div>

  </div>


  {/* SURGE */}

  <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-5 text-white">

    <div className="flex justify-between items-center">

      <div>

        <p className="opacity-80">
          Current Surge
        </p>

        <h2 className="text-3xl font-bold">
          ⚡ {surge}
        </h2>

      </div>

      <div className="text-5xl">
        🔥
      </div>

    </div>

  </div>

</div>

    </div>


    {/* ================= PLACEHOLDERS ================= */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

  {/* ================= WEEKLY EARNINGS ================= */}

<div className="bg-white rounded-3xl shadow-lg p-6">

  <div className="flex items-center justify-between mb-5">

    <h2 className="text-lg font-bold">
      📈 Weekly Earnings
    </h2>

    <span className="text-orange-500">
      This Week
    </span>

  </div>

  <EarningsChart
  data={weeklyEarnings}
/>

</div>

  {/* ================= WALLET BREAKDOWN ================= */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-lg font-bold mb-6">
      💳 Wallet Breakdown
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between">

        <span>Available</span>

        <strong>
          €{wallet?.available || 0}
        </strong>

      </div>

      <div className="flex justify-between">

        <span>Pending</span>

        <strong>
          €{wallet?.pending || 0}
        </strong>

      </div>

      <div className="flex justify-between">

        <span>Today's Earnings</span>

        <strong>
          €{wallet?.today || 0}
        </strong>

      </div>

      <div className="flex justify-between border-t pt-4">

        <span>Total Earned</span>

        <strong className="text-green-600">

          €{wallet?.totalEarned || 0}

        </strong>

      </div>

    </div>

  </div>


  {/* ================= ACTIVITY ================= */}

  <div className="bg-white rounded-3xl shadow-lg p-6">

    <h2 className="text-lg font-bold mb-6">

      📜 Courier Activity

    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span>Status</span>

        <strong>

          {online ? "🟢 Online" : "🔴 Offline"}

        </strong>

      </div>

      <div className="flex justify-between">

        <span>Pending Orders</span>

        <strong>

          {incomingOrders.length}

        </strong>

      </div>

      <div className="flex justify-between">

        <span>Rating</span>

        <strong>

          ⭐ {rating}

        </strong>

      </div>

      <div className="flex justify-between">

        <span>Current Surge</span>

        <strong>

          {surge}

        </strong>

      </div>

      <div className="flex justify-between border-t pt-4">

        <span>Wallet</span>

        <strong>

          €{wallet?.available || 0}

        </strong>

      </div>

    </div>

  </div>

</div>

  </div>
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
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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


    
      {/* SETTINGS 
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
      </div>  */}



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
