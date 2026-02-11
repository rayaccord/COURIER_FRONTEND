import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierCreateAccount() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");

  const handleCreateAccount = () => {
    navigate("/courierconfirmcode");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-sm bg-orange-400 rounded-2xl p-8 shadow-lg">
        <button
          className="text-white/95 text-xs font-medium mb-4 cursor-pointer hover:underline"
          onClick={() => navigate("/courierLogin")}
        >
          ← Back to sign in
        </button>

        <h2 className="text-xl font-semibold text-white text-center mb-1">
          Join as a Courier
        </h2>
        <p className="text-sm font-normal text-white/90 text-center mb-6">
          Create your rider account to start delivering
        </p>

        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Email
          </label>
          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span className="text-sm opacity-90">✉️</span>
            <input
              type="email"
              placeholder="rider@example.com"
              className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Phone Number
          </label>
          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span className="text-sm opacity-90">📞</span>
            <input
              type="tel"
              placeholder="+234 801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Vehicle Type
          </label>
          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span className="text-sm opacity-90">🏍️</span>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="bg-transparent w-full outline-none text-sm font-medium text-white"
            >
              <option value="" className="text-black">Select vehicle</option>
              <option value="bike" className="text-black">Motorbike</option>
              <option value="bicycle" className="text-black">Bicycle</option>
              <option value="car" className="text-black">Car</option>
              <option value="van" className="text-black">Van</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Password
          </label>
          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span className="text-sm opacity-90">🔒</span>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Confirm Password
          </label>
          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span className="text-sm opacity-90">🔒</span>
            <input
              type="password"
              placeholder="Re-enter password"
              className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
            />
          </div>
        </div>

        <button
          className="mt-5 w-full py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          onClick={handleCreateAccount}
        >
          Create Courier Account
        </button>
      </div>
    </div>
  );
}
