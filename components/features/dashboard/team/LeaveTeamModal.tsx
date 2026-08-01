"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { LeaveTeamModalProps } from "@/types/index";

export default function LeaveTeamModal({
  isOpen,
  onClose,
  onConfirm,
  teamName,
  role = "member",
  isLoading = false,
}: LeaveTeamModalProps) {
  const isLeader = role === "leader";
  const titleText = isLeader ? "Konfirmasi Hapus Tim" : "Konfirmasi Keluar Tim";
  const descriptionText = isLeader
    ? `Apakah Anda yakin ingin menghapus Tim "${teamName}"? Tindakan ini tidak dapat dibatalkan, tim akan dibubarkan dan seluruh anggota akan dikeluarkan dari tim.`
    : `Apakah Anda yakin ingin keluar dari Tim "${teamName}"? Tindakan ini tidak dapat dibatalkan dan Anda harus diundang atau memasukkan kode kembali untuk bergabung.`;
  const confirmButtonText = isLeader ? "Ya, Hapus Tim" : "Ya, Keluar Tim";

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? undefined : onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-2xl border-none shadow-xl bg-white [&>button]:hidden">
        <DialogTitle className="hidden">{titleText}</DialogTitle>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-[#b91c1c]">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <h2 className="text-xl font-semibold">{titleText}</h2>
          </div>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {descriptionText}
          </p>

          <div className="flex items-center justify-end gap-3 pt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
              className="text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold px-6 h-11"
            >
              Batal
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className="bg-[#b91c1c] hover:bg-[#991b1b] text-white font-medium px-6 h-11 rounded-lg flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{confirmButtonText}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
