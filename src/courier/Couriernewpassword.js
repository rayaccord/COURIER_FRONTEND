import React, { useState } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import API from "../api";

export default function CourierNewPassword() {

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password.length < 8) {
        setError(
          "Password must be at least 8 characters long."
        );
        return;
      }

      if (password !== confirmPassword) {
        setError(
          "Passwords do not match."
        );
        return;
      }

      setLoading(true);

      const response = await API.post(
        "/auth/reset-password",
        {
          email,
          password,
        }
      );

      alert(response.data.message);

      navigate("/courierlogin");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">

      <div className="w-full max-w-sm bg-orange-400 rounded-2xl p-8 shadow-lg">

        <h2 className="text-xl font-semibold text-white text-center mb-1">
          Set New Password
        </h2>

        <p className="text-sm text-white/90 text-center mb-6">
          Create a strong password to secure your account
        </p>

        {error && (
          <div className="text-white text-sm font-medium text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-xs font-medium text-white/95 mb-1">
              New Password
            </label>

            <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">

              <span className="text-sm opacity-90">
                🔒
              </span>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
              />
            </div>
          </div>

          <div className="mb-4">

            <label className="block text-xs font-medium text-white/95 mb-1">
              Confirm Password
            </label>

            <div className="flex items-center gap-2 bg-white/30 rounded-xl px-3 py-2">

              <span className="text-sm opacity-90">
                🔒
              </span>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
                className="bg-transparent w-full outline-none text-sm font-medium text-white placeholder-white/75"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
          >
            {loading
              ? "Updating..."
              : "Confirm & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}