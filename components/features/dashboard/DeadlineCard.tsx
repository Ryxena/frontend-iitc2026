import { Clock } from "lucide-react";
import { DeadlineCardProps } from "@/types";

export default function DeadlineCard({
  title,
  startDate,
  targetDate,
  label = "Deadline Terdekat",
}: DeadlineCardProps) {
  // 1. Konversi string tanggal menjadi angka (milidetik)
  const start = new Date(startDate).getTime();
  const end = new Date(targetDate).getTime();
  const now = new Date().getTime();

  // 2. Hitung sisa hari secara langsung (Derived State)
  const timeDiff = end - now;
  const calculatedDaysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const daysLeft = calculatedDaysLeft > 0 ? calculatedDaysLeft : 0;

  // 3. Hitung persentase progress secara langsung
  const totalDuration = end - start;
  const elapsed = now - start;

  let calculatedProgress = 0;
  if (totalDuration > 0) {
    calculatedProgress = (elapsed / totalDuration) * 100;
  }

  // Pastikan progress berada di rentang 0 - 100
  const progress = Math.min(Math.max(calculatedProgress, 0), 100);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-orange-500" />
        <h3 className="font-semibold text-slate-900 text-sm">{label}</h3>
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{title}</p>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-slate-900">{daysLeft}</span>
        <span className="text-slate-500 mb-1">
          {daysLeft === 0 ? "Waktu Habis" : "Hari Lagi"}
        </span>
      </div>

      {/* Custom Progress Bar Dinamis */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
