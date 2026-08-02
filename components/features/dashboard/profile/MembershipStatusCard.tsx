// components/features/dashboard/profile/MembershipStatusCard.tsx
"use client";

import Link from "next/link";
import { BadgeCheck, UserCheck } from "lucide-react";

interface MembershipStatusCardProps {
  isVerified: boolean;
  competitionName?: string | null;
  competitionSlug?: string | null;
}

export default function MembershipStatusCard({
  isVerified,
  competitionName,
  competitionSlug,
}: MembershipStatusCardProps) {
  return (
    <div className="space-y-2 h-full flex flex-col">
      <p className="text-sm font-medium text-slate-700">Status Keanggotaan</p>

      <div
        // TAMBAHKAN flex flex-col di sini agar bisa mengatur tinggi konten di dalamnya
        className={`rounded-xl border overflow-hidden flex-1 flex flex-col ${
          isVerified ? "border-indigo-200" : "border-slate-200"
        }`}
      >
        {/* Strip header — shrink-0 memastikan header tidak ikut memanjang */}
        <div
          className={`px-5 py-3 border-b shrink-0 ${
            isVerified
              ? "bg-indigo-100 border-indigo-200"
              : "bg-slate-100 border-slate-200"
          }`}
        >
          <div
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${
              isVerified ? "text-[#2F2FE4]" : "text-slate-500"
            }`}
          >
            <BadgeCheck className="w-4 h-4" />
            {isVerified ? "Status Terverifikasi" : "Belum Terverifikasi"}
          </div>
        </div>

        {/* Body — TAMBAHKAN flex-1, flex flex-col, justify-center */}
        {/* Agar putihnya memenuhi sisa tinggi card dan konten berada persis di tengah */}
        <div className="p-5 bg-white flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                isVerified ? "bg-[#1a0b8c]" : "bg-slate-300"
              }`}
            >
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {isVerified ? "Peserta Aktif" : "Belum Terdaftar Lomba"}
              </p>
              {isVerified && competitionName ? (
                <p className="text-xs text-slate-500">
                  Kategori:{" "}
                  <Link
                    href={
                      competitionSlug
                        ? `/dashboard/team?competitionSlug=${competitionSlug}`
                        : "/dashboard/team"
                    }
                    className="text-[#2F2FE4] font-semibold hover:underline"
                  >
                    {competitionName}
                  </Link>
                </p>
              ) : (
                !isVerified && (
                  <p className="text-xs text-slate-500">
                    Bergabung atau buat tim untuk mulai berkompetisi.
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
