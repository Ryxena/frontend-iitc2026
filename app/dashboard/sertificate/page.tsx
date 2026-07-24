"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CertificateCard from "@/components/features/dashboard/certificate/CertificateCard";
import CertificateLockedModal from "@/components/features/dashboard/certificate/CertificateLockedModal";

export default function CertificatePage() {
  const [isLockedModalOpen, setIsLockedModalOpen] = useState(true);

  return (
    <>
      {/* Panggil Modal Terkunci */}
      <CertificateLockedModal
        isOpen={isLockedModalOpen}
        onClose={() => setIsLockedModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto space-y-8 pb-12"
      >
        {/* Header Bagian Atas */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#1a0b8c] shadow-sm">
            <Award className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Selamat & Terima Kasih!
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Selamat atas pencapaian Anda! Terima kasih telah berpartisipasi
              dan berkontribusi dalam memajukan inovasi teknologi berbasis
              warisan budaya di IITC 2026.
            </p>
          </div>
        </div>

        {/* Komponen Kartu Sertifikat */}
        <CertificateCard />
      </motion.div>
    </>
  );
}
