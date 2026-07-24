import { Info } from "lucide-react";

export default function LeaderAlert() {
  return (
    <div className="w-full bg-[#f0f4ff] border border-[#d6e0ff] rounded-xl p-4 flex items-start gap-3 shadow-sm">
      <div className="mt-0.5">
        <Info className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-blue-700 mb-1">
          Hanya Ketua Tim
        </h4>
        <p className="text-sm text-slate-600">
          Proses pembayaran dan unggah bukti transfer hanya dapat dilakukan oleh
          akun Ketua Tim (Team Leader).
        </p>
      </div>
    </div>
  );
}
