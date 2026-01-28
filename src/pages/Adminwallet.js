import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function AdminWallet() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Admin wallet
  const [availableBalance, setAvailableBalance] = useState(200000);
  const [pendingBalance, setPendingBalance] = useState(40000);

  // Restaurant withdrawals
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      restaurant: "Gbenga's Grill",
      amount: 5000,
      bank: "GTBank - 1234567890",
      status: "pending",
      date: "24 Jan 2026",
    },
    {
      id: 2,
      restaurant: "Olamide Pizza",
      amount: 12000,
      bank: "Access Bank - 0987654321",
      status: "pending",
      date: "22 Jan 2026",
    },
  ]);

  // Admin top-up
  const [topUpAmount, setTopUpAmount] = useState("");

  // Admin payout
  const [payoutRestaurant, setPayoutRestaurant] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  // Top-up admin wallet
  const handleTopUp = () => {
    const amt = parseInt(topUpAmount);
    if (isNaN(amt) || amt <= 0) return alert("Enter a valid amount");
    setAvailableBalance(prev => prev + amt);
    setTopUpAmount("");
    alert(`Wallet credited with ₦${amt.toLocaleString()}`);
  };

  // Payout to restaurant
  const handlePayout = () => {
    const amt = parseInt(payoutAmount);
    if (!payoutRestaurant) return alert("Select a restaurant");
    if (isNaN(amt) || amt <= 0) return alert("Enter a valid amount");
    if (amt > availableBalance) return alert("Insufficient funds in admin wallet");

    // Deduct from admin wallet
    setAvailableBalance(prev => prev - amt);

    // Auto-pay matching pending withdrawal requests
    let remainingAmt = amt;
    const updatedWithdrawals = withdrawals.map(w => {
      if (w.restaurant === payoutRestaurant && w.status === "pending" && remainingAmt > 0) {
        if (remainingAmt >= w.amount) {
          remainingAmt -= w.amount;
          return { ...w, status: "paid" };
        } else {
          return { ...w, amount: w.amount - remainingAmt, status: "partial" };
        }
      }
      return w;
    });

    // If there is leftover amount (no pending withdrawals), add as manual payout
    if (remainingAmt > 0) {
      updatedWithdrawals.unshift({
        id: withdrawals.length + 1,
        restaurant: payoutRestaurant,
        amount: remainingAmt,
        bank: payoutRestaurant + " Bank Info",
        status: "paid",
        date: new Date().toLocaleDateString(),
      });
    }

    setWithdrawals(updatedWithdrawals);
    setPayoutRestaurant("");
    setPayoutAmount("");
    alert(`Paid ₦${amt.toLocaleString()} to ${payoutRestaurant}`);
  };

  // Approve / Reject withdrawals manually
  const updateStatus = (id, newStatus) => {
    setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, status: newStatus } : w)));
  };

  return (
    <div className="wallet-root">
      <style>{`
        :root{--primary:#ff6b00;--bg:#000814;--panel:#001d3d;--text:#fff}
        body{margin:0;font-family:Arial,sans-serif;display:flex;background:var(--bg);color:var(--text)}
        .sidebar{width:230px;background:var(--panel);height:100vh;padding-top:20px;position:fixed;transition:0.3s;left:0}
        .sidebar ul{list-style:none;padding:0;margin-top:20px}
        .sidebar ul li{padding:12px 20px;cursor:pointer}
        .sidebar ul li a{text-decoration:none;color:var(--text);display:block}
        .sidebar ul li.active{background:rgba(255,107,0,0.25);border-left:4px solid var(--primary)}
        .container{margin-left:250px;padding:40px;width:calc(100% - 250px)}
        h1{text-align:center;font-size:26px;margin-bottom:30px}
        .stats-box{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:30px}
        .stat-card{background:var(--panel);padding:20px;border-radius:10px;flex:1;min-width:180px;text-align:center}
        .stat-number{font-size:24px;font-weight:bold;color:#ff6b00;margin-top:5px}
        .top-up-box, .payout-box{background:var(--panel);padding:20px;border-radius:10px;margin-bottom:30px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
        .top-up-box input, .payout-box input, .payout-box select{flex:1;padding:10px;border-radius:6px;border:none;background:rgba(255,255,255,0.08);color:#fff}
        .top-up-box button, .payout-box button{padding:10px 16px;border:none;border-radius:6px;background:#00a651;color:#fff;cursor:pointer}
        table{width:100%;border-collapse:collapse;background:var(--panel);border-radius:8px;overflow:hidden}
        th, td{padding:12px;text-align:left;border-bottom:1px solid #1a1a2e}
        th{background:#001f3d}
        button.status-btn{padding:6px 12px;border:none;border-radius:6px;color:#fff;cursor:pointer;margin-right:6px}
        .approve{background:#00a651}
        .reject{background:#ff4d4d}
        .paid{background:#4da6ff}
        .partial{background:#ffa500}
        .menu-btn{display:none;position:fixed;left:20px;top:20px;z-index:1000;font-size:30px;cursor:pointer;color:var(--text)}
        .top-right-notification{position:absolute;top:20px;right:25px;font-size:24px}
        .top-right-notification a{text-decoration:none;color:white;transition:0.3s}
        .top-right-notification a:hover{color:#ff6b00}
        @media(max-width:768px){.sidebar{left:-250px}.sidebar.show{left:0}.container{margin-left:0;width:100%;padding-top:70px}.menu-btn{display:block}}
      `}</style>

      {/* MOBILE MENU BUTTON */}
      <div className="menu-btn" onClick={() => setSidebarVisible(!sidebarVisible)}>
        {sidebarVisible ? "✖" : "☰"}
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarVisible ? "show" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
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
            ["🚪 Log-out", "/adminindex"],
          ].map(([label, path]) => (
            <li key={path} className={location.pathname === path ? "active" : ""}>
              <a href={path}>{label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="top-right-notification">
          <a href="adminnotification">🔔</a>
        </div>

        <h1>Admin Wallet Dashboard</h1>

        {/* Wallet Balances */}
        <div className="stats-box">
          <div className="stat-card">
            Available Balance
            <div className="stat-number">₦{availableBalance.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            Pending Balance
            <div className="stat-number">₦{pendingBalance.toLocaleString()}</div>
          </div>
        </div>

        {/* Top-up / Receive Money */}
        <div className="top-up-box">
          <input
            type="number"
            placeholder="Enter amount to credit"
            value={topUpAmount}
            onChange={e => setTopUpAmount(e.target.value)}
          />
          <button onClick={handleTopUp}>Add Funds</button>
        </div>

        {/* Payout Section */}
        <div className="payout-box">
          <select value={payoutRestaurant} onChange={e => setPayoutRestaurant(e.target.value)}>
            <option value="">Select Restaurant</option>
            <option value="Gbenga's Grill">Gbenga's Grill</option>
            <option value="Olamide Pizza">Olamide Pizza</option>
            <option value="Sweet Moi-Moi">Sweet Moi-Moi</option>
          </select>
          <input
            type="number"
            placeholder="Enter amount to payout"
            value={payoutAmount}
            onChange={e => setPayoutAmount(e.target.value)}
          />
          <button onClick={handlePayout}>Pay Restaurant</button>
        </div>

        {/* Withdrawals Table */}
        <h2>Withdrawal Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Amount (₦)</th>
              <th>Bank Details</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map(w => (
              <tr key={w.id}>
                <td>{w.restaurant}</td>
                <td>{w.amount.toLocaleString()}</td>
                <td>{w.bank}</td>
                <td>{w.status}</td>
                <td>{w.date}</td>
                <td>
                  {w.status === "pending" && (
                    <>
                      <button className="status-btn approve" onClick={() => updateStatus(w.id, "approved")}>Approve</button>
                      <button className="status-btn reject" onClick={() => updateStatus(w.id, "rejected")}>Reject</button>
                    </>
                  )}
                  {w.status === "approved" && (
                    <button className="status-btn paid" onClick={() => updateStatus(w.id, "paid")}>Mark as Paid</button>
                  )}
                  {w.status === "paid" && <span>✅ Paid</span>}
                  {w.status === "rejected" && <span>❌ Rejected</span>}
                  {w.status === "partial" && <span>⚠️ Partial Paid</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
