"use client";

import { motion } from "framer-motion";
import SeminarInfoCard from "@/components/features/dashboard/seminar/SeminarInfoCard";
import SeminarFormCard from "@/components/features/dashboard/seminar/SeminarFormCard";

export default function SeminarPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Header Page */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Pendaftaran Seminar
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Daftarkan diri Anda untuk mengikuti sesi wawasan teknologi terdepan.
        </p>
      </div>

      {/* Seminar Info Card */}
      <SeminarInfoCard />

      {/* Registration Form Card */}
      <SeminarFormCard />
    </motion.div>
  );
}
