import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function AdminWallet() {
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Admin wallet balances
  const [availableBalance, setAvailableBalance] = useState(200000);
  const [pendingBalance, setPendingBalance] = useState(40000);

  // Withdrawals
  const [withdrawals, setWithdrawals] = useState([
    { id: 1, restaurant: "Gbenga's Grill", amount: 5000, bank: "GTBank - 1234567890", status: "pending", date: "24 Jan 2026" },
    { id: 2, restaurant: "Olamide Pizza", amount: 12000, bank: "Access Bank - 0987654321", status: "pending", date: "22 Jan 2026" },
  ]);

  // Top-up and payout states
  const [topUpAmount, setTopUpAmount] = useState("");
  const [payoutRestaurant, setPayoutRestaurant] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleTopUp = () => {
    const amt = parseInt(topUpAmount);
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    setAvailableBalance(prev => prev + amt);
    setTopUpAmount("");
    alert(`Wallet credited with ₦${amt.toLocaleString()}`);
  };

  const handlePayout = () => {
    const amt = parseInt(payoutAmount);
    if (!payoutRestaurant) return alert("Select a restaurant");
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    if (amt > availableBalance) return alert("Insufficient funds in admin wallet");

    setAvailableBalance(prev => prev - amt);

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

  const updateStatus = (id, newStatus) => {
    setWithdrawals(withdrawals.map(w => (w.id === id ? { ...w, status: newStatus } : w)));
  };

  return (
    <div className="flex min-h-screen bg-[#000814] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#001d3d] p-5 flex flex-col space-y-2 transition-transform z-50
          ${sidebarVisible ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
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
          <Link
            key={path}
            to={path}
            className={`px-3 py-2 rounded text-sm flex items-center transition-colors ${
              location.pathname === path
                ? "bg-orange-700 text-white"
                : "text-gray-300 hover:bg-[#1f3354] hover:text-white"
            }`}
          >
            {label}
          </Link>
        ))}
      </aside>

      {/* Hamburger */}
      <div
        className="fixed top-5 left-5 md:hidden z-50 cursor-pointer text-2xl"
        onClick={toggleSidebar}
      >
        {sidebarVisible ? "✖" : "☰"}
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-60 p-6 relative">
        <div className="absolute top-5 right-6 text-2xl">
          <a href="adminnotification" className="hover:text-orange-500 transition-colors">🔔</a>
        </div>

        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-300 mb-8">
          Admin Wallet Dashboard
        </h1>

        {/* Wallet Balances */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex-1 min-w-[180px] bg-[#001d3d] rounded-lg p-5 text-center">
            <div>Available Balance</div>
            <div className="text-2xl font-bold text-orange-500 mt-2">
              ₦{availableBalance.toLocaleString()}
            </div>
          </div>
          <div className="flex-1 min-w-[180px] bg-[#001d3d] rounded-lg p-5 text-center">
            <div>Pending Balance</div>
            <div className="text-2xl font-bold text-orange-500 mt-2">
              ₦{pendingBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Top-up Section */}
        <div className="flex flex-wrap gap-4 mb-6 bg-[#001d3d] p-5 rounded-lg items-center">
          <input
            type="number"
            placeholder="Enter amount to credit"
            value={topUpAmount}
            onChange={e => setTopUpAmount(e.target.value)}
            className="flex-1 p-2 rounded bg-[#000814] text-white border-none"
          />
          <button
            onClick={handleTopUp}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
          >
            Add Funds
          </button>
        </div>

        {/* Payout Section */}
        <div className="flex flex-wrap gap-4 mb-8 bg-[#001d3d] p-5 rounded-lg items-center">
          <select
            value={payoutRestaurant}
            onChange={e => setPayoutRestaurant(e.target.value)}
            className="flex-1 p-2 rounded bg-[#000814] text-white border-none"
          >
            <option value="">Select Restaurant</option>
            {["Gbenga's Grill", "Olamide Pizza", "Sweet Moi-Moi"].map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Enter amount to payout"
            value={payoutAmount}
            onChange={e => setPayoutAmount(e.target.value)}
            className="flex-1 p-2 rounded bg-[#000814] text-white border-none"
          />
          <button
            onClick={handlePayout}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
          >
            Pay Restaurant
          </button>
        </div>

        {/* Withdrawals Table */}
        <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-lg overflow-hidden bg-[#001d3d]">
            <thead>
              <tr className="bg-[#001f3d]">
                {["Restaurant", "Amount (₦)", "Bank Details", "Status", "Date", "Actions"].map(th => (
                  <th key={th} className="px-4 py-3">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {withdrawals.map(w => (
                <tr key={w.id} className="border-b border-[#1a1a2e]">
                  <td className="px-4 py-2">{w.restaurant}</td>
                  <td className="px-4 py-2">{w.amount.toLocaleString()}</td>
                  <td className="px-4 py-2">{w.bank}</td>
                  <td className="px-4 py-2 capitalize">{w.status}</td>
                  <td className="px-4 py-2">{w.date}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    {w.status === "pending" && (
                      <>
                        <button
                          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 transition-colors"
                          onClick={() => updateStatus(w.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
                          onClick={() => updateStatus(w.id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {w.status === "approved" && (
                      <button
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
                        onClick={() => updateStatus(w.id, "paid")}
                      >
                        Mark as Paid
                      </button>
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
      </main>
    </div>
  );
}
