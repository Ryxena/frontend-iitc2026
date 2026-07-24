"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTeamModal({
  isOpen,
  onClose,
}: CreateTeamModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-2xl border-none shadow-xl bg-white [&>button]:hidden">
        <DialogTitle className="hidden">Buat Tim Baru</DialogTitle>

        <div className="space-y-6">
          {/* Header & Deskripsi */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Buat Tim Baru
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Silakan masukkan nama tim Anda untuk memulai kompetisi.
            </p>
          </div>

          {/* Form Input */}
          <div className="space-y-2 pt-2">
            <Label
              htmlFor="teamName"
              className="text-sm font-medium text-slate-900"
            >
              Nama Tim
            </Label>
            <Input
              id="teamName"
              placeholder="Masukkan nama tim (misal: Majapahit Tech)"
              className="h-12 bg-slate-50/50 border-slate-200 focus-visible:ring-[#1a0b8c] text-slate-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-[#1a0b8c] hover:bg-indigo-50 hover:text-[#13076b] font-semibold px-6 h-11"
            >
              Batal
            </Button>
            <Button className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium px-8 h-11 rounded-lg">
              Buat Tim
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
