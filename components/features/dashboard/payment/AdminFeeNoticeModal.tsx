// components/features/dashboard/payment/PaymentFeeNoticeModal.tsx
"use client";

import { Info, Wallet, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AdminFeeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitionName: string;
  fee?: number | null;
}

export default function AdminFeeNoticeModal({
  isOpen,
  onClose,
  competitionName,
  fee,
}: AdminFeeNoticeModalProps) {
  // Format harga ke Rupiah
  const formattedFee = fee
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(fee)
    : "Rp 0";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl [&>button]:hidden flex flex-col">
        <DialogTitle className="hidden">
          Informasi Biaya Pendaftaran
        </DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#2F2FE4] shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Informasi Pembayaran
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-600"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-slate-50/50 space-y-5">
          <div className="text-center space-y-1">
            <p className="text-slate-500 text-sm font-medium">
              Biaya Pendaftaran Lomba
            </p>
            <p className="text-lg font-bold text-[#2F2FE4]">
              {competitionName}
            </p>
            <div className="inline-block bg-white border border-slate-200 text-slate-900 font-extrabold px-6 py-3 rounded-xl text-3xl shadow-sm mt-3">
              {formattedFee}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 mt-4 text-left">
            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Pemberitahuan:</strong> Nominal di atas belum termasuk
              biaya admin transfer antar bank atau e-wallet. Segala bentuk{" "}
              <strong>biaya admin ditanggung oleh peserta</strong>. Pastikan
              nominal yang ditransfer utuh sesuai dengan biaya pendaftaran.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-slate-100 flex justify-end">
          <Button
            onClick={onClose}
            className="w-full bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl"
          >
            Saya Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
