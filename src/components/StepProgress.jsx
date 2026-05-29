const STEPS = [
  { key: "form", label: "البيانات" },
  { key: "network_pay", label: "الرسوم" },
  { key: "payment", label: "الدفع" },
  { key: "completed", label: "تم" },
];

export default function StepProgress({ currentStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="w-full bg-white border-b border-gray-100 px-5 py-3" dir="rtl">
      <div className="flex items-center justify-between max-w-sm mx-auto">
        {STEPS.map((step, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                    ${done ? "bg-green-500 text-white" : active ? "bg-yellow-500 text-white scale-110 shadow-md" : "bg-gray-200 text-gray-400"}`}
                >
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-[10px] ${active ? "text-yellow-600 font-bold" : done ? "text-green-500" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all duration-300 ${done ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}