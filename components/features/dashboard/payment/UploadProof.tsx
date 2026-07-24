"use client";

import { useState } from "react";
import { CloudUpload, ArrowRight, FileUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UploadProof() {
  // State untuk menyimpan status file yang diunggah
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Simulasi pemilihan file (bisa diganti dengan <input type="file" /> aslinya)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-slate-900">
              Unggah Bukti Pembayaran
            </h3>
          </div>

          {/* Area Dropzone / Upload */}
          <div className="border-2 border-dashed border-blue-300 bg-[#f8faff] rounded-xl p-8 flex flex-col items-center justify-center text-center relative">
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*,application/pdf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Klik untuk memilih file"
            />

            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              {uploadedFile ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <CloudUpload className="w-6 h-6" />
              )}
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-1">
              {uploadedFile ? uploadedFile.name : "Tarik & Lepas file di sini"}
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              {uploadedFile
                ? "File berhasil dipilih. Siap untuk dikonfirmasi."
                : "atau klik untuk menelusuri komputer Anda (Maks. 5MB, JPG/PNG/PDF)"}
            </p>

            <Button
              variant="outline"
              className="pointer-events-none bg-white font-medium px-8 rounded-lg shadow-sm border-slate-200"
            >
              {uploadedFile ? "Ganti File" : "Pilih File"}
            </Button>
          </div>
        </div>

        {/* Footer Konfirmasi */}
        <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex justify-end">
          <Button
            // Tombol akan disabled (nonaktif/greyed out) jika uploadedFile masih bernilai null (kosong)
            disabled={!uploadedFile}
            className={`font-medium px-6 h-11 rounded-lg flex items-center gap-2 shadow-sm transition-all ${
              uploadedFile
                ? "bg-[#2e2be3] hover:bg-[#2523b8] text-white cursor-pointer"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Konfirmasi Pembayaran <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
