"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  PenTool,
  Clapperboard,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ArrowDownLeft,
  Users,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import posterSeminar from "@/public/seminar-iitc2026.png";
import { useCompetitions } from "@/features/competition/hooks/use-competitions";

export default function Competitions() {
  const { data: competitions } = useCompetitions();

  function formatPrice(price: number | null | undefined, fallback: string): string {
    if (price === null || price === undefined || price === 0) {
      return fallback;
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  const webPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("web"))?.competitionPrice,
    "Rp 100.000"
  );

  const uiuxPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("ui"))?.competitionPrice,
    "Rp 100.000"
  );

  const genAiPrice = formatPrice(
    competitions?.find((c) => c.name.toLowerCase().includes("ai"))?.competitionPrice,
    "Rp 75.000"
  );

  const getGuidebookLink = (nameKeyword: string) => {
    const comp = competitions?.find((c) => c.name.toLowerCase().includes(nameKeyword.toLowerCase()));
    if (!comp) return "#";
    const link = (comp as any).guidebookLink || (comp as any).guideBookLink || (comp as any).guide_book_link || (comp as any).linkPanduan;
    return link || "#";
  };

  const webGuidebook = getGuidebookLink("web");
  const uiuxGuidebook = getGuidebookLink("ui");
  const genAiGuidebook = getGuidebookLink("ai");

  const getDeadline = (nameKeyword: string, fallback: string) => {
    const comp = competitions?.find((c) => c.name.toLowerCase().includes(nameKeyword.toLowerCase()));
    if (!comp) return fallback;
    const dl = (comp as any).deadline;
    if (!dl) return fallback;
    
    try {
      const date = new Date(dl);
      if (isNaN(date.getTime())) return dl;
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(date);
    } catch {
      return dl;
    }
  };

  const webDeadline = getDeadline("web", "22 Agt '26");
  const uiuxDeadline = getDeadline("ui", "22 Agt '26");
  const genAiDeadline = getDeadline("ai", "22 Agt 2026");

  return (
    <section id="kompetisi" className="w-full scroll-mt-24 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-bold">Kategori Kompetisi</h2>
          <p className="text-slate-500 mt-2">
            Pilih kategori yang sesuai dengan passion dan keahlian tim Anda.
          </p>
        </div>
        <div className="hidden sm:flex w-16 h-16 rounded-full border-2 border-dashed border-indigo-300 items-center justify-center shrink-0">
          <ArrowDownLeft className="w-6 h-6 text-indigo-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card Web Design */}
        <Card className="bg-[#F8FAFC] border-slate-200 overflow-hidden relative group rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-[1rem] rounded-br-[1rem] shadow-sm lg:col-span-3 md:col-span-1">
          <CardContent className="p-8 h-full flex flex-col justify-between min-h-[360px]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Web
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-3 z-10">
                <Badge className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2.5 text-[0.9rem] font-medium border-none shadow-sm">
                  {webPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> {webDeadline}
                </Badge>
              </div>
            </div>
            
            <p className="text-[0.95rem] text-slate-600 max-w-xl mb-6 relative z-10 leading-relaxed">
              Kembangkan website interaktif, edukatif, dan memukau secara visual sebagai media kampanye pelestarian bahasa daerah melalui inovasi digital.
            </p>
            
            <div className="mt-auto relative z-10 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">HTML</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">CSS</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">Tailwind</Badge>
              </div>
              <a href={webGuidebook} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit"
                >
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <Globe className="absolute -bottom-8 -right-8 w-60 h-60 text-slate-200/50 opacity-100 group-hover:scale-105 transition-transform duration-500" />
          </CardContent>
        </Card>

        {/* Card UI/UX Design */}
        <Card className="bg-[#1100C9] border-none text-white overflow-hidden relative group rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[1rem] rounded-bl-[1rem] shadow-sm lg:col-span-2 md:col-span-1">
          <CardContent className="p-8 h-full flex flex-col justify-between min-h-[360px]">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-extrabold leading-tight">
                UI/UX
                <br />
                Design
              </h3>
              <div className="flex flex-col items-end gap-3 z-10">
                <Badge className="bg-white hover:bg-slate-100 text-[#1100C9] rounded-full px-5 py-2.5 text-[0.9rem] font-medium border-none shadow-sm">
                  {uiuxPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-white/30 text-white rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> {uiuxDeadline}
                </Badge>
              </div>
            </div>
            
            <p className="text-[0.95rem] text-blue-100 max-w-sm mb-6 relative z-10 leading-relaxed">
              Ciptakan solusi desain yang intuitif dan estetik untuk memecahkan
              masalah pengguna.
            </p>
            
            <div className="mt-auto relative z-10 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="outline" className="bg-transparent border-white/40 text-white rounded-full font-medium px-5 py-2 text-[0.85rem]">
                  Figma
                </Badge>
                <Badge variant="outline" className="bg-transparent border-white/40 text-white rounded-full font-medium px-5 py-2 text-[0.85rem]">
                  Prototyping
                </Badge>
              </div>
              <a href={uiuxGuidebook} target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-[#1100C9] hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit">
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <PenTool className="absolute -bottom-8 -right-8 w-60 h-60 text-[#1D0CE8] opacity-100 group-hover:scale-105 transition-transform duration-500" />
          </CardContent>
        </Card>
      </div>

      {/* Card Gen AI */}
      <Card className="bg-[#F5EFE7] border-none overflow-hidden relative group rounded-t-[3.5rem] rounded-b-2xl shadow-sm">
        <CardContent className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="max-w-xl relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-3xl font-extrabold leading-tight mb-2 text-slate-900">
                  Gen AI
                  <br />
                  (AI Video Generation)
                </h3>
                <p className="text-[0.95rem] text-slate-600 mb-8 max-w-md leading-relaxed">
                  Ciptakan karya video inovatif menggunakan teknologi AI generatif
                  (Text-to-Video, Image-to-Video) yang memadukan unsur budaya
                  Indonesia.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2.5 mt-auto">
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">Midjourney</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">Runway</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">Sora</Badge>
              </div>
            </div>

            <div className="hidden md:block w-px self-stretch bg-[#EADCCB] mx-4" />

            <div className="flex flex-col items-start md:items-end justify-between gap-12 relative z-10 shrink-0 min-w-[220px]">
              <div className="flex flex-col items-end gap-3 w-full">
                <Badge className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5 py-2.5 text-[0.9rem] font-medium ml-auto border-none shadow-sm">
                  {genAiPrice}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-slate-400 text-slate-800 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium w-full justify-center md:justify-end"
                >
                  <Clock className="w-4 h-4 text-amber-600" /> Deadline: {genAiDeadline}
                </Badge>
              </div>
              
              <a href={genAiGuidebook} target="_blank" rel="noopener noreferrer" className="ml-auto">
                <Button variant="outline" className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2">
                  Lihat Guidebook <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
          <Clapperboard className="absolute -bottom-10 right-40 w-72 h-72 text-[#EADCCB]/50 opacity-100 group-hover:scale-105 transition-transform duration-500" />
        </CardContent>
      </Card>

      {/* Banner Seminar */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full bg-white border border-slate-200 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-[1rem] rounded-br-[1rem] overflow-hidden flex flex-col md:flex-row shadow-sm"
      >
        <div className="w-full md:w-[32%] lg:w-[28%] bg-linear-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center relative min-h-[320px] overflow-hidden border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size[16px_16px]"></div>
          
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-lg border-4 border-white/80 bg-white mb-4 mt-4">
              <Image
                src={posterSeminar}
                alt="Cendekia Luthfieta Nazalia, S.T."
                className="w-full h-full object-cover object-top scale-125 pt-4"
              />
            </div>
            <div className="bg-white/95 backdrop-blur-sm text-slate-900 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-md text-center max-w-[90%]">
              Cendekia Luthfieta Nazalia, S.T.
              <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                IT Edu Content Creator
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 lg:p-12 flex-1 flex flex-col justify-center gap-8">
          <div>
            <span className="flex items-center w-fit gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-md mb-3">
              <Calendar className="w-4 h-4" /> SEMINAR IITC 2026
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Kreatif dan Kritis di Era <span className="text-[#1100C9]">AI (Artificial Intelligence)</span>
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-8 md:gap-16">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Tanggal</p>
                <p className="text-[0.95rem] font-bold text-slate-900">
                  12 September 2026
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1100C9] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Lokasi</p>
                <p className="text-[0.95rem] font-bold text-slate-900">
                  Universitas Amikom Purwokerto
                </p>
              </div>
            </div>
          </div>

          {/* <Link href={"/register"} className="cursor-pointer"> */}
          <Button className="bg-[#2F2FE4] w-fit hover:bg-indigo-800 rounded-xl px-8 py-6 text-[0.95rem] font-semibold">
            Daftar Seminar
          </Button>
          {/* </Link> */}
        </div>
      </motion.div>
    </section>
  );
}
