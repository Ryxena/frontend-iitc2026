// components/features/dashboard/submission/SuccessModal.tsx
"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-120 p-8 rounded-2xl border-none shadow-2xl bg-white [&>button]:hidden flex flex-col items-center text-center">
        <DialogTitle className="hidden">
          Link Karya Berhasil Disimpan
        </DialogTitle>

        {/* Ikon Sukses */}
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-6 h-6 stroke-3" />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="space-y-2 mb-8 max-w-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Link Karya Berhasil Disimpan
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Link Google Drive karya tim Anda telah berhasil disimpan. Anda masih
            dapat mengubah link ini selama masa pendaftaran belum berakhir.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col w-full gap-3">
          <Button
            onClick={onClose}
            className="w-full bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium h-12 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
