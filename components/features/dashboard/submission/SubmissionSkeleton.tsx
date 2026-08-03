import { Skeleton } from "@/components/ui/skeleton";

export default function SubmissionSkeleton() {
  return (
    <div className="w-full space-y-10 relative z-10 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* INFO BANNER */}
      <div className="w-full bg-[#f0f4ff] border border-[#d6e0ff] rounded-xl p-4 flex items-start gap-3 shadow-sm">
        <Skeleton className="w-5 h-5 rounded shrink-0 mt-0.5" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
      </div>

      {/* REQUIREMENTS CARD */}
      <div className="border border-slate-200 shadow-sm rounded-2xl bg-white p-8 space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
          <Skeleton className="h-4 w-64" />
          <div className="space-y-2 pt-1">
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="border border-slate-200 shadow-sm rounded-2xl bg-white p-8 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
        <Skeleton className="h-12 w-36 rounded-xl" />
      </div>

      {/* DRIVE ACCESS CARD */}
      <div className="border-dashed border-2 border-slate-200 rounded-2xl bg-[#fafafa] p-6 flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
        <div className="space-y-3 w-full">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-7 w-48 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
