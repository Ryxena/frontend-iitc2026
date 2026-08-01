// app/(dashboard)/dashboard/payment/page.tsx
"use client";

import { motion } from "framer-motion";
import { Landmark, Wallet, Loader2 } from "lucide-react";

import LeaderAlert from "@/components/features/dashboard/payment/LeaderAlert";
import PaymentStatus from "@/components/features/dashboard/payment/PaymentStatus";
import PaymentMethod from "@/components/features/dashboard/payment/PaymentMethod";
import UploadProof from "@/components/features/dashboard/payment/UploadProof";
import PaymentInstructions from "@/components/features/dashboard/payment/PaymentInstructions";
import WhatsAppGroupCard from "@/components/features/dashboard/payment/WhatsAppGroupCard";

// Import hooks
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import { useMyTeam } from "@/features/team/hooks/use-my-team";

// Status yang dianggap "lolos verifikasi"
const VERIFIED_STATUSES = ["VALID", "ACCEPTED", "SUCCESS"];

// Fungsi helper untuk mencocokkan nama lomba dengan link grup WhatsApp
const getWhatsAppGroupUrl = (competitionName?: string) => {
  if (!competitionName) return "#";
  const name = competitionName.toLowerCase();

  if (name.includes("web design") || name.includes("webdesign")) {
    return "https://chat.whatsapp.com/GPk3ial29LvHRkYGdNmIe3";
  }
  if (name.includes("ui/ux") || name.includes("uiux") || name.includes("ui")) {
    return "https://chat.whatsapp.com/HgPrSs3uZ32AYGCE8myQh4";
  }
  if (
    name.includes("gen ai") ||
    name.includes("genai") ||
    name.includes("ai")
  ) {
    return "https://chat.whatsapp.com/HA3xyTpiNnuIsCPQFwEY3C";
  }
  return "#"; // Fallback jika tidak cocok
};

export default function PaymentPage() {
  const { data: statusResponse, isLoading: isStatusLoading } =
    usePaymentStatus();

  // Ambil detail tim untuk mendapatkan informasi kompetisi
  const { data: teamDetailResponse, isLoading: isTeamLoading } =
    useMyTeam(true);

  // Data Pembayaran
  const paymentData = statusResponse?.data?.payment;
  const currentStatus = paymentData?.status;
  const rejectReason = paymentData?.reason;

  const isPaymentVerified = VERIFIED_STATUSES.includes(
    currentStatus?.toUpperCase() ?? "",
  );

  // Data Kompetisi & Harga Lomba
  const competition = teamDetailResponse?.data?.team?.competition;
  const competitionName = competition?.name || competition?.title || "";
  const competitionPrice = competition?.price;

  // Tentukan link WhatsApp berdasarkan nama kompetisi tim
  const whatsappGroupUrl = getWhatsAppGroupUrl(competitionName);

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

            {/* WhatsApp Card muncul otomatis dengan link sesuai lomba setelah terverifikasi */}
            {isPaymentVerified && (
              <WhatsAppGroupCard groupUrl={whatsappGroupUrl} />
            )}

            {/* Grid Kartu Metode Pembayaran */}
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
              <PaymentInstructions fee={competitionPrice} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
