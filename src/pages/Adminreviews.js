import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Reviews() {
  useEffect(() => {
    const handleDelete = () => alert("Delete action triggered");
    const handleEdit = () => alert("Edit action triggered");

    document.querySelectorAll('.delete').forEach(btn => btn.addEventListener('click', handleDelete));
    document.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', handleEdit));

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    const toggleSidebar = () => {
      hamburger.classList.toggle("active");
      sidebar.classList.toggle("translate-x-0");
    };

    hamburger.addEventListener("click", toggleSidebar);

    const clickOutside = (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
          sidebar.classList.remove("translate-x-0");
          hamburger.classList.remove("active");
        }
      }
    };

    document.addEventListener("click", clickOutside);

    return () => {
      document.querySelectorAll('.delete').forEach(btn => btn.removeEventListener('click', handleDelete));
      document.querySelectorAll('.edit').forEach(btn => btn.removeEventListener('click', handleEdit));
      hamburger.removeEventListener("click", toggleSidebar);
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  const reviews = [
    { name: "Stanley Moore", location: "London", date: "24 Oct 2025 - 00:14", stars: "★★★★★", text: "Thanks for the safe delivery and quick response. Amazing food, best African soup I had all year." },
    { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
    { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
    { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
    { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
    { name: "Olayinka Demeola", location: "Lagos", date: "18 Sept 2025 - 06:41", stars: "★★★★★", text: "Super" }
  ];

  return (
    <div className="flex bg-[#000814] text-white min-h-screen">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className="fixed top-0 left-0 h-full w-60 bg-[#001d3d] p-5 flex flex-col space-y-2 overflow-y-auto transform -translate-x-full md:translate-x-0 transition-transform z-50"
      >
        <h2 className="text-xl font-bold mb-6 ml-1">Admin Panel</h2>
        <SidebarLink to="/admindashboard" icon="🏠" label="Home" />
        <SidebarLink to="/adminorder" icon="🧾" label="Orders" />
        <SidebarLink to="/adminpayment" icon="💳" label="Payments" />
        <SidebarLink to="/adminAnalytics" icon="📊" label="Analytics" />
        <SidebarLink to="/adminmenulist" icon="🏪" label="Restaurants & Stores" />
        <SidebarLink to="/adminsubmissions" icon="📝" label="Submissions" />
        <SidebarLink to="/admincouriers" icon="🏍️" label="Courier Management" />
        <SidebarLink to="/adminreviews" icon="⭐" label="Reviews" active />
        <SidebarLink to="/adminwallet" icon="💰" label="Wallet" />
        <SidebarLink to="/adminsetting" icon="⚙️" label="Settings" />
        <SidebarLink to="/adminindex" icon="🚪" label="Log-out" danger />
      </aside>

      {/* Hamburger */}
      <div id="hamburger" className="fixed top-5 left-5 md:hidden z-50 flex flex-col gap-2 cursor-pointer">
        <div className="w-8 h-1 bg-orange-500 transition-transform"></div>
        <div className="w-8 h-1 bg-orange-500 transition-opacity"></div>
        <div className="w-8 h-1 bg-orange-500 transition-transform"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-60 p-6 relative">
        <div className="absolute top-5 right-6 text-2xl">
          <a href="adminnotification" className="hover:text-orange-500 transition-colors">🔔</a>
        </div>

        <h1 className="text-center text-2xl md:text-3xl font-bold text-orange-300 mb-8">Customer Reviews</h1>

        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-[#002447] p-5 md:p-6 rounded-lg relative transition-all hover:bg-[#003161]">
              <div className="flex justify-between flex-wrap mb-2">
                <div className="font-semibold text-sm md:text-base">{review.name} – {review.location}</div>
                <div className="text-xs md:text-sm text-gray-400">{review.date}</div>
              </div>
              <div className="text-yellow-400 text-lg md:text-xl mb-2">{review.stars}</div>
              <p className="text-sm md:text-base">{review.text}</p>
              <div className="absolute top-3 right-3 flex gap-3 md:top-4 md:right-4">
                <button className="delete text-red-500 text-lg md:text-xl">🗑</button>
                <button className="edit text-blue-400 text-lg md:text-xl">✏️</button>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center text-gray-400 text-xs md:text-sm mt-10 pb-4">
          © 2025 Hooks Food. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

/* ---------------- Sidebar Link Component ---------------- */
const SidebarLink = ({ to, icon, label, active, danger }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors
      ${danger ? "text-red-500 hover:bg-red-600" : active ? "bg-blue-700 text-white" : "text-gray-300 hover:bg-[#1f3354] hover:text-white"}`}
  >
    <span>{icon}</span> {label}
  </Link>
);
