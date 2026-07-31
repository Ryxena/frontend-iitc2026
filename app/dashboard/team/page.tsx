"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";

import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";
import ActiveTeamDashboard from "@/components/features/dashboard/team/ActiveTeamDashboard";
import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import type { Team } from "@/types/index";

// ============================================================================
// CATATAN PENTING — keterbatasan data yang tersedia dari API saat ini:
//
// GET /api/competitions/mine (dipakai untuk cek "user sudah punya tim atau
// belum") TIDAK mengembalikan siapa leader tim, kode undangan, atau daftar
// anggota. Endpoint itu cuma kasih ringkasan: teamId, competitionName,
// teamName, currentMembers, maxMembers, dst.
//
// Di struktur folder Postman kamu ada folder "Manage Team" dengan
// GET/POST/DELETE ke /api/teams/{teamId} yang KEMUNGKINAN BESAR itu endpoint
// detail tim (isinya leader, daftar member, kode undangan) — tapi belum ada
// di dokumentasi odt yang kamu kasih. Jadi:
//
// 1. Role (leader/member) di sini masih pakai WORKAROUND sessionStorage —
//    disimpan begitu user create/join tim di sesi browser INI. Ini TIDAK
//    reliable lintas device/browser, dan hilang kalau sessionStorage
//    di-clear. Ini bukan solusi permanen.
// 2. ActiveTeamDashboard masih nampilin kode undangan & daftar anggota versi
//    MOCK (data dummy) karena API yang dipanggil di sini belum bisa kasih
//    data itu.
//
// Begini bisa dituntaskan: share dokumentasi/contoh curl dari
// GET /api/teams/{teamId} (folder "Manage Team" di Postman), nanti bagian
// ini + ActiveTeamDashboard di-update supaya semuanya dari data asli.
// ============================================================================

function getStoredRole(teamId: number): "leader" | "member" | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem(`team-role:${teamId}`);
  return stored === "leader" || stored === "member" ? stored : null;
}

function storeRole(teamId: number, role: "leader" | "member") {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(`team-role:${teamId}`, role);
}

function TeamPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Ini yang dikirim dari CompetitionCategoryModal di Dashboard lewat
  // router.push(`/dashboard/team?competitionSlug=...`).
  const competitionSlug = searchParams.get("competitionSlug");

  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  const { data: myTeams, isLoading } = useMyCompetitions();
  const activeTeam = myTeams?.[0] ?? null;

  // "role" SENGAJA bukan useState. Nilainya murni turunan dari activeTeam +
  // sessionStorage — bisa dihitung langsung tiap render tanpa perlu
  // useEffect yang manggil setState (itu yang sebelumnya memicu warning
  // "Calling setState synchronously within an effect": dua useEffect saling
  // susul-menyusul cuma buat men-sinkronkan state React dengan dirinya
  // sendiri, padahal nilainya sudah bisa dihitung langsung).
  //
  // Default ke "member" kalau belum pernah disimpan sama sekali — lebih
  // aman daripada salah asumsi "leader" dan kasih akses hapus anggota ke
  // orang yang bukan ketua tim (lihat catatan besar di atas).
  const role: "leader" | "member" | null = activeTeam
    ? (getStoredRole(activeTeam.teamId) ?? "member")
    : null;

  // Effect yang tersisa CUMA menulis ke sessionStorage (sinkronisasi ke
  // sistem eksternal — ini memang tugas semestinya sebuah effect), BUKAN
  // memanggil setState. Supaya default "member" di atas benar-benar
  // ke-persist, bukan cuma nilai sementara pas render.
  useEffect(() => {
    if (activeTeam && getStoredRole(activeTeam.teamId) === null) {
      storeRole(activeTeam.teamId, "member");
    }
  }, [activeTeam]);

  const handleTeamCreated = (team: Team) => {
    storeRole(team.id, "leader");
    // Bersihkan query param supaya kalau user refresh, gak nyoba create tim
    // baru lagi buat competitionSlug yang sama.
    router.replace("/dashboard/team");
  };

  const handleTeamJoined = () => {
    // Query ["my-competitions"] sudah di-invalidate di dalam useJoinTeam,
    // jadi begitu refetch selesai, activeTeam otomatis ke-update dan "role"
    // di atas otomatis ikut terhitung ulang (default "member", lalu effect
    // di atas yang nyimpen ke sessionStorage). Gak perlu apa-apa lagi di sini.
  };

  const handleLeaveTeam = () => {
    if (activeTeam) {
      sessionStorage.removeItem(`team-role:${activeTeam.teamId}`);
    }
    // TODO: belum ada endpoint terdokumentasi untuk "keluar dari tim" /
    // "hapus tim" — tombol Keluar Tim di ActiveTeamDashboard masih
    // console.log doang. Perlu dokumentasi endpoint itu untuk wire beneran.
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] text-slate-400 text-sm">
        Memuat data tim...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center overflow-hidden">
      {!activeTeam && (
        <CreateTeamModal
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onCreateTeam={handleTeamCreated}
          competitionSlug={competitionSlug}
        />
      )}

      {activeTeam && role ? (
        <ActiveTeamDashboard
          teamName={activeTeam.teamName}
          role={role}
          onLeaveTeam={handleLeaveTeam}
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
                dari halaman Dashboard sebelum membuat tim baru. (Kalau Anda mau
                gabung tim yang sudah ada lewat kode undangan, ini tidak perlu.)
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <CreateTeamCard
                onClick={() => setIsCreateTeamOpen(true)}
                disabled={!competitionSlug}
              />
              <JoinTeamCard onJoin={handleTeamJoined} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function TeamPage() {
  // useSearchParams wajib dibungkus Suspense di App Router, kalau enggak
  // Next.js bakal warning/error saat build (khususnya untuk static
  // rendering) karena butuh tau kapan halaman ini boleh di-render statis.
  return (
    <Suspense fallback={null}>
      <TeamPageContent />
    </Suspense>
  );
}
