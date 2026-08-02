"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import maskotIITC from "@/public/Maskot2.svg";
import { Button } from "@/components/ui/button";

import ProfileTabs from "@/components/features/dashboard/profile/ProfileTabs";
import ProfileAvatarCard from "@/components/features/dashboard/profile/ProfileAvatarCard";
import ProfileInfoForm, {
  type ProfileFormValues,
} from "@/components/features/dashboard/profile/ProfileInfoForm";
import TwibbonUploadCard from "@/components/features/dashboard/profile/TwibbonUploadCard";
import MembershipStatusCard from "@/components/features/dashboard/profile/MembershipStatusCard";

export default function ProfilePage() {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [twibbonFile, setTwibbonFile] = useState<File | null>(null);

  const [formValues, setFormValues] = useState<ProfileFormValues>({
    fullName: "",
    institution: "",
    email: "",
    phone: "",
    nisnOrNim: "",
    gender: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChangeAvatar = (file: File) => {
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    // TODO: reset ke data asli dari server begitu sudah di-wire ke
    // useProfile(); untuk sekarang cukup reset password fields saja
    // (yang paling penting jangan ke-persist tanpa sengaja).
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // TODO: ganti dengan mutation asli begitu endpoint update profile
    // sudah terdokumentasi. Contoh nanti kira-kira:
    //
    // const form = new FormData();
    // form.append("name", formValues.fullName);
    // form.append("institution", formValues.institution);
    // ...
    // if (avatarFile) form.append("avatar", avatarFile);
    // if (twibbonFile) form.append("twibbon_proof", twibbonFile);
    // await updateProfileMutation.mutateAsync(form);

    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto space-y-6 pb-12"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Pengaturan Akun
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Kelola informasi personal Anda, keamanan akun, dan preferensi
          notifikasi untuk pengalaman kompetisi yang lebih baik di IITC 2026.
        </p>
      </div>

      <ProfileTabs activeTab="profil" />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Card utama: avatar + form data diri + twibbon + status */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
            <ProfileAvatarCard
              avatarUrl={avatarPreview}
              maskotFallback={maskotIITC.src}
              onChangeAvatar={handleChangeAvatar}
              onRemoveAvatar={handleRemoveAvatar}
            />

            <ProfileInfoForm values={formValues} onChange={setFormValues} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-stretch">
            <TwibbonUploadCard
              file={twibbonFile}
              onSelectFile={setTwibbonFile}
            />
            <MembershipStatusCard
              isVerified={true}
              competitionName="Mobile App Development"
              competitionSlug="mobile-app-development"
            />
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
            className="border-slate-200 text-slate-700 hover:bg-slate-50 font-medium h-11 px-6 rounded-lg"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium h-11 px-6 rounded-lg disabled:opacity-70"
          >
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
