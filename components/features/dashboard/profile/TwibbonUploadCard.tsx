// components/features/dashboard/profile/TwibbonUploadCard.tsx
"use client";

import { useRef } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";

interface TwibbonUploadCardProps {
  file: File | null;
  onSelectFile: (file: File) => void;
}

export default function TwibbonUploadCard({
  file,
  onSelectFile,
}: TwibbonUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      onSelectFile(selected);
    }
    e.target.value = "";
  };

  return (
    // UBAH: Gunakan gap-2 w-full alih-alih space-y-2
    <div className="flex flex-col gap-2 h-full w-full">
      <p className="text-sm font-medium text-slate-700">
        Bukti Upload Twibbon <span className="text-red-500">*</span>
      </p>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        // UBAH: Tambahkan min-h-[164px] agar konsisten
        className="flex-1 w-full min-h-[164px] border-2 border-dashed border-slate-200 hover:border-[#2F2FE4] rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-indigo-50/30 transition-colors"
      >
        {file ? (
          <>
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-900 truncate max-w-[220px]">
                {file.name}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Klik untuk ganti file
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-11 h-11 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <UploadCloud className="w-5 h-5 text-[#2F2FE4]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#2F2FE4]">
                Unggah Screenshot
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Instagram / Media sosial lainnya (Max 5MB)
              </p>
            </div>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
