import { Skeleton } from "@/components/ui/skeleton";

function PaymentMethodCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export default function PaymentPageSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 relative z-10">
      {/* HEADER */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* LeaderAlert */}
      <Skeleton className="h-14 w-full rounded-xl" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* PaymentStatus */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-start gap-5">
            <Skeleton className="w-14 h-14 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-4 w-full max-w-md" />
              <Skeleton className="h-4 w-2/3 max-w-sm" />
            </div>
          </div>

          {/* Grid Metode Pembayaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <PaymentMethodCardSkeleton />
            <PaymentMethodCardSkeleton />
            <div className="md:col-span-2">
              <PaymentMethodCardSkeleton />
            </div>
          </div>

          {/* UploadProof */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="h-5 w-48" />
              </div>
              <Skeleton className="h-40 w-full rounded-xl" />
            </div>
            <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex justify-end">
              <Skeleton className="h-11 w-48 rounded-lg" />
            </div>
          </div>
        </div>

        {/* PaymentInstructions (sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-[#fafafa] border border-slate-200 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="h-5 w-24" />
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
