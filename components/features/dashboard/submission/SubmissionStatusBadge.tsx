import { CheckCircle, Clock } from "lucide-react";

export default function SubmissionStatusBadge({
  isSubmitted,
}: {
  isSubmitted: boolean;
}) {
  if (isSubmitted) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-xs">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Karya Sudah Diunggah</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold shadow-xs">
      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
      <span>Belum Unggah Karya</span>
    </div>
  );
}
