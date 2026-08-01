"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, UserPlus, Star, LogOut, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import RemoveMemberModal from "@/components/features/dashboard/team/RemoveMemberModal";
import LeaveTeamModal from "@/components/features/dashboard/team/LeaveTeamModal";
import { ActiveTeamDashboardProps } from "@/types/index";

export default function ActiveTeamDashboard({
  teamName,
  role,
  onLeaveTeam,
  teamCode,
  competitionName,
  leader,
  members = [],
  currentUserEmail,
  onRemoveMember,
  onDeleteTeam,
  isPendingAction,
}: ActiveTeamDashboardProps & {
  competitionName?: string;
  teamCode?: string;
  leader?: { id: number; name: string; email: string; avatar?: string };
  members?: Array<{ id: string | number; name: string; email: string }>;
  currentUserEmail?: string;
  onRemoveMember?: (memberId: string | number) => void;
  onDeleteTeam?: () => void;
  isPendingAction?: boolean;
}) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<
    string | number | null
  >(null);

  const handleCopyCode = () => {
    if (teamCode) {
      navigator.clipboard.writeText(teamCode);
      toast.success("Kode undangan berhasil disalin!");
    }
  };

  const handleConfirmRemove = () => {
    console.log(selectedMemberId);
    if (selectedMemberId && onRemoveMember) {
      onRemoveMember(selectedMemberId);
    }
    setIsRemoveModalOpen(false);
    setSelectedMemberId(null);
  };

  const handleConfirmLeaveOrDelete = () => {
    setIsLeaveModalOpen(false);
    if (role === "leader" && onDeleteTeam) {
      onDeleteTeam();
    } else {
      onLeaveTeam();
    }
  };

  const totalOccupied = (leader ? 1 : 0) + members.length;
  const maxSlots = 3;
  const emptySlotsCount = Math.max(0, maxSlots - totalOccupied);

  return (
    <>
      <RemoveMemberModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        teamName={teamName}
      />

      <LeaveTeamModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleConfirmLeaveOrDelete}
        teamName={teamName}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl mx-auto space-y-8 relative z-10"
      >
        {/* HEADER */}
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#1a0b8c]"></div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kategori Kompetisi
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#1a0b8c]">
              {competitionName || "Web Design"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Team {teamName}
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            {role === "leader"
              ? "Kelola anggota tim Anda untuk mempersiapkan kompetisi."
              : "Kelola keanggotaan dan lihat informasi tim Anda."}
          </p>
        </div>

        {/* SECTION: KODE UNDANGAN (KHUSUS KETUA TIM) */}
        {role === "leader" && (
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
                    {teamCode || "------"}
                  </span>
                </div>
                <Button
                  onClick={handleCopyCode}
                  className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium h-12 px-6 rounded-lg flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" /> Salin
                </Button>
              </div>
            </div>
            <div className="hidden md:flex w-32 h-32 rounded-full bg-slate-200/50 items-center justify-center shrink-0">
              <UserPlus className="w-10 h-10 text-slate-400" />
            </div>
          </div>
        )}

        {/* SECTION: DAFTAR ANGGOTA TIM */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-slate-900">
            {role === "leader"
              ? `Anggota Tim (${totalOccupied}/${maxSlots})`
              : "Anggota Tim"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* =========================================================
                RENDER UNTUK POV KETUA TIM (LEADER VIEW)
               ========================================================= */}
            {role === "leader" && (
              <>
                {/* 1. Card Ketua */}
                {leader && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full border-[3px] border-[#1a0b8c] overflow-hidden p-0.5">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.name}&backgroundColor=f1f5f9`}
                          alt={leader.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-6 bg-[#1a0b8c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white">
                        <Star className="w-3 h-3 fill-current" /> Ketua Tim
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {leader.name}
                    </h4>
                    <p className="text-sm text-slate-500">{leader.email}</p>
                  </div>
                )}

                {/* 2. Card Anggota */}
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm"
                  >
                    <div className="absolute top-4 right-4 bg-indigo-100 text-[#1a0b8c] text-[10px] font-bold px-3 py-1 rounded-full">
                      Anggota
                    </div>
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=f1f5f9`}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      {member.name}
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">
                      {member.email}
                    </p>

                    <div className="w-full border-t border-slate-100 pt-4 flex justify-center">
                      <button
                        disabled={isPendingAction}
                        onClick={() => {
                          setSelectedMemberId(member.id);
                          setIsRemoveModalOpen(true);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Keluarkan Anggota"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* 3. Slot Kosong (Menunggu Anggota) */}
                {Array.from({ length: emptySlotsCount }).map((_, index) => (
                  <div
                    key={`empty-slot-${index}`}
                    className="bg-transparent border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[220px]"
                  >
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
                ))}
              </>
            )}

            {/* =========================================================
                RENDER UNTUK POV ANGGOTA (MEMBER VIEW)
               ========================================================= */}
            {role === "member" && (
              <>
                {/* 1. Render Card Ketua Tim */}
                {leader && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.name}&backgroundColor=f1f5f9`}
                        alt={leader.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {leader.name}
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">
                      {leader.email}
                    </p>
                    <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-slate-500 fill-current" />{" "}
                      Ketua Tim
                    </div>
                  </div>
                )}

                {/* 2. Render Card Semua Anggota (termasuk User yang sedang login) */}
                {members.map((member) => {
                  const isMe =
                    member.email?.toLowerCase().trim() ===
                    currentUserEmail?.toLowerCase().trim();

                  return (
                    <div
                      key={member.id}
                      className={`bg-white rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm ${
                        isMe
                          ? "border-2 border-[#1a0b8c] shadow-md"
                          : "border border-slate-200"
                      }`}
                    >
                      {/* Badge ANDA jika ini akun yang sedang login */}
                      {isMe && (
                        <div className="absolute top-0 right-0 bg-[#1a0b8c] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-[14px]">
                          ANDA
                        </div>
                      )}

                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=f1f5f9`}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">
                        {member.name}
                      </h4>
                      <p className="text-sm text-slate-500 mb-4">
                        {member.email}
                      </p>

                      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full">
                        Anggota
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* SECTION: PEMBERITAHUAN / ZONA BAHAYA */}
        {role === "leader" ? (
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
        ) : (
          <div className="space-y-4 pt-4">
            <h3 className="font-bold text-lg text-red-500">Zona Bahaya</h3>
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Keluar dari Tim
                </h4>
                <p className="text-sm text-slate-600">
                  Tindakan ini tidak dapat dibatalkan. Anda harus diundang
                  kembali oleh Ketua Tim jika ingin bergabung ulang.
                </p>
              </div>
              <Button
                onClick={() => setIsLeaveModalOpen(true)}
                variant="outline"
                disabled={isPendingAction}
                className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 font-semibold px-6 h-11 shrink-0 flex items-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isPendingAction ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4" />
                )}
                Keluar Tim
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
