// components/features/dashboard/seminar/SeminarNotOpenModal.tsx
"use client";

import { AlertCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SeminarNotOpenModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
}

export default function SeminarNotOpenModal({
  isOpen,
  onClose,
  startDate,
}: SeminarNotOpenModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl flex flex-col">
        <DialogTitle className="hidden">Pendaftaran Belum Dibuka</DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Pendaftaran Belum Dibuka
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-slate-50/50 text-center space-y-4">
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Mohon maaf, pendaftaran untuk seminar ini belum dibuka. Pendaftaran
            seminar akan dibuka pada tanggal:
          </p>
          <div className="inline-block bg-indigo-50 border border-indigo-100 text-[#2F2FE4] font-bold px-4 py-2.5 rounded-xl text-base shadow-xs">
            {startDate}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white border-t border-slate-100 flex justify-end">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#2F2FE4] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-xl"
          >
            Mengerti
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
