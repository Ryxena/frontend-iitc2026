// components/features/auth/ForgotPasswordModal.tsx
"use client";

import { HelpCircle, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PANITIA_WA_NUMBER = "6285133711081"; // Format internasional tanpa simbol +
const WA_MESSAGE =
  "Halo Panitia IITC 2026, saya ingin meminta bantuan untuk mereset/mengganti password akun saya.";

export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const whatsappUrl = `https://wa.me/${PANITIA_WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl [&>button]:hidden flex flex-col">
        <DialogTitle className="hidden">Bantuan Lupa Password</DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#2F2FE4] shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Lupa Password?</h2>
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
        <div className="p-8 bg-slate-50/50 text-center space-y-3">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Untuk melakukan reset atau mengganti password baru, silakan hubungi
            nomor WhatsApp panitia resmi kami di bawah ini agar dapat segera
            dibantu:
          </p>
          <div className="py-2">
            <span className="inline-block text-lg font-bold text-[#2F2FE4] bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl">
              0851-3371-1081
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-6 h-11 rounded-xl"
          >
            Tutup
          </Button>
          <Button
            asChild
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 h-11 rounded-xl"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Hubungi Panitia via WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
