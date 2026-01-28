import { useEffect } from "react";

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
      sidebar.classList.toggle("show");
    };

    hamburger.addEventListener("click", toggleSidebar);

    const clickOutside = (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
          sidebar.classList.remove("show");
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

  return (
    <div className="reviews-root">
      <style>{`
        body { margin:0; font-family:Poppins,sans-serif; background:#000814; color:#fff }
        .sidebar { width:240px; background:#001d3d; height:100vh; position:fixed; top:0; left:0; padding-top:20px; overflow-y:auto; transition:0.3s }
        .sidebar h2 { margin-left:20px; font-size:20px; margin-bottom:20px }
        .sidebar ul { list-style:none; padding:0 }
        .sidebar ul li { padding:12px 20px }
        .sidebar ul li:hover, .sidebar ul .active { background:#1f3354 }
        .sidebar ul li a { text-decoration:none; color:#fff; display:block; font-size:15px }
        .sidebar ul li a:hover { color:#a8c6ff }
        .hamburger { display:none; position:fixed; top:20px; left:20px; z-index:1100; flex-direction:column; gap:5px; cursor:pointer }
        .hamburger div { width:32px; height:3px; background:#ff5139; transition:0.3s }
        .hamburger.active div:nth-child(1){ transform: rotate(45deg) translate(6px,6px) }
        .hamburger.active div:nth-child(2){ opacity:0 }
        .hamburger.active div:nth-child(3){ transform: rotate(-45deg) translate(6px,-6px) }
        .container { margin-left:260px; padding:30px; transition:0.3s }
        h1 { text-align:center; margin-bottom:25px; font-size:26px; color:#ffb088 }
        .review-box { background:#002447; padding:20px; border-radius:8px; margin-bottom:20px; position:relative; transition:0.3s }
        .review-header { display:flex; justify-content:space-between; margin-bottom:5px; flex-wrap:wrap }
        .name-location { font-weight:600; font-size:15px }
        .date { font-size:12px; color:#bbb }
        .stars { color:gold; margin:8px 0; font-size:18px }
        .actions { position:absolute; top:15px; right:15px }
        .actions i { margin-left:12px; cursor:pointer; font-size:18px }
        .actions .delete { color:#ff4d4d }
        .actions .edit { color:#4da6ff }
        footer { text-align:center; margin-top:40px; padding-bottom:20px; color:#aaa; font-size:12px }
        @media(max-width:900px){.container{margin-left:0;padding:20px}}
        @media(max-width:768px){.hamburger{display:flex}.sidebar{transform:translateX(-100%)}.sidebar.show{transform:translateX(0)}.container{margin-left:0}.review-box{padding:15px}.actions{top:10px;right:10px}}
        @media(max-width:480px){h1{font-size:20px}.name-location{font-size:14px}.review-box p{font-size:14px}.stars{font-size:16px}}
        .top-right-notification { position:absolute; top:20px; right:25px; font-size:24px }
        .top-right-notification a { text-decoration:none; color:white; transition:0.3s }
        .top-right-notification a:hover { color:#ff6b00 }
      `}</style>

      <div className="hamburger" id="hamburger">
        <div></div><div></div><div></div>
      </div>

      <div className="sidebar" id="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="admindashboard">🏠 Home</a></li>
          <li><a href="adminorder">🧾 Orders</a></li>
          <li><a href="adminpayment">💳 Payments</a></li>
          <li><a href="adminAnalytics">📊 Analytics</a></li>
          <li><a href="adminmenulist">🏪 Restaurants & Stores</a></li>
          <li><a href="adminsubmissions">📝 Submissions</a></li>
          <li><a href="admincouriers">🏍️ Courier Management</a></li>
          <li><a href="adminreviews">⭐ Reviews</a></li>
          <li>
  <a href="adminwallet">💰 Wallet</a>
</li>

          <li className="active"><a href="adminsetting">⚙️ Settings</a></li>
          <li><a href="adminindex">🚪 Log-out</a></li>
        </ul>
      </div>

      <div className="container">
        <div className="top-right-notification">
          <a href="adminnotification">🔔</a>
        </div>

        <h1>Customer Reviews</h1>

        {[
          { name: "Stanley Moore", location: "London", date: "24 Oct 2025 - 00:14", stars: "★★★★★", text: "Thanks for the safe delivery and quick response. Amazing food, best African soup I had all year." },
          { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
          { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
          { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
          { name: "Gbenga Morife", location: "Ibadan", date: "23 Dec 2025 - 11:53", stars: "★★★☆☆", text: "Lovely" },
          { name: "Olayinka Demeola", location: "Lagos", date: "18 Sept 2025 - 06:41", stars: "★★★★★", text: "Super" }
        ].map((review, idx) => (
          <div className="review-box" key={idx}>
            <div className="review-header">
              <div className="name-location">{review.name} – {review.location}</div>
              <div className="date">{review.date}</div>
            </div>
            <div className="stars">{review.stars}</div>
            <p>{review.text}</p>
            <div className="actions">
              <i className="delete">🗑</i>
              <i className="edit">✏️</i>
            </div>
          </div>
        ))}

        <footer>© 2025 Hooks Food. All rights reserved.</footer>
      </div>
    </div>
  );
}
