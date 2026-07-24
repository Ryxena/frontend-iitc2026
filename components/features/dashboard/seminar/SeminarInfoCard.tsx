import { Calendar, MapPin, Presentation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SeminarInfoCard() {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-2">
        {/* Kolom Kiri: Speaker Placeholder */}
        <div className="bg-slate-100/80 p-12 flex flex-col items-center justify-center min-h-[280px] relative border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-[#1a0b8c] flex items-center justify-center mb-4">
            <Presentation className="w-8 h-8" />
          </div>
          <div className="bg-[#1a0b8c] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            Speaker Placeholder
          </div>
        </div>

        {/* Kolom Kanan: Detail Seminar */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a0b8c] bg-indigo-50 px-3 py-1 rounded-md w-fit">
            <Calendar className="w-3.5 h-3.5" />
            SEMINAR NASIONAL 2026
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Masa Depan Teknologi di Era{" "}
            <span className="text-[#1a0b8c]">Budaya Digital</span>
          </h2>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Tanggal
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  12 September 2026
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Lokasi
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Universitas Amikom Purwokerto
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
