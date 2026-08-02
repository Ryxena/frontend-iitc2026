"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Copy, UserPlus, Info, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import RemoveMemberModal from "@/components/features/dashboard/team/RemoveMemberModal";
import LeaveTeamModal from "@/components/features/dashboard/team/LeaveTeamModal";
import { ActiveTeamDashboardProps } from "@/types/index";

// Import modular components dari folder active
import {
  LeaderOwnCard,
  RemovableMemberCard,
  EmptySlotCard,
  LeaderDisplayCard,
  TeammateCard,
} from "@/components/features/dashboard/team/active/TeamMemberCards";

const TEAM_MAX_SLOTS = 3;

type Member = {
  id: string | number;
  name: string;
  email: string;
  avatar?: string | null;
};
type Leader = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

export default function ActiveTeamDashboard({
  teamName,
  role,
  onLeaveTeam,
  teamCode,
  competitionName,
  guideBookUrl,
  leader,
  members = [],
  currentUserEmail,
  onRemoveMember,
  onDeleteTeam,
  isPendingAction,
}: ActiveTeamDashboardProps & {
  competitionName?: string;
  guideBookUrl?: string;
  teamCode?: string;
  leader?: Leader;
  members?: Member[];
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

  const isLeader = role === "leader";

  const handleCopyCode = () => {
    if (!teamCode) return;
    navigator.clipboard.writeText(teamCode);
    toast.success("Kode undangan berhasil disalin!");
  };

  const handleRemoveClick = (memberId: string | number) => {
    setSelectedMemberId(memberId);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedMemberId && onRemoveMember) {
      onRemoveMember(selectedMemberId);
    }
    setIsRemoveModalOpen(false);
    setSelectedMemberId(null);
  };

  const handleConfirmLeaveOrDelete = () => {
    setIsLeaveModalOpen(false);
    if (isLeader && onDeleteTeam) {
      onDeleteTeam();
    } else {
      onLeaveTeam();
    }
  };

  const totalOccupied = (leader ? 1 : 0) + members.length;
  const emptySlotsCount = Math.max(0, TEAM_MAX_SLOTS - totalOccupied);

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
              {isLeader
                ? "Kelola anggota tim Anda untuk mempersiapkan kompetisi."
                : "Kelola keanggotaan dan lihat informasi tim Anda."}
            </p>
          </div>

          {/* Tombol Download Guidebook */}
          {guideBookUrl && (
            <div className="shrink-0">
              <a
                href={guideBookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1a0b8c] border border-slate-200 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                <span>Download Guidebook</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* SECTION: KODE UNDANGAN (KHUSUS KETUA TIM) */}
        {isLeader && (
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
            {isLeader
              ? `Anggota Tim (${totalOccupied}/${TEAM_MAX_SLOTS})`
              : "Anggota Tim"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLeader ? (
              <>
                {leader && <LeaderOwnCard leader={leader} />}

                {members.map((member) => (
                  <RemovableMemberCard
                    key={member.id}
                    member={member}
                    isPendingAction={isPendingAction}
                    onRemoveClick={handleRemoveClick}
                  />
                ))}

                {Array.from({ length: emptySlotsCount }).map((_, index) => (
                  <EmptySlotCard key={`empty-slot-${index}`} />
                ))}
              </>
            ) : (
              <>
                {leader && <LeaderDisplayCard leader={leader} />}

                {members.map((member) => {
                  const isMe =
                    member.email?.toLowerCase().trim() ===
                    currentUserEmail?.toLowerCase().trim();

                  return (
                    <TeammateCard key={member.id} member={member} isMe={isMe} />
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* SECTION: PEMBERITAHUAN / ZONA BAHAYA */}
        {isLeader ? (
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
