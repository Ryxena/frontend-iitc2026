// app/(dashboard)/dashboard/team/page.tsx
"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";
import { toast } from "sonner";

import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";
import ActiveTeamDashboard from "@/components/features/dashboard/team/ActiveTeamDashboard";

// Hooks
import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import {
  useJoinTeam,
  getJoinTeamErrorMessage,
} from "@/features/team/hooks/use-join-team"; // IMPORT HOOK JOIN TEAM
import {
  useDeleteTeam,
  useLeaveTeam,
  useRemoveMember,
  getManageTeamErrorMessage,
} from "@/features/team/hooks/use-manage-team";

import { useProfile } from "@/features/profile/hooks/use-profile";

function TeamPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const competitionSlug = searchParams.get("competitionSlug");

  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  // 1. Ambil data profil user untuk menentukan email (Leader / Member)
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const userEmail = profileResponse?.data?.user?.email;

  // 2. Cek apakah user punya tim (dari summary data)
  const { data: myTeamsSummary, isLoading: isSummaryLoading } =
    useMyCompetitions();

  let hasTeam = false;
  if (Array.isArray(myTeamsSummary)) {
    hasTeam = myTeamsSummary.length > 0;
  } else if (myTeamsSummary && typeof myTeamsSummary === "object") {
    const summaryData = myTeamsSummary as { data?: unknown[] };
    hasTeam = Array.isArray(summaryData.data) && summaryData.data.length > 0;
  }

  // 3. Jika punya tim, Fetch data detailnya
  const { data: teamDetailResponse, isLoading: isDetailLoading } =
    useMyTeam(hasTeam);

  const teamDetail = teamDetailResponse?.data;
  const team = teamDetail?.team;
  const members = team?.members;
  const competition = team?.competition?.name;

  // Hooks Mutasi
  const deleteMutation = useDeleteTeam();
  const leaveMutation = useLeaveTeam();
  const removeMutation = useRemoveMember();
  const joinMutation = useJoinTeam(); // INISIALISASI MUTASI JOIN TEAM

  const leaderEmail = team?.leader?.email?.toLowerCase().trim();
  const activeUserEmail = userEmail?.toLowerCase().trim();

  const role: "leader" | "member" =
    leaderEmail && activeUserEmail && leaderEmail === activeUserEmail
      ? "leader"
      : "member";

  const handleTeamCreated = () => router.replace("/dashboard/team");

  // FUNGSI UTAMA KETIKA TOMBOL GABUNG DIKLIK
  const handleTeamJoined = (code: string) => {
    joinMutation.mutate(
      { code },
      {
        onSuccess: () => {
          toast.success("Berhasil bergabung ke dalam tim!");
        },
        onError: (error) => {
          toast.error(getJoinTeamErrorMessage(error));
        },
      },
    );
  };

  const handleLeaveTeam = () => {
    leaveMutation.mutate(undefined, {
      onSuccess: () => toast.success("Berhasil keluar dari tim."),
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  const handleDeleteTeam = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => toast.success("Tim berhasil dihapus."),
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  const handleRemoveMember = (memberId: string | number) => {
    removeMutation.mutate(memberId, {
      onSuccess: () => toast.success("Anggota berhasil dikeluarkan."),
      onError: (error) => toast.error(getManageTeamErrorMessage(error)),
    });
  };

  if (isSummaryLoading || isDetailLoading || isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] text-slate-400 text-sm">
        Memuat data...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center overflow-hidden">
      {!hasTeam && (
        <CreateTeamModal
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onCreateTeam={handleTeamCreated}
          competitionSlug={competitionSlug}
        />
      )}
      {hasTeam && team ? (
        <ActiveTeamDashboard
          teamName={team.name}
          role={role}
          teamCode={team.code}
          competitionName={competition?.name}
          leader={team.leader}
          members={members}
          currentUserEmail={userEmail} // <-- TERUSKAN EMAIL INI KE DASHBOARD
          onLeaveTeam={handleLeaveTeam}
          onDeleteTeam={handleDeleteTeam}
          onRemoveMember={handleRemoveMember}
          isPendingAction={
            deleteMutation.isPending ||
            leaveMutation.isPending ||
            removeMutation.isPending
          }
        />
      ) : (
        <>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none z-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <Image
                src={maskotIITC}
                alt="Maskot IITC"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl mx-auto space-y-10 relative z-10"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Manajemen Tim
              </h1>
              <p className="text-slate-500 text-sm md:text-base">
                Mulai kolaborasi dengan tim Anda. Buat tim baru sebagai ketua
                atau gabung menggunakan kode undangan.
              </p>
            </div>

            {!competitionSlug && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                Anda belum memilih lomba. Silakan pilih lomba terlebih dahulu
                dari halaman Dashboard sebelum membuat tim baru.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <CreateTeamCard
                onClick={() => setIsCreateTeamOpen(true)}
                disabled={!competitionSlug}
              />
              <JoinTeamCard
                onJoin={handleTeamJoined}
                isPending={joinMutation.isPending}
              />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  return (
    <Suspense fallback={null}>
      <TeamPageContent />
    </Suspense>
  );
}
