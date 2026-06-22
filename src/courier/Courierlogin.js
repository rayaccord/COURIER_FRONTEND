import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CourierLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
  try {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const response = await API.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    /* SAVE TOKEN */
    localStorage.setItem(
      "courierToken",

      response.data.token
    );

    /* SAVE USER */
localStorage.setItem(
  "courierUser",
  JSON.stringify(response.data.courier)
);

/* SAVE Courier id */
localStorage.setItem(
  "courierId",
  response.data.courier.id
);

    alert("Login successful");

    navigate("/courierdashboard");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login failed"
    );
  }
};

  const handleGoogleSignIn = () => {
    alert("Google sign-in successful");
    navigate("/courier");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-md bg-orange-400 rounded-2xl p-9 shadow-lg text-center">
        {/* Logo */}
        <div className="mb-5">
          <div className="mx-auto w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl mb-1">
            🏍️
          </div>
          <small className="text-white/85 text-xs font-normal">Courier Portal</small>
        </div>

        <h2 className="text-lg font-semibold text-white mb-1 text-center">Welcome Back, Rider</h2>
        <p className="text-sm text-white/90 mb-6">Sign in to start delivering</p>

        {/* Google Sign In */}
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/90 text-sm font-semibold text-gray-800 hover:bg-white transition-colors"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4"
          />
          Continue with Google
        </button>

        <div className="my-4 text-xs text-white/80">OR</div>

        {/* Email */}
        <label className="block text-left text-xs text-white mb-1 mt-3">Email</label>
        <input
          type="email"
          placeholder="rider@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 rounded-xl bg-white/30 text-white placeholder-white/75 text-sm outline-none"
        />

        {/* Password */}
        <label className="block text-left text-xs text-white mb-1 mt-3">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-3 rounded-xl bg-white/30 text-white placeholder-white/75 text-sm outline-none"
        />

        {/* Sign in */}
        <button
          className="w-full mt-5 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          onClick={handleSignIn}
        >
          Sign in
        </button>

        {/* Footer */}
        <div className="mt-5 flex justify-between text-xs text-white/85">
          <span
            className="cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/courierforgetpassword")}
          >
            Forgot password?
          </span>
          <span>
            New courier?{" "}
            <b
              className="cursor-pointer font-semibold hover:underline"
              onClick={() => navigate("/couriercreateaccount")}
            >
              Join now
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}
