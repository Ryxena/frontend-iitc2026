import { Skeleton } from "@/components/ui/skeleton";

export default function PromoBannerSkeleton() {
  return (
    <div className="w-full bg-linear-to-br from-[#E2E1F6] to-[#D5D3F1] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center border border-indigo-50 shadow-sm">
      <div className="relative z-10 space-y-5 max-w-lg w-full">
        {/* Badge */}
        <Skeleton className="h-6 w-32 rounded-full bg-white/40" />

        {/* Judul (2 baris) */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-full bg-white/40" />
          <Skeleton className="h-8 w-3/4 bg-white/40" />
        </div>

        {/* Deskripsi (2 baris) */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full bg-white/30" />
          <Skeleton className="h-4 w-5/6 bg-white/30" />
        </div>

        {/* Tombol */}
        <Skeleton className="h-12 w-40 rounded-lg bg-white/40" />
      </div>
    </div>
  );
}
