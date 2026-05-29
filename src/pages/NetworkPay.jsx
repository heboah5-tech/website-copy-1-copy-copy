import { useNavigate } from "react-router-dom";

export default function NetworkPay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10" dir="rtl">
      {/* Network Pay Logo */}
      <div className="mb-8 mt-4">
        <span className="text-4xl font-black" style={{ color: "#1a1a1a", letterSpacing: "-1px" }}>
          <span style={{ color: "#e63946" }}>network</span>
          <span style={{ color: "#1a1a1a" }}>pay </span>
          <span style={{ color: "#e63946", fontSize: "2.5rem" }}>›</span>
        </span>
      </div>

      {/* Title Button */}
      <div className="w-full max-w-sm mb-6">
        <div className="bg-gray-800 text-white text-center py-3 px-6 rounded-xl text-base font-bold">
          دفع رسوم طلب البطاقة
        </div>
      </div>

      {/* Fees Table */}
      <div className="w-full max-w-sm mb-6">
        <div className="border-2 border-gray-700 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-200 text-center py-2">
            <span className="text-sm font-bold text-gray-700">الرسوم</span>
          </div>
          {/* Rows */}
          <div className="bg-gray-800 px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">رسوم لتأكيد الطلب</span>
              <span className="text-white text-sm font-bold">1 درهم</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">رسوم إضافية</span>
              <span className="text-white text-sm font-bold">0 درهم</span>
            </div>
            <div className="border-t border-gray-600 pt-3 flex items-center justify-between">
              <span className="text-white text-sm font-bold">المجموع</span>
              <span className="text-white text-sm font-bold">1 درهم</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="w-full max-w-sm mb-6">
        <div className="border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 bg-white">
          <span className="text-sm font-bold text-gray-700 shrink-0">الدفع عبر البطاقة</span>
          <div className="flex gap-2 items-center flex-wrap">
            {/* Amex */}
            <div className="bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded">AMEX</div>
            {/* Visa */}
            <div className="border border-gray-200 rounded px-1.5 py-0.5">
              <span className="text-blue-700 font-black text-[10px]">VISA</span>
            </div>
            {/* Mastercard */}
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full -mr-1.5" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-90" />
            </div>
            {/* Mada */}
            <div className="bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">mada</div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="w-full max-w-sm mb-8">
        <button
          onClick={() => navigate("/payment")}
          className="w-full bg-gray-800 text-white text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-700 transition-colors active:scale-[0.98]"
        >
          <span>›</span>
          <span>متابعة</span>
        </button>
      </div>

      {/* Footer Notes */}
      <div className="w-full max-w-sm text-center space-y-3">
        <p className="text-sm text-gray-600 leading-relaxed">
          تُقبل البطاقات العالمية والبطاقات الصادرة في دولة الإمارات العربية المتحدة الخليج.
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-blue-700 text-white text-xs font-bold px-2 py-0.5 rounded">PCI</div>
          <span className="text-xs font-bold text-green-600">DSS CERTIFIED</span>
          <span className="text-xs text-gray-600">بياناتك الخاصة آمنة</span>
        </div>
      </div>
    </div>
  );
}