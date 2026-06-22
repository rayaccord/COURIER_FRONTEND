import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CourierCreateAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    try {
      if (
  !fullName ||
  !email ||
  !phone ||
  !city ||
  !vehicle ||
  !password ||
  !confirmPassword
) {
  alert("Please fill all fields");
  return;
}

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await API.post("/auth/register", {
  fullName,
  email,
  phone,
  city,
  vehicle,
  password,
});

      alert(
  "Account created successfully. Please check your email for the verification code."
);

      navigate("/courierconfirmcode", {
        state: {
          email,
        },
      });
    } catch (error) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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


        {/* FULL NAME */}
<div className="mb-4">
  <label className="block text-xs font-medium text-white/95 mb-1">
    Full Name
  </label>

  <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
    <span>👤</span>

    <input
      type="text"
      placeholder="Jeff Martins"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
    />
  </div>
</div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Email
          </label>

          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span>✉️</span>

            <input
              type="email"
              placeholder="rider@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
            />
          </div>
        </div>

        {/* PHONE */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Phone Number
          </label>

          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span>📞</span>

            <input
              type="tel"
              placeholder="+234 801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
            />
          </div>
        </div>

        {/* CITY */}
<div className="mb-4">
  <label className="block text-xs font-medium text-white/95 mb-1">
    City
  </label>

  <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
    <span>📍</span>

    <input
      type="text"
      placeholder="Lagos"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
    />
  </div>
</div>

        {/* VEHICLE */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Vehicle Type
          </label>

          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span>🏍️</span>

            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white"
            >
              <option value="" className="text-black">
                Select vehicle
              </option>

              <option value="bike" className="text-black">
                Motorbike
              </option>

              <option value="bicycle" className="text-black">
                Bicycle
              </option>

              <option value="car" className="text-black">
                Car
              </option>

              <option value="van" className="text-black">
                Van
              </option>
            </select>
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Password
          </label>

          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span>🔒</span>

            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
            />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-white/95 mb-1">
            Confirm Password
          </label>

          <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
            <span>🔒</span>

            <input
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-white placeholder-white/75"
            />
          </div>
        </div>

        <button
          className="mt-5 w-full py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          onClick={handleCreateAccount}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Courier Account"}
        </button>
      </div>
    </div>
  );
}