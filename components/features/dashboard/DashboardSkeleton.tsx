import { Skeleton } from "@/components/ui/skeleton";
import PromoBannerSkeleton from "./PromoBannerSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Sapaan */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Registration Stepper */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <Skeleton className="h-5 w-40 mb-8" />
        <div className="grid grid-cols-4 max-w-4xl mx-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banner + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex">
          <PromoBannerSkeleton />
        </div>

        <div className="flex flex-col gap-6">
          {/* Deadline card skeleton */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-2.5 w-full rounded-full" />
          </div>

          {/* Empty state card skeleton */}
          <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center py-10 gap-3">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
