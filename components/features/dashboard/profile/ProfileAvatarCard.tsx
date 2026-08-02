"use client";

import { useRef } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChangeAvatar(file);
    }
    // Reset value supaya user bisa pilih file yang sama lagi kalau perlu
    // (mis. abis hapus foto, mau upload ulang file yang sama persis).
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="w-40 h-40 rounded-full border-2 border-[#2F2FE4] overflow-hidden bg-indigo-50 flex items-center justify-center relative">
          <Image
            src={avatarUrl || maskotFallback}
            alt="Foto Profil"
            fill
            className="object-cover"
          />
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1a0b8c] hover:bg-[#13076b] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
        >
          <Pencil className="w-3.5 h-3.5" /> Ganti Foto
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-6 space-y-1">
        <p className="text-sm font-semibold text-slate-900">Foto Profil</p>
        <button
          type="button"
          onClick={onRemoveAvatar}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Hapus Foto
        </button>
        <p className="text-xs text-slate-400">Format: JPG, PNG. Max 2MB.</p>
      </div>
    </div>
  );
}
