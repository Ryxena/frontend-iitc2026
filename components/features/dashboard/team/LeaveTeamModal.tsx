"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { LeaveTeamModalProps } from "@/types/index";

export default function LeaveTeamModal({
  isOpen,
  onClose,
  onConfirm,
  teamName,
}: LeaveTeamModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-2xl border-none shadow-xl bg-white [&>button]:hidden">
        <DialogTitle className="hidden">Konfirmasi Keluar Tim</DialogTitle>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#b91c1c]">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Konfirmasi Keluar Tim</h2>
          </div>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Apakah Anda yakin ingin keluar dari Tim Majapahit Tech? Tindakan ini
            tidak dapat dibatalkan dan Anda harus diundang atau memasukan kode
            kembali untuk bergabung.
          </p>

          <div className="flex items-center justify-end gap-3 pt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold px-6 h-11"
            >
              Batal
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white font-medium px-6 h-11 rounded-lg"
            >
              Ya, Keluar Tim
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
