"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";

const ACCEPTED_AVATAR_TYPES = "image/jpeg,image/png,image/gif";

interface ProfileAvatarCardProps {
  avatarUrl: string | null;
  maskotFallback: string;
  onChangeAvatar: (file: File) => void;
  onRemoveAvatar: () => void;
}

export default function ProfileAvatarCard({
  avatarUrl,
  maskotFallback,
  onChangeAvatar,
  onRemoveAvatar,
}: ProfileAvatarCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTriggerUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onChangeAvatar(file);
      }
      e.target.value = ""; // Reset value agar file yang sama bisa diunggah ulang
    },
    [onChangeAvatar],
  );

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="relative w-40 h-40 rounded-full border-2 border-[#2F2FE4] overflow-hidden bg-indigo-50 flex items-center justify-center">
          <Image
            src={avatarUrl || maskotFallback}
            alt="Foto Profil"
            fill
            className="object-cover"
          />
        </div>

        <button
          type="button"
          onClick={handleTriggerUpload}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#1a0b8c] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#13076b] cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5" /> Ganti Foto
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_AVATAR_TYPES}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-6 space-y-1">
        <p className="text-sm font-semibold text-slate-900">Foto Profil</p>
        <button
          type="button"
          onClick={onRemoveAvatar}
          className="text-sm font-medium text-red-500 transition-colors hover:text-red-600 cursor-pointer"
        >
          Hapus Foto
        </button>
        <p className="text-xs text-slate-400">Format: JPG, PNG. Max 2MB.</p>
      </div>
    </div>
  );
}
