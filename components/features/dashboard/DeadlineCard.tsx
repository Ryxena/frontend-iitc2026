import { Clock } from "lucide-react";

export default function DeadlineCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-orange-500" />
        <h3 className="font-semibold text-slate-900 text-sm">
          Deadline Terdekat
        </h3>
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Penutupan Pendaftaran Gelombang 1
      </p>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-slate-900">14</span>
        <span className="text-slate-500 mb-1">Hari Lagi</span>
      </div>

      {/* Custom Progress Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full w-[75%]"></div>
      </div>
    </div>
  );
}
