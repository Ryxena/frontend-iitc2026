// components/features/dashboard/EmptyStateCard.tsx
import { Trophy, Users } from "lucide-react";

interface CompetitionInfo {
  name?: string;
  description?: string;
}

interface TeamInfo {
  name?: string;
  competition?: CompetitionInfo;
}

interface EmptyStateCardProps {
  team?: TeamInfo | null;
}

export default function EmptyStateCard({ team }: EmptyStateCardProps) {
  const competition = team?.competition;

  return (
    <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center py-8">
      {competition ? (
        // KONDISI: SUDAH MENGIKUTI LOMBA
        <div className="w-full space-y-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-7 h-7 text-[#2F2FE4]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
              Kompetisi Aktif
            </span>
            <h3 className="font-bold text-slate-900 text-base pt-1">
              {competition.name}
            </h3>
            {team?.name && (
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> Tim:{" "}
                <span className="font-semibold text-slate-700">
                  {team.name}
                </span>
              </p>
            )}
          </div>
        </div>
      ) : (
        // KONDISI: BELUM MENGIKUTI LOMBA (EMPTY STATE)
        <>
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-7 h-7 text-slate-400" />
          </div>

          <h3 className="font-semibold text-slate-900 text-sm mb-1">
            Kompetisi yang Diikuti
          </h3>
          <p className="text-xs text-slate-500 max-w-[200px]">
            Anda belum terdaftar di lomba apapun.
          </p>
        </>
      )}
    </div>
  );
}
