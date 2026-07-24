"use client";

import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function JoinTeamCard() {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col h-full">
        {/* Icon Container */}
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
          <Key className="w-6 h-6 text-[#a85914]" />
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-3 mb-8">
          <h2 className="text-xl font-bold text-slate-900">Gabung ke Tim</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Sudah memiliki tim? Masukkan kode undangan 6 digit yang diberikan
            oleh ketua tim Anda untuk bergabung ke dalam ruang kerja mereka.
          </p>
        </div>

        {/* Action Form */}
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
              placeholder="MISAL: A1B2C3"
              className="h-11 border-slate-200 bg-slate-50 focus-visible:ring-[#1a0b8c] uppercase font-medium flex-1"
              maxLength={6}
            />
            <Button
              variant="outline"
              className="h-11 px-8 border-[#1a0b8c] text-[#1a0b8c] hover:bg-indigo-50 font-semibold rounded-lg shrink-0"
            >
              Gabung
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
