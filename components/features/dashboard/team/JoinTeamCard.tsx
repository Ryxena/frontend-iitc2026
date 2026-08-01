"use client";

import { useState } from "react";
import { Key, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface JoinTeamCardProps {
  onJoin: (code: string) => void;
  isPending?: boolean;
}

export default function JoinTeamCard({ onJoin, isPending }: JoinTeamCardProps) {
  const [teamCode, setTeamCode] = useState("");
  const trimmedCode = teamCode.trim();

  const handleJoin = () => {
    if (!trimmedCode) return;
    onJoin(trimmedCode);
  };

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
          <Key className="w-6 h-6 text-[#a85914]" />
        </div>

        <div className="flex-1 space-y-3 mb-8">
          <h2 className="text-xl font-bold text-slate-900">Gabung ke Tim</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sudah memiliki tim? Masukkan kode undangan yang diberikan oleh ketua
            tim Anda untuk bergabung ke dalam ruang kerja mereka.
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="teamCode"
            className="text-xs font-semibold text-slate-700"
          >
            Kode Tim
          </Label>
          <div className="flex gap-3">
            <Input
              id="teamCode"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
              placeholder="MISAL: uq81hq71"
              disabled={isPending}
              className="h-11 border-slate-200 bg-slate-50 focus-visible:ring-[#2F2FE4] uppercase font-medium flex-1 disabled:opacity-50"
            />
            <Button
              onClick={handleJoin}
              disabled={!trimmedCode || isPending}
              variant="outline"
              className="h-11 px-8 border-[#2F2FE4] text-[#1a0b8c] hover:bg-indigo-50 font-semibold rounded-lg shrink-0 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Gabung"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
