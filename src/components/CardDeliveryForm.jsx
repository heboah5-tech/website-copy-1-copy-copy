import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardDeliveryForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    id_number: "",
    card_type: "",
    address: "",
    date: "",
  });

  const handleChange = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال الطلب بنجاح!");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
          dir="rtl"
        >
          {/* Header with logo + cards image */}
          <div className="relative bg-white pt-5 pb-0">
            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-3">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                  <span className="text-white font-bold text-2xl">ف</span>
                </div>
                <span className="text-primary font-bold text-xs tracking-widest mt-1">FAZAA</span>
              </div>
            </div>

            {/* Cards banner */}
            <div className="w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                alt="بطاقات فزعة"
                className="w-full h-24 object-cover"
                style={{ filter: 'grayscale(20%)' }}
              />
            </div>
          </div>

          {/* Form body */}
          <div className="px-5 py-5">
            <p className="text-center text-sm font-semibold text-foreground mb-5 leading-relaxed">
              أدخل البيانات المطلوبة لأكمال طلب البطاقة وتأكيد عنوان التوصيل
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <input
                type="tel"
                placeholder="Mobile number"
                value={form.mobile}
                onChange={(e) => handleChange("mobile", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <input
                type="text"
                placeholder="رقم الهوية"
                value={form.id_number}
                onChange={(e) => handleChange("id_number", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <div className="relative">
                <select
                  value={form.card_type}
                  onChange={(e) => handleChange("card_type", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right appearance-none bg-white focus:outline-none focus:border-primary transition-colors text-gray-500"
                  required
                >
                  <option value="" disabled>نوع البطاقة</option>
                  <option value="silver">عضوية فضية</option>
                  <option value="gold">عضوية ذهبية</option>
                  <option value="platinum">عضوية بلاتينية</option>
                </select>
                <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <input
                type="text"
                placeholder="عنوان التوصيل"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
                required
              />
              <div className="relative">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-right bg-white focus:outline-none focus:border-primary transition-colors text-gray-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 text-base font-bold rounded-2xl text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                style={{ background: 'linear-gradient(135deg, #8a8a8a 0%, #b0b0b0 50%, #8a8a8a 100%)' }}
              >
                المتابعة
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}