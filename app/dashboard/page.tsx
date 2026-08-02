// app/(dashboard)/dashboard/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RegistrationStepper from "@/components/features/dashboard/RegistrationStepper";
import PromoBanner from "@/components/features/dashboard/PromoBanner";
import DeadlineCard from "@/components/features/dashboard/DeadlineCard";
import EmptyStateCard from "@/components/features/dashboard/EmptyStateCard";
import WelcomeModal from "@/components/features/dashboard/WelcomeModal";
import CompetitionCategoryModal from "@/components/features/dashboard/CompetitionCategoryModal";
import DashboardSkeleton from "@/components/features/dashboard/DashboardSkeleton";

// Import hook profil, tim, dan pembayaran
import { useProfile } from "@/features/profile/hooks/use-profile";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import type { ProfileDetail } from "@/types/profile-type";

interface ExtendedProfileUser {
  name?: string;
  email?: string;
  phone?: string;
  participant?: ProfileDetail & {
    institution?: string;
    gender?: string;
    twibbon?: string;
  };
}

interface ProfileResponseData {
  user?: ExtendedProfileUser;
}

export default function DashboardPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Ambil data user, tim, dan status pembayaran
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: teamResponse, isLoading: isTeamLoading } = useMyTeam(true);
  const { data: paymentResponse, isLoading: isPaymentLoading } =
    usePaymentStatus();

  const responseData = profileResponse?.data as ProfileResponseData | undefined;
  const user = responseData?.user;
  const participant = user?.participant;

  // Ekstrak nama
  const userName = user?.name || "Peserta IITC 2026";

  // Cek kelengkapan tahapan
  const isProfileComplete = Boolean(
    user?.name &&
    user?.phone &&
    participant?.institution &&
    participant?.gender &&
    participant?.twibbon,
  );

  const isTeamComplete = Boolean(teamResponse?.data?.team);

  // Cek apakah status pembayaran valid/sukses (sesuaikan string status dari backend, misal: "valid" / "success")
  const paymentStatus = paymentResponse?.data?.payment?.status;
  const isPaymentComplete =
    paymentStatus === "valid" ||
    paymentStatus === "success" ||
    paymentStatus === "VALID";

  if (isProfileLoading || isTeamLoading || isPaymentLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <WelcomeModal userName={userName} isProfileComplete={isProfileComplete} />
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
            Halo, {userName}!
          </h1>
          <p className="text-slate-500">Selamat datang di portal IITC 2026.</p>
        </div>

        {/* Kirim status pembayaran ke RegistrationStepper */}
        <RegistrationStepper
          isProfileComplete={isProfileComplete}
          isTeamComplete={isTeamComplete}
          isPaymentComplete={isPaymentComplete}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex">
            <PromoBanner
              onIkutiLombaClick={() => setIsCategoryModalOpen(true)}
            />
          </div>

          <div className="flex flex-col gap-6">
            <DeadlineCard
              label="Tenggat Waktu"
              title="Batas Akhir Pengumpulan Karya"
              startDate="2026-07-01"
              targetDate="2026-08-15"
            />
            <EmptyStateCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}
