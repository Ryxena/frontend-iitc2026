"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, PenTool, Bot } from "lucide-react";
import { CompetitionCategoryModalProps } from "@/types/index";

export default function CompetitionCategoryModal({
  isOpen,
  onClose,
}: CompetitionCategoryModalProps) {
  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: "web-design",
      title: "Web Design",
      badge: "Tim (2-3 org)",
      desc: "Rancang antarmuka web modern yang menggabungkan estetika budaya lokal dengan pengalaman pengguna yang optimal.",
      icon: LayoutTemplate,
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      badge: "Tim (2-3 org)",
      desc: "Ciptakan solusi produk digital yang memecahkan masalah nyata melalui riset mendalam dan desain yang intuitif.",
      icon: PenTool,
    },
    {
      id: "gen-ai",
      title: "Gen AI (Video)",
      badge: "Individu",
      desc: "Eksplorasi kreativitas tanpa batas dengan menghasilkan video inovatif menggunakan teknologi Generative AI terkini.",
      icon: Bot,
    },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setTimeout(() => setSelectedCategory(null), 300); // Reset pilihan saat ditutup
        }
      }}
    >
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white rounded-2xl border-none shadow-2xl">
        <DialogTitle className="hidden">Pilih Kategori Lomba</DialogTitle>

        {/* Header Modal */}
        <div className="px-8 py-6 border-b border-slate-100 pr-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">
            Pilih Kategori Lomba
          </h2>
          <p className="text-sm text-slate-500">
            Tentukan bidang keahlian yang ingin Anda ikuti.
          </p>
        </div>

        {/* Body: Daftar Card Kategori */}
        <div className="p-8 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((item) => {
              const isSelected = selectedCategory === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`flex flex-col bg-white border-2 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-[#1a0b8c] shadow-md ring-4 ring-indigo-50"
                      : "border-slate-100 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  {/* Ilustrasi Card atas */}
                  <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                    {/* Efek aksen diagonal di background */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:20px_20px]"></div>
                    <item.icon
                      className={`w-12 h-12 relative z-10 transition-transform duration-300 ${isSelected ? "text-[#1a0b8c] scale-110" : "text-[#2e2be3] group-hover:scale-110"}`}
                    />
                  </div>

                  {/* Konten Text */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <span className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                      {item.desc}
                    </p>

                    {/* Tombol Pilih dalam Card */}
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`w-full font-semibold h-10 ${
                        isSelected
                          ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white border-transparent"
                          : "border-[#1a0b8c] text-[#1a0b8c] hover:bg-indigo-50"
                      }`}
                    >
                      {isSelected ? "Terpilih" : "Pilih Kategori"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 flex items-center justify-end gap-3 bg-white border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#1a0b8c] hover:text-[#13076b] hover:bg-indigo-50 font-bold px-6 h-11"
          >
            Batal
          </Button>
          <Button
            disabled={!selectedCategory}
            className={`font-medium px-8 h-11 shadow-sm transition-colors ${
              selectedCategory
                ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Lanjutkan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
