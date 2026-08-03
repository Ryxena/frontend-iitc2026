import { Skeleton } from "@/components/ui/skeleton";

function TierSkeleton({
  cols,
  count,
  aspect = "aspect-video",
}: {
  cols: string;
  count: number;
  aspect?: string;
}) {
  return (
    <div className="space-y-6">
      {/* TierLabel: teks kecil + garis pembagi */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-px flex-1" />
      </div>
      <div className={`grid ${cols} gap-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className={`w-full rounded-xl ${aspect}`} />
        ))}
      </div>
    </div>
  );
}

export default function SponsorPageSkeleton() {
  return (
    <main className="w-full min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header halaman */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-3/4 max-w-xl" />
        </div>

        {/* Sponsor Platinum */}
        <div className="space-y-10">
          <div className="flex justify-center">
            <Skeleton className="h-9 w-56" />
          </div>
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-slate-100 p-8 md:p-12">
            <div className="flex flex-col items-center space-y-8">
              <Skeleton className="w-full max-w-md aspect-video rounded-xl" />
              <div className="w-full max-w-md space-y-3 flex flex-col items-center">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-9 w-40 rounded-full" />
            </div>
          </div>
        </div>

        {/* Gold / Silver / Bronze */}
        <TierSkeleton cols="grid-cols-2 sm:grid-cols-3" count={3} />
        <TierSkeleton
          cols="grid-cols-2 sm:grid-cols-4"
          count={4}
          aspect="aspect-square sm:aspect-video"
        />
        <TierSkeleton
          cols="grid-cols-3 sm:grid-cols-5"
          count={5}
          aspect="aspect-square"
        />

        {/* CTA */}
        <Skeleton className="h-40 w-full rounded-3xl" />
      </div>
    </main>
  );
}
