"use client";

import { UserPlus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CreateTeamCardProps {
  onClick?: () => void;
}

export default function CreateTeamCard({ onClick }: CreateTeamCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col h-full">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
          <UserPlus className="w-6 h-6 text-[#1a0b8c]" />
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-3 mb-8">
          <h2 className="text-xl font-bold text-slate-900">Buat Tim Baru</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Jadilah ketua tim. Anda akan membuat ruang kerja khusus untuk
            mendaftarkan anggota, memilih kategori kompetisi, dan mengelola
            pengumpulan karya.
          </p>
        </div>

        {/* Action Button */}
        <div>
          <Button
            onClick={onClick}
            className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium px-6 h-11 rounded-lg flex items-center gap-2 transition-all"
          >
            Buat Tim <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
