"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SeminarFormCard() {
  const [category, setCategory] = useState("");

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl bg-white">
      <CardContent className="p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6">
          Formulir Pendaftaran
        </h3>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Nama Lengkap
              </Label>
              <Input
                placeholder="Masukkan nama lengkap"
                className="h-11 border-slate-200 bg-white"
              />
            </div>

            {/* Alamat Email */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Alamat Email
              </Label>
              <Input
                type="email"
                placeholder="contoh@email.com"
                className="h-11 border-slate-200 bg-white"
              />
            </div>

            {/* Nomor Telepon */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Nomor Telepon
              </Label>
              <Input
                placeholder="0812xxxxxx"
                className="h-11 border-slate-200 bg-white"
              />
            </div>

            {/* Institusi / Instansi */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Institusi / Instansi
              </Label>
              <Input
                placeholder="Asal sekolah atau instansi"
                className="h-11 border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Kategori Peserta */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Kategori Peserta
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11 w-full border-slate-200 bg-white">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peserta">Peserta</SelectItem>
                <SelectItem value="umum">Umum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tombol Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium h-12 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              Daftar Seminar Sekarang <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
