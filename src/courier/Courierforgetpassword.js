import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/courierresetpasswordcode");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-sm bg-orange-400 rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-white text-center mb-1">
          Forgot Password
        </h2>
        <p className="text-sm text-white/90 text-center mb-6">
          Enter your email and we’ll send you a reset code
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/95 mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
              <span className="text-sm opacity-90">✉️</span>
              <input
                type="email"
                placeholder="rider@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          >
            Send Reset Code
          </button>
        </form>

        <div
          className="mt-5 text-center text-xs font-medium text-white/95 cursor-pointer hover:underline"
          onClick={() => navigate("/courierLogin")}
        >
          ← Back to sign in
        </div>
      </div>
    </div>
  );
}
