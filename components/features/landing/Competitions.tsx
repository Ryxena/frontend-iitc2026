"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  PenTool,
  Clapperboard,
  Presentation,
  MapPin,
  Calendar,
  Clock,
  Download,
  ArrowDownLeft,
  Users,
  Mic,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Competitions() {
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
                  Rp 100.000
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-blue-200 text-blue-600 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> 22 Agt &apos;26
                </Badge>
              </div>
            </div>
            
            <p className="text-[0.95rem] text-slate-600 max-w-xl mb-6 relative z-10 leading-relaxed">
              Rancang antarmuka web yang responsif, modern, dan berfokus pada
              pengalaman pengguna yang inklusif.
            </p>
            
            <div className="mt-auto relative z-10 space-y-6">
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">HTML</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">CSS</Badge>
                <Badge variant="outline" className="bg-white border-slate-200 text-slate-700 rounded-full font-medium px-4 py-2 text-[0.85rem]">Tailwind</Badge>
              </div>
              <Button
                variant="outline"
                className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit"
              >
                Unduh Guidebook <Download className="w-4 h-4" />
              </Button>
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
                  Rp 100.000
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-white/30 text-white rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium"
                >
                  <Clock className="w-4 h-4" /> 22 Agt &apos;26
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
              <Button className="bg-white text-[#1100C9] hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 w-fit">
                Guidebook <Download className="w-4 h-4" />
              </Button>
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
                  Rp 75.000
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-transparent border-slate-400 text-slate-800 rounded-full px-5 py-2.5 flex items-center gap-1.5 text-[0.9rem] font-medium w-full justify-center md:justify-end"
                >
                  <Clock className="w-4 h-4 text-amber-600" /> Deadline: 22 Agt 2026
                </Badge>
              </div>
              
              <Button variant="outline" className="bg-transparent border-slate-800 text-slate-900 hover:bg-slate-100 rounded-xl px-6 py-6 font-semibold flex items-center gap-2 ml-auto">
                Unduh Guidebook <Download className="w-4 h-4" />
              </Button>
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
        <div className="w-full md:w-[32%] lg:w-[28%] bg-[#F4F6FB] flex flex-col items-center justify-center gap-6 py-12 px-6 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
          <div className="relative">
            <Users className="w-20 h-20 text-[#1100C9]" />
            <Mic className="w-7 h-7 text-[#1100C9] absolute -right-4 -top-2" />
          </div>
          <Badge className="bg-[#1100C9] hover:bg-[#1100C9]/90 text-white rounded-full px-5 py-2 font-medium border-none shadow-sm text-sm">
            Speaker Placeholder
          </Badge>
        </div>

        <div className="p-8 md:p-10 lg:p-12 flex-1 flex flex-col justify-center gap-8">
          <div>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#2F2FE4] mb-3">
              <Calendar className="w-4 h-4" /> Seminar Nasional 2026
            </span>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
              Masa Depan Teknologi di Era <span className="text-[#1100C9]">Budaya Digital</span>
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
