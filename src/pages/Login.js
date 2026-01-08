import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 1️⃣ Validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // 2️⃣ Get saved user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if user exists
    if (!storedUser || storedUser.email !== email) {
      alert("No account found. Please sign up first.");
      return;
    }

    // Check password
    if (storedUser.password !== password) {
      alert("Incorrect password.");
      return;
    }

    // Login successful
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "/"; // redirect to homepage/discovery
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #fcb59bff; }
        .page { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .container { background: #fd6128; width: 100%; max-width: 420px; padding: 30px 25px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .avatar { width: 70px; height: 70px; background: #4aa3df; border-radius: 8px; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; }
        h2 { text-align: center; margin-bottom: 8px; }
        .subtitle { text-align: center; color: #777; margin-bottom: 20px; font-size: 14px; }
        input { width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 5px; border: 1px solid #ddd; font-size: 14px; }
        .options { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-bottom: 20px; color: #555; }
        .login-btn {  width: 100%;
  padding: 14px;
  background: #1e90ff;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.6),
              0 0 20px rgba(30, 144, 255, 0.4);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.login-btn:hover {
  box-shadow: 0 0 15px rgba(30, 144, 255, 0.9),
              0 0 30px rgba(30, 144, 255, 0.7);
  transform: translateY(-1px);
}
        .error { color: red; font-size: 13px; margin-bottom: 10px; text-align: center; }
      `}</style>

      <div className="page">
        <div className="container">
          <div className="avatar">👤</div>

          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account.</p>

          {error && <div className="error">{error}</div>}

          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}
