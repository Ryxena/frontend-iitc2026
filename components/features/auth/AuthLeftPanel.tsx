"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoIITC2026 from "@/public/Logo-IITC2026.svg";
import maskotIITC from "@/public/Maskot2.svg";

export default function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#f6f6f8] relative p-12 text-center overflow-hidden">
      {/* Aksen Garis Gradien di Atas Sesuai Desain */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#210cae] via-[#945293] to-[#f39c6b]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col items-center justify-center w-full max-w-md"
      >
        {/* TEMPAT LOGO IITC */}
        <div className="w-64 h-24 mb-12 flex items-center justify-center rounded-xl ">
          <Image
            src={logoIITC2026}
            alt="Logo IITC2026"
            width={240}
            height={80}
            className="h-full w-auto"
          />
        </div>

        {/* TEMPAT ILUSTRASI MASKOT */}
        <div className="relative w-80 h-80  flex items-center justify-center rounded-3xl  mb-12 overflow-hidden">
          <Image
            src={maskotIITC}
            alt="Maskot IITC"
            fill
            className="object-cover scale-110"
          />
        </div>

        {/* Teks Deskripsi */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-[#210cae]">IITC 2026</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Melestarikan warisan nusantara melalui inovasi teknologi masa depan.
            Bergabunglah dengan ribuan inovator lainnya.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
