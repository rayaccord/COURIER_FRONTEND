import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierResetCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (code === "1234") {
      navigate("/couriernewpassword");
    } else {
      setError("Invalid code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-sm bg-orange-400 rounded-2xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-white text-center mb-1">
          Enter Reset Code
        </h2>
        <p className="text-sm text-white/90 text-center mb-6">
          Enter the 4-digit code sent to your email
        </p>

        {error && <div className="text-white text-sm font-medium text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-white/95 mb-1">
              Confirmation Code
            </label>
            <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">
              <span className="text-sm opacity-90">🔢</span>
              <input
                type="text"
                maxLength="4"
                placeholder="••••"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
                className="bg-transparent w-full outline-none text-lg font-semibold text-white placeholder-white/75 text-center tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-3 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}
