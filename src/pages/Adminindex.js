import React, { useState } from "react";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    window.location.href = "admindashboard"; 
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1524] text-white">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-5 py-4 relative">
        <div className="flex items-center">
          <img src={logo} alt="Hooks Food" className="w-[45px] sm:w-[6vw] md:w-[70px]" />
        </div>

        {/* Hamburger for mobile */}
        <input type="checkbox" id="menu-toggle" className="hidden" />
        <label
          htmlFor="menu-toggle"
          className="hamburger cursor-pointer text-3xl md:hidden"
        >
          &#9776;
        </label>

        {/* Nav links */}
        <ul className="nav-links hidden md:flex gap-6 list-none">
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-orange-500 transition">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Login Box */}
      <div className="flex flex-1 justify-center items-center p-5">
        <div className="login-box w-full max-w-sm bg-white/5 p-8 rounded-xl text-center">
          <div className="avatar mb-5">
            <span className="text-[50px] sm:text-[10vw] md:text-[70px] inline-block">&#128100;</span>
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none"
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              &#128065;
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full py-3 bg-orange-500 rounded-md text-white font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="mt-4 text-sm">
            Forgot password?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Reset here
            </a>
          </p>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <style>{`
        #menu-toggle:checked ~ .nav-links {
          display: flex;
          flex-direction: column;
          text-align: center;
          position: absolute;
          top: 60px;
          right: 0;
          width: 100%;
          background: #0f1c33;
          padding: 20px 0;
          gap: 4;
        }
      `}</style>
    </div>
  );
}
