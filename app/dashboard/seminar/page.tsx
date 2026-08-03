"use client";

import { motion } from "framer-motion";
import SeminarInfoCard from "@/components/features/dashboard/seminar/SeminarInfoCard";

export default function SeminarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-10 relative z-10 pb-12"
    >
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Pendaftaran Seminar
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Daftarkan diri Anda untuk mengikuti sesi wawasan teknologi terdepan.
        </p>
      </div>

      <SeminarInfoCard />
    </motion.div>
  );
}
