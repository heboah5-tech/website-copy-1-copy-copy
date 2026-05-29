import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6" dir="rtl">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">تم بنجاح!</h2>
      <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
        تم تأكيد طلب بطاقة فزعة بنجاح.<br />سيتم التواصل معك قريباً لتسليم البطاقة.
      </p>
      <button
        onClick={() => navigate("/")}
        className="w-full max-w-sm py-4 text-base font-bold rounded-2xl text-white"
        style={{ background: 'linear-gradient(135deg, #c9a227 0%, #e6c84a 50%, #c9a227 100%)' }}
      >
        العودة للرئيسية
      </button>
    </div>
  );
}