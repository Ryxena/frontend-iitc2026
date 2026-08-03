import { Skeleton } from "@/components/ui/skeleton";

function MemberCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}

export default function TeamPageSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 relative z-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-4">
          {/* Badge kategori kompetisi */}
          <Skeleton className="h-6 w-40 rounded-full" />
          {/* Judul "Team ..." */}
          <Skeleton className="h-9 w-64" />
          {/* Subteks */}
          <Skeleton className="h-4 w-80" />
        </div>
        {/* Tombol Download Guidebook */}
        <Skeleton className="h-10 w-48 rounded-xl shrink-0" />
      </div>

      {/* SECTION: KODE UNDANGAN */}
      <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-4 max-w-lg w-full">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="h-5 w-40" />
          </div>
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-2/3 max-w-sm" />
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 w-28 rounded-lg" />
          </div>
        </div>
        <Skeleton className="hidden md:block w-32 h-32 rounded-full shrink-0" />
      </div>

      {/* SECTION: DAFTAR ANGGOTA TIM */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-44" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MemberCardSkeleton />
          <MemberCardSkeleton />
          <MemberCardSkeleton />
        </div>
      </div>

      {/* SECTION: PEMBERITAHUAN */}
      <div className="bg-[#fff8f3] border border-[#ffdac1] rounded-xl p-5 flex items-start gap-3">
        <Skeleton className="w-5 h-5 rounded shrink-0 mt-0.5" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full max-w-lg" />
          <Skeleton className="h-4 w-2/3 max-w-md" />
        </div>
      </div>
    </div>
  );
}
