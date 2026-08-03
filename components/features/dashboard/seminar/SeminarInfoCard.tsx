import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeminarInfoCardProps } from "@/types";
import Image from "next/image";
import posterSeminar from "@/public/seminar-iitc2026.png";

// Ambil dari file .env, berikan fallback URL jika belum diset
const DEFAULT_GFORM_URL =
  process.env.NEXT_PUBLIC_SEMINAR_GFORM_URL ??
  "https://iitc.intermediaamikom.org/";

export default function SeminarInfoCard({
  gformUrl = DEFAULT_GFORM_URL,
}: SeminarInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-0 grid grid-cols-1 lg:grid-cols-5">
        {/* Kolom Kiri: Foto Pembicara dari Poster */}
        <div className="bg-linear-to-br from-amber-500 to-orange-600 lg:col-span-2 mx-4 rounded-xl p-6 flex flex-col items-center justify-center relative min-h-80 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size[16px_16px]"></div>

          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white/80 bg-white mb-4">
              <Image
                src={posterSeminar}
                alt="Cendekia Luthfieta Nazalia, S.T."
                className="w-full h-full object-cover object-top scale-125 pt-4"
              />
            </div>
            <div className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md text-center max-w-[85%]">
              Cendekia Luthfieta Nazalia, S.T.
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                IT Edu Content Creator
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Detail Seminar */}
        <div className="p-8 flex flex-col justify-center space-y-5 lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a0b8c] bg-indigo-50 px-3 py-1 rounded-md">
              <Calendar className="w-3.5 h-3.5" />
              SEMINAR IITC 2026
            </div>
            <span className="bg-orange-100 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-md">
              GRATIS (UMUM)
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Kreatif dan Kritis di Era{" "}
            <span className="text-[#1a0b8c]">AI (Artificial Intelligence)</span>
          </h2>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Waktu & Tanggal
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Sabtu, 12 September 2026
                </p>
                <p className="text-xs text-slate-500">08:00 WIB - Selesai</p>
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
                  Aula FBIS, Universitas Amikom Purwokerto
                </p>
              </div>
            </div>
          </div>

          {/* Tombol Direct ke Google Form */}
          <div className="pt-2">
            <a
              href={gformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto"
            >
              <Button className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors">
                Daftar Seminar Sekarang <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
