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

// Metode pembayaran statis — ditaruh di luar komponen biar tidak
// dibuat ulang tiap render.
type PaymentMethodConfig = {
  title: string;
  provider: string;
  accountNumber: string;
  accountName: string;
  icon: typeof Wallet;
  fullWidth?: boolean;
};

const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    title: "E-Wallet",
    provider: "GOPAY",
    accountNumber: "082137805336",
    accountName: "Maylinda Eka Saputri",
    icon: Wallet,
  },
  {
    title: "Transfer Bank",
    provider: "BRI",
    accountNumber: "683901020736507",
    accountName: "Maylinda Eka Saputri",
    icon: Landmark,
  },
  {
    title: "Transfer Bank",
    provider: "Seabank",
    accountNumber: "901912316510",
    accountName: "Tifa Fitriana",
    icon: Landmark,
    fullWidth: true, // dapat class md:col-span-2
  },
];

// Pemetaan nama lomba -> link grup WhatsApp. Data-driven, jadi nambah
// lomba baru cukup nambah 1 entri di sini, tanpa nambah cabang if-else.
const WHATSAPP_GROUP_BY_COMPETITION: { keywords: string[]; url: string }[] = [
  {
    keywords: ["web design", "webdesign"],
    url: "https://chat.whatsapp.com/GPk3ial29LvHRkYGdNmIe3",
  },
  {
    keywords: ["ui/ux", "uiux", "ui"],
    url: "https://chat.whatsapp.com/HgPrSs3uZ32AYGCE8myQh4",
  },
  {
    keywords: ["gen ai", "genai", "ai"],
    url: "https://chat.whatsapp.com/HA3xyTpiNnuIsCPQFwEY3C",
  },
];

function getWhatsAppGroupUrl(competitionName?: string): string {
  if (!competitionName) return "#";
  const name = competitionName.toLowerCase();

  const match = WHATSAPP_GROUP_BY_COMPETITION.find((entry) =>
    entry.keywords.some((keyword) => name.includes(keyword)),
  );

  return match?.url ?? "#";
}

export default function PaymentPage() {
  const { data: statusResponse, isLoading: isStatusLoading } =
    usePaymentStatus();

  // Ambil detail tim untuk mendapatkan informasi kompetisi
  const { data: teamDetailResponse, isLoading: isTeamLoading } =
    useMyTeam(true);

  // Data Pembayaran
  const { status: currentStatus, reason: rejectReason } =
    statusResponse?.data?.payment ?? {};

  const isPaymentVerified = VERIFIED_STATUSES.includes(
    currentStatus?.toUpperCase() ?? "",
  );

  // Data Kompetisi & Harga Lomba
  const competition = teamDetailResponse?.data?.team?.competition;
  const competitionName = competition?.name || competition?.title || "";
  const competitionPrice = competition?.price;
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
              {PAYMENT_METHODS.map((method) => {
                const card = (
                  <PaymentMethod
                    title={method.title}
                    provider={method.provider}
                    accountNumber={method.accountNumber}
                    accountName={method.accountName}
                    icon={method.icon}
                  />
                );

                return method.fullWidth ? (
                  <div key={method.provider} className="md:col-span-2">
                    {card}
                  </div>
                ) : (
                  <div key={method.provider}>{card}</div>
                );
              })}
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
