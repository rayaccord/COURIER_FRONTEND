import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Payments() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["COD", "Online", "Paid", "Unpaid"],
        datasets: [
          {
            label: "Amount (£)",
            data: [36, 132.5, 60, 108.5],
            backgroundColor: ["#ffcc5c", "#4da6ff", "#66cc7a", "#ff6b81"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#fff" } },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#fff" },
            grid: { color: "#ffffff22" },
          },
          x: {
            ticks: { color: "#fff" },
            grid: { display: false },
          },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  const toggleSidebar = () => {
    document.getElementById("hamburger")?.classList.toggle("active");
    document.getElementById("sidebar")?.classList.toggle("show");
  };

  return (
    <div className="payments-root">
      <style>{`
        body { margin:0; font-family:Poppins,sans-serif; background:#1b1e27; color:#fff }
        .sidebar { width:240px; background:#12141c; position:fixed; height:100%; left:0; top:0; padding:20px 0 }
        .sidebar h2 { margin-left:25px; color:#ff5139 }
        .menu-item { display:flex; gap:10px; padding:12px 25px; color:#c8c8c8; text-decoration:none }
        .menu-item.active { background:#ff5139; color:#fff }
        .menu-item:hover { background:#191c24 }
        .logout { margin-top:20px; color:#ff6b6b }
        .main { margin-left:240px; padding:25px }
        .hamburger { display:none; position:fixed; top:20px; left:20px; z-index:20; flex-direction:column; gap:5px }
        .hamburger div { width:30px; height:3px; background:#ff5139 }
        .cards { display:flex; gap:20px; flex-wrap:wrap; margin-bottom:30px }
        .card { flex:1; min-width:150px; padding:20px; border-radius:10px }
        .card p { font-size:22px; font-weight:600 }
        .card1{background:#ff7f62}.card2{background:#ffcc5c}.card3{background:#4da6ff}.card4{background:#66cc7a}.card5{background:#ff6b81}
        .chart-container{background:#ffffff11;padding:25px;border-radius:10px;margin-bottom:40px}
        .payment-filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:15px}
        .input{padding:10px;border-radius:6px;background:#ffffff22;color:#fff;border:none}
        .btn{padding:10px 15px;border:none;border-radius:6px;font-weight:600;cursor:pointer}
        .refresh{background:#e8453c;color:#fff}.export{background:#3cb44b;color:#fff}
        .table-box{overflow-x:auto;background:#ffffff0d;border-radius:10px}
        table{width:100%;min-width:700px;border-collapse:collapse}
        th,td{padding:14px;border-bottom:1px solid #ffffff15}
        .badge{padding:5px 10px;border-radius:20px;font-size:12px}
        .paid{background:#7adf9c;color:#003a10}.pending{background:#eb86ab;color:#4a1133}
        .mark-btn{padding:6px 14px;background:#48c774;border:none;border-radius:5px;color:#fff}
        @media(max-width:768px){.hamburger{display:flex}.sidebar{transform:translateX(-100%)}.sidebar.show{transform:translateX(0)}.main{margin-left:0}}
      `}</style>

      <div className="hamburger" id="hamburger" onClick={toggleSidebar}>
        <div></div><div></div><div></div>
      </div>

      <div className="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <a className="menu-item" href="admindashboard">🏠 Home</a>
        <a className="menu-item" href="adminorder">🧾 Orders</a>
        <a className="menu-item active" href="adminpayment">💳 Payments</a>
        <a className="menu-item" href="adminAnalytics">📊 Analytics</a>
        <a className="menu-item" href="adminmenulist">🍽️ Menu Items</a>
        <a className="menu-item" href="adminreviews">⭐ Reviews</a>
        <a className="menu-item" href="adminsetting">⚙️ Settings</a>
        <a className="menu-item logout" href="adminindex">🚪 Logout</a>
      </div>

      <div className="main">
        <h1 style={{ color: "#ff6a3c" }}>Payments</h1>

        <div className="cards">
          <div className="card card1"><h3>Total Payments</h3><p>£168.50</p></div>
          <div className="card card2"><h3>Total COD</h3><p>£36.00</p></div>
          <div className="card card3"><h3>Total Online</h3><p>£132.50</p></div>
          <div className="card card4"><h3>Total Paid</h3><p>£60.00</p></div>
          <div className="card card5"><h3>Total Unpaid</h3><p>£108.50</p></div>
        </div>

        <div className="chart-container">
          <h3>Payment Trends</h3>
          <canvas ref={chartRef} />
        </div>

        <div className="payment-filters">
          <input className="input" placeholder="Search payments" />
          <input type="date" className="input" />
          <input type="date" className="input" />
          <select className="input"><option>All Status</option></select>
          <button className="btn refresh">Refresh</button>
          <button className="btn export">Export CSV</button>
        </div>

        <div className="table-box">
          <table>
            <thead>
              <tr><th>ORDER ID</th><th>CUSTOMER</th><th>AMOUNT</th><th>METHOD</th><th>STATUS</th><th>DATE</th><th>ACTION</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>693945d8bfadf4ea618324533</td>
                <td>adeosun semiat</td>
                <td>£2.50</td>
                <td>CARD</td>
                <td><span className="badge paid">paid</span></td>
                <td>12/10/2025</td>
                <td><button className="mark-btn">Mark as Paid</button></td>
              </tr>
<tr>
                <td>693945d8bfadf4ea618324533</td>
                <td>adeosun semiat</td>
                <td>£2.50</td>
                <td>CARD</td>
                <td><span className="badge paid">paid</span></td>
                <td>12/10/2025</td>
                <td><button className="mark-btn">Mark as Paid</button></td>
              </tr>
<tr>
                <td>693945d8bfadf4ea618324533</td>
                <td>adeosun semiat</td>
                <td>£2.50</td>
                <td>CARD</td>
                <td><span className="badge paid">paid</span></td>
                <td>12/10/2025</td>
                <td><button className="mark-btn">Mark as Paid</button></td>
              </tr>
<tr>
                <td>693945d8bfadf4ea618324533</td>
                <td>adeosun semiat</td>
                <td>£2.50</td>
                <td>CARD</td>
                <td><span className="badge paid">paid</span></td>
                <td>12/10/2025</td>
                <td><button className="mark-btn">Mark as Paid</button></td>
              </tr>
<tr>
                <td>693945d8bfadf4ea618324533</td>
                <td>adeosun semiat</td>
                <td>£2.50</td>
                <td>CARD</td>
                <td><span className="badge paid">paid</span></td>
                <td>12/10/2025</td>
                <td><button className="mark-btn">Mark as Paid</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
