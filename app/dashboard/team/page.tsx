"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";

export default function TeamPage() {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center overflow-hidden">
      {/* Panggil Modal di Sini */}
      <CreateTeamModal
        isOpen={isCreateTeamOpen}
        onClose={() => setIsCreateTeamOpen(false)}
      />

      {/* BACKGROUND WATERMARK ILUSTRASI */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <Image
            src={maskotIITC}
            alt="Maskot IITC"
            fill
            className="object-contain p-2"
          />
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto space-y-10 relative z-10"
      >
        {/* Header Page */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Manajemen Tim
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Mulai kolaborasi dengan tim Anda. Buat tim baru sebagai ketua atau
            gabung menggunakan kode undangan.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Kirim aksi klik pembuka modal ke komponen Card */}
          <CreateTeamCard onClick={() => setIsCreateTeamOpen(true)} />
          <JoinTeamCard />
        </div>
      </motion.div>
    </div>
  );
}
