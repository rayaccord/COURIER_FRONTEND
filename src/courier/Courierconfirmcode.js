import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourierConfirmCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const CORRECT_CODE = "1234";

  const handleVerify = () => {
    if (code.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    if (code === CORRECT_CODE) {
      setError("");
      navigate("/courierdashboard");
    } else {
      setError("Invalid confirmation code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-xs bg-orange-400 rounded-2xl p-8 shadow-lg text-center">
        <div className="text-4xl mb-3 text-white">🔐</div>

        <h2 className="text-xl font-semibold mb-1 text-white">
          <center>Confirm Your Account</center>
        </h2>

        <p className="text-sm font-normal text-white/90 mb-6">
          Enter the 4-digit code sent to your phone
        </p>

        <input
          className="w-full px-4 py-3 text-xl text-center tracking-widest rounded-xl bg-white/30 text-white outline-none placeholder-white/70"
          type="text"
          maxLength="4"
          placeholder="••••"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />

        {error && <div className="text-white text-sm mt-2">{error}</div>}

        <button
          className="mt-5 w-full py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          onClick={handleVerify}
        >
          Verify Code
        </button>

        <div
          className="mt-4 text-xs font-medium text-white/90 cursor-pointer hover:underline"
          onClick={() => alert("Demo code is 1234")}
        >
          Didn’t get a code?
        </div>
      </div>
    </div>
  );
}
