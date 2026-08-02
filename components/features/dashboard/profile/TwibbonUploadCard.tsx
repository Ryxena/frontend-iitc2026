"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

// Dibatasi png/jpg/jpeg aja,
const ACCEPTED_TWIBBON_TYPES = "image/jpeg,image/png";

interface TwibbonUploadCardProps {
  file: File | null;
  onSelectFile: (file: File) => void;
  // URL twibbon yang SUDAH tersimpan di server (dari GET /api/profile).
  // Dipakai buat preview awal sebelum user ganti file apa pun — sama
  // perannya kayak `avatarUrl` di ProfileAvatarCard.
  existingUrl?: string | null;
}

export default function TwibbonUploadCard({
  file,
  onSelectFile,
  existingUrl,
}: TwibbonUploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const localPreviewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  // Prioritas: file yang baru dipilih user > yang udah ada di server.
  const displayUrl = localPreviewUrl || existingUrl || null;

  const handleTriggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      if (selected) onSelectFile(selected);
      e.target.value = "";
    },
    [onSelectFile],
  );

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <p className="text-sm font-medium text-slate-700">
        Bukti Upload Twibbon <span className="text-red-500">*</span>
      </p>

      <button
        type="button"
        onClick={handleTriggerUpload}
        className="flex flex-1 w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-colors hover:border-[#2F2FE4] hover:bg-indigo-50/30"
      >
        {displayUrl ? (
          <>
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
              <Image
                src={displayUrl}
                alt="Bukti twibbon"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <p className="max-w-55 truncate text-sm font-semibold text-slate-900">
                {file ? file.name : "Twibbon tersimpan"}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Klik untuk ganti file
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
              <UploadCloud className="h-5 w-5 text-[#2F2FE4]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-[#2F2FE4]">
                Unggah Screenshot
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Instagram / Media sosial lainnya
              </p>
            </div>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TWIBBON_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
