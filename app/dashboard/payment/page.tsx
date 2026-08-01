// app/(dashboard)/dashboard/payment/page.tsx
"use client";

import { motion } from "framer-motion";
import { Landmark, Wallet, Loader2 } from "lucide-react";

import LeaderAlert from "@/components/features/dashboard/payment/LeaderAlert";
import PaymentStatus from "@/components/features/dashboard/payment/PaymentStatus";
import PaymentMethod from "@/components/features/dashboard/payment/PaymentMethod";
import UploadProof from "@/components/features/dashboard/payment/UploadProof";
import PaymentInstructions from "@/components/features/dashboard/payment/PaymentInstructions";

// Import hooks
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import { useMyTeam } from "@/features/team/hooks/use-my-team";

export default function PaymentPage() {
  const { data: statusResponse, isLoading: isStatusLoading } =
    usePaymentStatus();

  // Ambil detail tim untuk mendapatkan harga kompetisi (true agar memicu fetch)
  const { data: teamDetailResponse, isLoading: isTeamLoading } =
    useMyTeam(true);

  // Data Pembayaran
  const paymentData = statusResponse?.data?.payment;
  const currentStatus = paymentData?.status;
  const rejectReason = paymentData?.reason;

  // Data Harga Lomba (Sesuaikan .price atau .fee dengan nama field dari API Laravel Anda)
  const competitionPrice = teamDetailResponse?.data?.team?.competition?.price;

  if (isStatusLoading || isTeamLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Memuat data
        pembayaran...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-6xl mx-auto space-y-8 relative z-10"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Pembayaran Registrasi
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Selesaikan pembayaran untuk memverifikasi pendaftaran tim Anda.
          </p>
        </div>

        <LeaderAlert />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PaymentStatus status={currentStatus} reason={rejectReason} />

            {/* Grid Kartu Metode Pembayaran disesuaikan menjadi 3 buah */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <PaymentMethod
                title="E-Wallet"
                provider="GOPAY"
                accountNumber="082137805336"
                accountName="Maylinda Eka Saputri"
                icon={Wallet}
              />
              <PaymentMethod
                title="Transfer Bank"
                provider="BRI"
                accountNumber="683901020736507"
                accountName="Maylinda Eka Saputri"
                icon={Landmark}
              />

              {/* Tambahkan div md:col-span-2 di sini agar memanjang di desktop */}
              <div className="md:col-span-2">
                <PaymentMethod
                  title="Transfer Bank"
                  provider="Seabank"
                  accountNumber="901912316510"
                  accountName="Tifa Fitriana"
                  icon={Landmark}
                />
              </div>
            </div>

            <UploadProof status={currentStatus} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* TERUSKAN HARGA LOMBA KE KOMPONEN INI */}
              <PaymentInstructions fee={competitionPrice} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
