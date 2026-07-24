"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CreateTeamCard from "@/components/features/dashboard/team/CreateTeamCard";
import JoinTeamCard from "@/components/features/dashboard/team/JoinTeamCard";
import Image from "next/image";
import maskotIITC from "@/public/Maskot2.svg";
import CreateTeamModal from "@/components/features/dashboard/team/CreateTeamModal";
import ActiveTeamDashboard from "@/components/features/dashboard/team/ActiveTeamDashboard";

export default function TeamPage() {
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);

  // State untuk melacak Data Tim dan Role
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"leader" | "member" | null>(null);

  // Trigger saat user sukses membuat tim (Menjadi Ketua)
  const handleTeamCreated = (teamName: string) => {
    setActiveTeam(teamName);
    setUserRole("leader");
  };

  // Trigger saat user memasukkan kode dan sukses gabung (Menjadi Anggota)
  const handleTeamJoined = (teamCode: string) => {
    setActiveTeam("Majapahit Tech");
    setUserRole("member");
  };

  // Fungsi saat user berhasil keluar dari tim
  const handleLeaveTeam = () => {
    // Reset state kembali ke null agar tampilan kembali seperti awal
    setActiveTeam(null);
    setUserRole(null);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center overflow-hidden">
      {!activeTeam && (
        <CreateTeamModal
          isOpen={isCreateTeamOpen}
          onClose={() => setIsCreateTeamOpen(false)}
          onCreateTeam={handleTeamCreated}
        />
      )}

      {activeTeam && userRole ? (
        // DASHBOARD TIM AKTIF
        <ActiveTeamDashboard
          teamName={activeTeam}
          role={userRole}
          onLeaveTeam={handleLeaveTeam} // Kirimkan fungsi reset ke komponen ini
        />
      ) : (
        // TAMPILAN AWAL SEBELUM PUNYA TIM
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <CreateTeamCard onClick={() => setIsCreateTeamOpen(true)} />
              <JoinTeamCard onJoin={handleTeamJoined} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
