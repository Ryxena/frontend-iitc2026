"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Info,
  FileText,
  CheckCircle2,
  PlusCircle,
  Link as LinkIcon,
  Lock,
  Users,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import SuccessModal from "@/components/features/dashboard/submission/SuccessModal";

export default function UploadWorkPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [driveLink, setDriveLink] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (driveLink.trim() !== "") {
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl mx-auto space-y-10 relative z-10 pb-12"
      >
        {/* Header Page */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Unggah Karya
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Silakan unggah tautan karya tim Anda untuk tahap penjurian.
          </p>
        </div>

        {/* Alert Khusus Ketua Tim */}
        <div className="w-full bg-[#f0f4ff] border border-[#d6e0ff] rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <div className="mt-0.5">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-blue-700 mb-1">
              Hanya Ketua Tim
            </h4>
            <p className="text-sm text-slate-600">
              Hanya Ketua Tim yang dapat mengunggah link karya. Pastikan link
              yang Anda masukkan sudah final.
            </p>
          </div>
        </div>

        {/* 1. KATEGORI: WEB DESIGN */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">Web Design :</h3>
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <FileText className="w-5 h-5 text-[#1a0b8c]" />
                <h4 className="font-bold text-base">Persyaratan File</h4>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Proposal Karya</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Surat Pernyataan Orisinalitas (Format PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Dokumentasi Teknis{" "}
                      <span className="text-slate-400">(Opsional)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      File besar/aset khusus{" "}
                      <span className="text-slate-400">
                        (Jika tidak bisa di GitHub)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. KATEGORI: GEN AI */}
        {/* <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">GenAI :</h3>
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-base">Persyaratan File</h4>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Proposal Karya</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Surat Pernyataan Orisinalitas (format PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Dokumentasi Teknis (opsional).</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Video Showcase (format MP4).</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* 3. KATEGORI: UI/UX */}
        {/* <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-800">UI/UX :</h3>
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-slate-900">
                <LayoutGrid className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-base">Persyaratan File</h4>
              </div>

              <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                <p className="text-sm text-slate-600 font-medium">
                  Pastikan folder Google Drive Anda berisi file berikut:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Proposal Karya</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Surat Pernyataan Orisinalitas (format PDF)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Prototype Figma/Lainya (format LINK)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-700">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Video Showcase (format MP4).</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* FORM INPUT LINK & TOMBOL SIMPAN */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="driveLink"
                  className="text-sm font-bold text-slate-900"
                >
                  Link Google Drive Karya
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="driveLink"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-[#1a0b8c] text-slate-900"
                  />
                </div>
              </div>

              {/* Tombol Simpan Link dengan kondisi Disabled */}
              <Button
                type="submit"
                disabled={!driveLink.trim()}
                className={`font-medium px-8 h-12 rounded-xl shadow-sm transition-all ${
                  driveLink.trim()
                    ? "bg-[#1a0b8c] hover:bg-[#13076b] text-white cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                Simpan Link &rarr;
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Card Bawah: Catatan Akses Google Drive */}
        <Card className="border-dashed border-2 border-slate-200 shadow-none rounded-2xl bg-[#fafafa]">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Akses Google Drive</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pastikan link Google Drive Anda disetel ke &quot;Public&quot;
                atau &quot;Anyone with the link&quot; agar juri dapat mengakses
                dan menilai karya Anda tanpa hambatan.
              </p>

              <div className="inline-flex items-center gap-2 bg-slate-200/60 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Anyone with the link</span>
                <span className="text-emerald-600 font-bold ml-1">
                  &rarr; Viewer
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
