import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PromoBannerProps } from "@/types/index";

export default function PromoBanner({ onIkutiLombaClick }: PromoBannerProps) {
  return (
    <div className="w-full bg-linear-to-br from-[#E2E1F6] to-[#D5D3F1] rounded-2xl p-8 relative overflow-hidden flex flex-col justify-center border border-indigo-50 shadow-sm">
      {/* Ilustrasi Banner di Kanan Atas */}
      <div className="absolute right-0 top-0 w-64 h-full flex items-center justify-end pr-8 opacity-40 pointer-events-none">
        <div className="bg-indigo-300/30 w-24 h-24 rounded-2xl flex items-center justify-center backdrop-blur-sm -rotate-12">
          <ArrowRight className="w-12 h-12 text-indigo-400" />
        </div>
      </div>

      <div className="relative z-10 space-y-5 max-w-lg">
        <Badge
          variant="secondary"
          className="bg-indigo-200/50 text-indigo-800 hover:bg-indigo-200/70 border-none font-medium px-4 py-1"
        >
          Pendaftaran Buka
        </Badge>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
          From Vision to Innovation
        </h2>

        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          Wujudkan ide brilian timmu menjadi karya nyata! Pilih dari 3 kategori lomba utama yang siap menantang kreativitas dan inovasimu dalam merayakan keberagaman bahasa di era digital.
        </p>

        {/* 2. Hubungkan event onClick ke prop onIkutiLombaClick */}
        <Button
          onClick={onIkutiLombaClick}
          className="bg-[#2F2FE4] hover:bg-blue-800 text-white rounded-lg px-6 py-6 shadow-md shadow-blue-200 transition-transform hover:-translate-y-0.5"
        >
          Ikuti Lomba <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
