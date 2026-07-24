"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, UserPlus, Star, LogOut, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import Modal Konfirmasi yang baru dibuat
import RemoveMemberModal from "@/components/features/dashboard/team/RemoveMemberModal";

interface ActiveTeamDashboardProps {
  teamName: string;
}

export default function ActiveTeamDashboard({
  teamName,
}: ActiveTeamDashboardProps) {
  // State untuk mengontrol Modal Konfirmasi Keluarkan Anggota
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  // Fungsi saat tombol keluarkan ditekan pada modal
  const handleConfirmRemove = () => {
    // Tambahkan logika penghapusan data anggota di sini (API call, dll)
    console.log("Anggota berhasil dikeluarkan dari tim", teamName);
    setIsRemoveModalOpen(false); // Tutup modal setelah selesai
  };

  return (
    <>
      {/* Panggil Modal Konfirmasi Di Sini */}
      <RemoveMemberModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        teamName={teamName}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto space-y-8 relative z-10"
      >
        {/* Header Halaman (Badge, Title, Deskripsi) */}
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#1a0b8c]"></div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kategori Kompetisi
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#1a0b8c]">
              Web Design
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Team {teamName}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Kelola anggota tim Anda untuk mempersiapkan kompetisi.
          </p>
        </div>

        {/* Card: Kode Undangan Tim */}
        <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2 text-slate-900">
              <Key className="w-5 h-5 text-[#1a0b8c]" />
              <h3 className="font-bold text-lg">Kode Undangan Tim</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Bagikan kode ini kepada calon anggota tim Anda agar mereka dapat
              bergabung. Satu tim maksimal terdiri dari 3 orang.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-slate-200/60 px-6 py-3 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold tracking-[0.2em] text-slate-800 uppercase">
                  A1B2C3D4
                </span>
              </div>
              <Button className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium h-12 px-6 rounded-lg flex items-center gap-2">
                <Copy className="w-4 h-4" /> Salin
              </Button>
            </div>
          </div>

          {/* Ikon Lingkaran Besar di Kanan */}
          <div className="hidden md:flex w-32 h-32 rounded-full bg-slate-200/50 items-center justify-center shrink-0">
            <UserPlus className="w-10 h-10 text-slate-400" />
          </div>
        </div>

        {/* Bagian Anggota Tim */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-slate-900">
            Anggota Tim (1/3)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Ketua Tim (Anda) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full border-[3px] border-[#1a0b8c] overflow-hidden p-0.5">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad&backgroundColor=f1f5f9"
                    alt="Ahmad"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-6 bg-[#1a0b8c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white">
                  <Star className="w-3 h-3 fill-current" /> Ketua Tim
                </div>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Ahmad</h4>
              <p className="text-sm text-slate-500">ahmad@example.com</p>
            </div>

            {/* Card 2: Anggota */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
              <div className="absolute top-4 right-4 bg-indigo-100 text-[#1a0b8c] text-[10px] font-bold px-3 py-1 rounded-full">
                Anggota
              </div>
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Siti&backgroundColor=f1f5f9"
                  alt="Siti"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Siti</h4>
              <p className="text-sm text-slate-500 mb-4">siti@example.com</p>

              <div className="w-full border-t border-slate-100 pt-4 flex justify-center">
                {/* Trigger Modal Pada Tombol Ini */}
                <button
                  onClick={() => setIsRemoveModalOpen(true)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Keluarkan Anggota"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Card 3: Empty State (Menunggu) */}
            <div className="bg-transparent border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <UserPlus className="w-6 h-6 text-slate-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 mb-1">
                Menunggu Anggota...
              </h4>
              <p className="text-xs text-slate-400">
                Bagikan kode tim untuk mengundang.
              </p>
            </div>
          </div>
        </div>

        {/* Alert / Notice Penting */}
        <div className="bg-[#fff8f3] border border-[#ffdac1] rounded-xl p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-[#92400e] mb-1">Penting</h4>
            <p className="text-sm text-[#b45309] leading-relaxed">
              Tim tidak dapat mengikuti tahap selanjutnya jika jumlah anggota
              belum memenuhi syarat (minimal 1, maksimal 3). Pastikan seluruh
              anggota telah melengkapi profil mereka.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
