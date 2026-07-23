import { Trophy } from "lucide-react";

export default function EmptyStateCard() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center py-10">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Trophy className="w-7 h-7 text-slate-400" />
      </div>

      <h3 className="font-semibold text-slate-900 text-sm mb-1">
        Kompetisi yang Diikuti
      </h3>
      <p className="text-xs text-slate-500 max-w-[200px]">
        Anda belum terdaftar di lomba apapun.
      </p>
    </div>
  );
}
