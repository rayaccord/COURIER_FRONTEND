import { useState } from "react";

export default function Settings() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [fullName, setFullName] = useState("Gbenga Oladipopu");
  const [email, setEmail] = useState("adcsoufsemiat5003@gmail.com");

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewSrc(URL.createObjectURL(file));
  };

  return (
    <div className="settings-root">
      <style>{`
        :root{--primary:#ff6b00;--bg:#000814;--panel:#001d3d;--text:#fff}
        body{margin:0;font-family:Arial,sans-serif;display:flex;background:var(--bg);color:var(--text)}
        .sidebar{width:230px;background:var(--panel);height:100vh;padding-top:20px;position:fixed;transition:0.3s;left:0}
        .sidebar ul{list-style:none;padding:0;margin-top:20px}
        .sidebar ul li{padding:12px 20px;cursor:pointer}
        .sidebar ul li a{text-decoration:none;color:var(--text);display:block}
        .sidebar ul li.active{background:rgba(255,107,0,0.25);border-left:4px solid var(--primary)}
        .container{margin-left:250px;padding:40px;width:calc(100% - 250px)}
        h1{text-align:center;font-size:26px}
        .settings-box{background:var(--panel);padding:30px;border-radius:12px;max-width:600px;margin:40px auto}
        input{width:100%;padding:12px;border-radius:8px;border:none;margin-bottom:20px;background:rgba(255,255,255,0.08);color:var(--text)}
        #preview{width:80px;height:80px;border-radius:50%;object-fit:cover;display:block;margin-bottom:10px}
        .upload-btn{background:var(--primary);padding:10px 16px;border-radius:8px;border:none;color:#fff;cursor:pointer;margin-bottom:20px}
        .save-btn{background:#00a651;padding:12px;border-radius:8px;border:none;color:#fff;width:100%;cursor:pointer}
        footer{text-align:center;margin-top:30px;opacity:0.6}
        .menu-btn{display:none;position:fixed;left:20px;top:20px;z-index:1000;font-size:30px;cursor:pointer;color:var(--text)}
        .top-right-notification{position:absolute;top:20px;right:25px;font-size:24px}
        .top-right-notification a{text-decoration:none;color:white;transition:0.3s}
        .top-right-notification a:hover{color:#ff6b00}
        @media(max-width:768px){.sidebar{left:-250px}.sidebar.show{left:0}.container{margin-left:0;width:100%;padding-top:70px}.menu-btn{display:block}}
      `}</style>

      {/* MOBILE MENU BUTTON */}
      <div className="menu-btn" onClick={toggleSidebar}>{sidebarVisible ? "✖" : "☰"}</div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarVisible ? "show" : ""}`}>
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

      {/* MAIN CONTENT */}
      <div className="container">
        <div className="top-right-notification">
          <a href="adminnotification">🔔</a>
        </div>

        <h1>Admin Settings</h1>

        <div className="settings-box">
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          {previewSrc && <img id="preview" src={previewSrc} alt="Profile Preview" />}
          <label>Profile Image</label>
          <input type="file" id="upload" className="upload-btn" onChange={handleImageChange} />

          <button className="save-btn">Save Changes</button>
        </div>

      </div>
    </div>
  );
}
