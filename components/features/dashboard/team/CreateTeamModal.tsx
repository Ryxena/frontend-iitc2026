"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateTeamModalProps } from "@/types/index";

export default function CreateTeamModal({
  isOpen,
  onClose,
  onCreateTeam,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("");

  const handleCreate = () => {
    // Jika kosong, gunakan nama default sesuai placeholder desain
    const finalName = teamName.trim() === "" ? "Majapahit Tech" : teamName;
    onCreateTeam(finalName);
    setTeamName(""); // reset form
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-8 rounded-2xl border-none shadow-xl bg-white [&>button]:hidden">
        <DialogTitle className="hidden">Buat Tim Baru</DialogTitle>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
              Buat Tim Baru
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Silakan masukkan nama tim Anda untuk memulai kompetisi.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Label
              htmlFor="teamName"
              className="text-sm font-medium text-slate-900"
            >
              Nama Tim
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Masukkan nama tim (misal: Majapahit Tech)"
              className="h-12 bg-slate-50/50 border-slate-200 ring-1 focus-visible:ring-[#2F2FE4] text-slate-900"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-6">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-[#2F2FE4] hover:bg-indigo-50 hover:text-[#13076b] font-semibold px-6 h-11"
            >
              Batal
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-8 h-11 rounded-lg"
            >
              Buat Tim
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
