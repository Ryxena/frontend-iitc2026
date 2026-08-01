"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RegistrationStepper from "@/components/features/dashboard/RegistrationStepper";
import PromoBanner from "@/components/features/dashboard/PromoBanner";
import DeadlineCard from "@/components/features/dashboard/DeadlineCard";
import EmptyStateCard from "@/components/features/dashboard/EmptyStateCard";
import WelcomeModal from "@/components/features/dashboard/WelcomeModal";
import CompetitionCategoryModal from "@/components/features/dashboard/CompetitionCategoryModal";

export default function DashboardPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  return (
    <>
      <WelcomeModal />
      <CompetitionCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Halo, Ahmad!
          </h1>
          <p className="text-slate-500">
            Selamat datang di portal kompetisi Heritage Tech.
          </p>
        </div>

        <RegistrationStepper />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex">
            <PromoBanner
              onIkutiLombaClick={() => setIsCategoryModalOpen(true)}
            />
          </div>

          <div className="flex flex-col gap-6">
            {/* Ubah props di sini dengan menggunakan tanggal */}
            <DeadlineCard
              label="Tenggat Waktu"
              title="Batas Akhir Pengumpulan Karya"
              startDate="2026-07-01" // Contoh: Tanggal dibuka
              targetDate="2026-08-15" // Contoh: Tanggal ditutup
            />
            <EmptyStateCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}
