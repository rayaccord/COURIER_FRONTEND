import React,
{
  useState,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";


export default function CourierConfirmCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] =
  useState(60);
  const [sending, setSending] =
  useState(false);

  useEffect(() => {

  if (timer <= 0) return;

  const interval =
    setInterval(() => {

      setTimer(prev =>
        prev - 1
      );

    }, 1000);

  return () =>
    clearInterval(interval);

}, [timer]);



const handleResend =
  async () => {

    try {

      setSending(true);

      await API.post(
        "/auth/resend-verification",
        {
          email,
        }
      );

      alert(
        "New verification code sent"
      );

      setTimer(60);

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Failed to resend code"
      );

    } finally {

      setSending(false);

    }
  };



  const handleVerify = async () => {
    try {
      if (code.length !== 4) {
        setError("Please enter the 4-digit code");
        return;
      }

      setLoading(true);

      const response = await API.post("/auth/verify", {
        email,
        code,
      });

      alert(response.data.message);

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

navigate("/courierdashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-500 p-4">
      <div className="w-full max-w-xs bg-orange-400 rounded-2xl p-8 shadow-lg text-center">
        <div className="text-4xl mb-3 text-white">🔐</div>

        <h2 className="text-xl font-semibold mb-1 text-white">
          Confirm Your Account
        </h2>

        <p className="text-sm font-normal text-white/90 mb-6">
          Enter the 4-digit code sent to your account
        </p>

        <input
          className="w-full px-4 py-3 text-xl text-center tracking-widest rounded-xl bg-white/30 text-white outline-none placeholder-white/70"
          type="text"
          maxLength="4"
          placeholder="••••"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, ""))
          }
        />

        {error && (
          <div className="text-white text-sm mt-2">
            {error}
          </div>
        )}

        <button
          className="mt-5 w-full py-3 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition-colors"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <button
  className="mt-3 text-white text-sm underline"
  onClick={handleResend}
  disabled={
    timer > 0 || sending
  }
>
  {timer > 0
    ? `Resend Code (${timer}s)`
    : sending
    ? "Sending..."
    : "Resend Verification Code"}
</button>

      </div>
    </div>
  );
}