"use client";

import { Star, LogOut, UserPlus } from "lucide-react";
import { TeamAvatar } from "./TeamAvatar";

type Member = {
  id: string | number;
  name: string;
  email: string;
  avatar?: string | null;
};
type Leader = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

export function LeaderOwnCard({ leader }: { leader: Leader }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full border-[3px] border-[#1a0b8c] overflow-hidden p-0.5">
          <TeamAvatar
            name={leader.name}
            avatarUrl={leader.avatar}
            size="w-full h-full"
            className="rounded-full"
          />
        </div>
        <div className="absolute -top-2 -right-6 bg-[#1a0b8c] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-white">
          <Star className="w-3 h-3 fill-current" /> Ketua Tim
        </div>
      </div>
      <h4 className="text-lg font-bold text-slate-900">{leader.name}</h4>
      <p className="text-sm text-slate-500">{leader.email}</p>
    </div>
  );
}

export function RemovableMemberCard({
  member,
  isPendingAction,
  onRemoveClick,
}: {
  member: Member;
  isPendingAction?: boolean;
  onRemoveClick: (memberId: string | number) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
      <div className="absolute top-4 right-4 bg-indigo-100 text-[#1a0b8c] text-[10px] font-bold px-3 py-1 rounded-full">
        Anggota
      </div>
      <TeamAvatar
        name={member.name}
        avatarUrl={member.avatar}
        className="mb-4"
      />
      <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
      <p className="text-sm text-slate-500 mb-4">{member.email}</p>

      <div className="w-full border-t border-slate-100 pt-4 flex justify-center">
        <button
          disabled={isPendingAction}
          onClick={() => onRemoveClick(member.id)}
          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 cursor-pointer"
          title="Keluarkan Anggota"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export function EmptySlotCard() {
  return (
    <div className="bg-transparent border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-55">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <UserPlus className="w-6 h-6 text-slate-400" />
      </div>
      <h4 className="text-sm font-bold text-slate-700 mb-1">
        Menunggu Anggota...
      </h4>
      <p className="text-xs text-slate-400">
        Bagikan kode tim untuk mengundang.
      </p>
    </div>
  );
}

export function LeaderDisplayCard({ leader }: { leader: Leader }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm">
      <TeamAvatar
        name={leader.name}
        avatarUrl={leader.avatar}
        className="mb-4"
      />
      <h4 className="text-lg font-bold text-slate-900 mb-1">{leader.name}</h4>
      <p className="text-sm text-slate-500 mb-4">{leader.email}</p>
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 text-slate-500 fill-current" /> Ketua Tim
      </div>
    </div>
  );
}

export function TeammateCard({
  member,
  isMe,
}: {
  member: Member;
  isMe: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 flex flex-col items-center text-center relative shadow-sm ${
        isMe ? "border-2 border-[#1a0b8c] shadow-md" : "border border-slate-200"
      }`}
    >
      {isMe && (
        <div className="absolute top-0 right-0 bg-[#1a0b8c] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-[14px]">
          ANDA
        </div>
      )}
      <TeamAvatar
        name={member.name}
        avatarUrl={member.avatar}
        className="mb-4"
      />
      <h4 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h4>
      <p className="text-sm text-slate-500 mb-4">{member.email}</p>
      <div className="bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full">
        Anggota
      </div>
    </div>
  );
}
