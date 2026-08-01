"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RegistrationStepper from "@/components/features/dashboard/RegistrationStepper";
import PromoBanner from "@/components/features/dashboard/PromoBanner";
import DeadlineCard from "@/components/features/dashboard/DeadlineCard";
import EmptyStateCard from "@/components/features/dashboard/EmptyStateCard";
import WelcomeModal from "@/components/features/dashboard/WelcomeModal";
import CompetitionCategoryModal from "@/components/features/dashboard/CompetitionCategoryModal";
import { useProfile } from "@/features/profile/hooks/use-profile";

export default function DashboardPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { data: profileResponse, isLoading } = useProfile();

  const user = profileResponse?.data?.user;
  const userName = user?.name || (user as any)?.fullName;

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
            {isLoading ? (
              <span className="inline-block w-48 h-9 bg-slate-200 animate-pulse rounded-lg" />
            ) : (
              `Halo, ${userName || "Peserta"}!`
            )}
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
            <DeadlineCard />
            <EmptyStateCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}
