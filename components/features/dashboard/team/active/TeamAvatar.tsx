"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface TeamAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: string;
  className?: string;
}

export function TeamAvatar({
  name,
  avatarUrl,
  size = "w-20 h-20",
  className = "",
}: TeamAvatarProps) {
  const hasAvatar = avatarUrl && avatarUrl.trim() !== "";

  return (
    <div
      className={`relative overflow-hidden rounded-full flex items-center justify-center bg-slate-100 ${size} ${className}`}
    >
      {hasAvatar ? (
        <Image
          src={avatarUrl}
          alt={name}
          fill
          sizes="80px"
          className="object-cover"
        />
      ) : (
        <User className="w-1/2 h-1/2 text-slate-400" />
      )}
    </div>
  );
}
