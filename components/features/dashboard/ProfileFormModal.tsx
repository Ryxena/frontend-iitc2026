"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

import {
  updateProfileSchema,
  type UpdateProfileSchemaInput,
} from "@/lib/schemas/profile.schema";
import { useUpdateProfile } from "@/features/profile/hooks/use-update-profile";
import { useProfile } from "@/features/profile/hooks/use-profile";
import type { ApiErrorResponse } from "@/types/profile-type";

interface ProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatImageUrl(url: string | null | undefined): string {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (trimmed.length === 0) return "";
  if (
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }
  const cleanPath = trimmed.startsWith("/") ? trimmed.slice(1) : trimmed;
  return `https://intermediaiitc.com/public/${cleanPath}`;
}

export default function ProfileFormModal({
  isOpen,
  onClose,
}: ProfileFormModalProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [twibbonPreview, setTwibbonPreview] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const { data: profileResponse, isLoading: isFetchingProfile } = useProfile();
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileSchemaInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      grade: "pelajar",
      institution: "",
      student_id_number: "",
      gender: "male",
      phone: "",
    },
  });

  // Pre-fill form when profile data is fetched from GET /api/profile
  useEffect(() => {
    if (profileResponse?.data?.user) {
      const u = profileResponse.data.user;
      const p = u.participant;
      const uObj = u as unknown as Record<string, unknown>;

      setUserEmail(u.email || (uObj?.email as string) || "");

      const rawGender = (p?.gender || uObj?.gender || "").toString().toLowerCase();
      const normalizedGender =
        rawGender === "female" || rawGender === "perempuan" ? "female" : "male";

      const studentId = (
        p?.student_id_number ??
        uObj?.student_id_number ??
        ""
      ).toString();

      reset({
        fullName: u.name ?? (uObj?.fullName as string) ?? "",
        phone: u.phone ? String(u.phone) : "",
        grade: "pelajar",
        institution: p?.institution ?? (uObj?.institution as string) ?? "",
        student_id_number: studentId,
        gender: normalizedGender,
      });

      const initialAvatar =
        p?.avatar ||
        p?.photo_identity ||
        (uObj?.avatar as string) ||
        (uObj?.photo_identity as string);
      const initialTwibbon = p?.twibbon || (uObj?.twibbon as string);

      if (initialAvatar && typeof initialAvatar === "string") {
        setAvatarPreview(initialAvatar);
      }
      if (initialTwibbon && typeof initialTwibbon === "string") {
        setTwibbonPreview(initialTwibbon);
      }
    }
  }, [profileResponse, reset]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "avatar" | "twibbon",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(field, file, { shouldValidate: true });
      const objectUrl = URL.createObjectURL(file);
      if (field === "avatar") {
        if (avatarPreview && avatarPreview.startsWith("blob:")) {
          URL.revokeObjectURL(avatarPreview);
        }
        setAvatarPreview(objectUrl);
      } else {
        if (twibbonPreview && twibbonPreview.startsWith("blob:")) {
          URL.revokeObjectURL(twibbonPreview);
        }
        setTwibbonPreview(objectUrl);
      }
    }
  };

  const removeFile = (field: "avatar" | "twibbon") => {
    setValue(field, null, { shouldValidate: true });
    if (field === "avatar") {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(null);
    } else {
      if (twibbonPreview && twibbonPreview.startsWith("blob:")) {
        URL.revokeObjectURL(twibbonPreview);
      }
      setTwibbonPreview(null);
    }
  };

  const onSubmit = (data: UpdateProfileSchemaInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    updateProfileMutation.mutate(
      {
        fullName: data.fullName,
        grade: "pelajar",
        institution: data.institution,
        student_id_number: data.student_id_number,
        gender: data.gender,
        phone: data.phone,
        avatar: data.avatar ?? null,
        twibbon: data.twibbon ?? null,
      },
      {
        onSuccess: (res) => {
          setSuccessMessage(res.message || "Profil berhasil diperbarui!");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 4000);
        },
        onError: (err: unknown) => {
          const apiErr = err as { response?: { data?: ApiErrorResponse } };
          setErrorMessage(
            apiErr?.response?.data?.message ||
              "Gagal memperbarui profil. Silakan periksa kembali data Anda.",
          );
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-none w-screen h-[100dvh] m-0 p-0 rounded-none border-none bg-slate-50 flex flex-col overflow-hidden [&>button]:hidden"
      >
        <DialogTitle className="hidden">Lengkapi Profil Form</DialogTitle>

        {/* Custom Header (Fixed di atas) */}
        <header className="px-6 md:px-12 py-5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 shadow-sm z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
              Lengkapi Profil
            </h2>
            <p className="text-sm text-slate-500 hidden md:block">
              Harap isi data diri Anda dengan benar sesuai identitas asli.
            </p>
          </div>

          {/* Tombol Close Silang */}
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-600 transition-colors border-none outline-none focus:outline-none focus:ring-0 cursor-pointer"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Area Konten Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-fit">
            <div className="px-6 md:px-10 py-8">
              {isFetchingProfile ? (
                <div className="py-16 text-center space-y-4">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                  <p className="text-slate-500 text-sm font-medium">
                    Memuat data profil Anda...
                  </p>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                  {/* Alert Notifikasi */}
                  <AnimatePresence mode="wait">
                    {successMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm font-medium"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{successMessage}</span>
                      </motion.div>
                    )}

                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm font-medium"
                      >
                        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Grid 2 Kolom untuk Input Teks */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
                    {/* Kolom Kiri */}
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Masukkan nama lengkap"
                          {...register("fullName")}
                          className="h-11 border-slate-200 w-full focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-rose-500 mt-1">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={userEmail}
                          readOnly
                          className="h-11 w-full bg-slate-50 border-slate-200 text-slate-500 focus-visible:ring-0 cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Contoh: 081234567890"
                          {...register("phone")}
                          className="h-11 border-slate-200 w-full focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.phone && (
                          <p className="text-xs text-rose-500 mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          Jenjang / Status <span className="text-red-500">*</span>
                        </Label>
                        <input type="hidden" value="pelajar" {...register("grade")} />
                        <Input
                          value="SMA / SMK Sederajat"
                          readOnly
                          disabled
                          className="h-11 w-full bg-slate-100 text-slate-400 border-slate-200 font-medium cursor-not-allowed select-none focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    {/* Kolom Kanan */}
                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          Asal Sekolah / Instansi{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Contoh: Universitas Amikom Purwokerto"
                          {...register("institution")}
                          className="h-11 border-slate-200 w-full focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.institution && (
                          <p className="text-xs text-rose-500 mt-1">
                            {errors.institution.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium text-slate-700">
                          NISN / NIM / No. Kartu Pelajar <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          placeholder="Masukkan NISN atau NIM"
                          {...register("student_id_number")}
                          className="h-11 border-slate-200 w-full focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {errors.student_id_number && (
                          <p className="text-xs text-rose-500 mt-1">
                            {errors.student_id_number.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 pt-1">
                        <Label className="text-sm font-medium text-slate-700 block">
                          Jenis Kelamin <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-6 pt-1">
                          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              value="male"
                              {...register("gender")}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                            Laki-laki
                          </label>
                          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              value="female"
                              {...register("gender")}
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                            Perempuan
                          </label>
                        </div>
                        {errors.gender && (
                          <p className="text-xs text-rose-500 mt-1">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Grid 2 Kolom untuk Area Upload */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    {/* Avatar Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700 block">
                        Foto Profil (Avatar)
                      </Label>
                      {avatarPreview ? (
                        <div className="relative w-full h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group">
                          <img
                            src={formatImageUrl(avatarPreview)}
                            alt="Preview Avatar"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile("avatar")}
                            className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-rose-600 text-white rounded-full transition shadow-md"
                            title="Hapus foto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition text-center p-4">
                          <UploadCloud className="w-8 h-8 text-indigo-500 mb-2" />
                          <span className="text-xs font-semibold text-slate-700">
                            Klik untuk unggah Avatar
                          </span>
                          <span className="text-[11px] text-slate-400 mt-1">
                            PNG, JPG, WEBP maks. 5MB
                          </span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "avatar")}
                          />
                        </label>
                      )}
                      {errors.avatar && (
                        <p className="text-xs text-rose-500 mt-1">
                          {errors.avatar.message as string}
                        </p>
                      )}
                    </div>

                    {/* Twibbon Upload */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700 block">
                        Bukti Upload Twibbon
                      </Label>
                      {twibbonPreview ? (
                        <div className="relative w-full h-44 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center group">
                          <img
                            src={formatImageUrl(twibbonPreview)}
                            alt="Preview Twibbon"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile("twibbon")}
                            className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-rose-600 text-white rounded-full transition shadow-md"
                            title="Hapus twibbon"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/30 transition text-center p-4">
                          <UploadCloud className="w-8 h-8 text-indigo-500 mb-2" />
                          <span className="text-xs font-semibold text-slate-700">
                            Klik untuk unggah Twibbon
                          </span>
                          <span className="text-[11px] text-slate-400 mt-1">
                            PNG, JPG, WEBP maks. 5MB
                          </span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/webp"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, "twibbon")}
                          />
                        </label>
                      )}
                      {errors.twibbon && (
                        <p className="text-xs text-rose-500 mt-1">
                          {errors.twibbon.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer (Action Buttons) */}
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="border-slate-300 text-slate-700 hover:text-slate-900 font-medium px-6 h-11"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateProfileMutation.isPending}
                      className="bg-[#1a0b8c] hover:bg-[#13076b] text-white font-medium px-6 h-11 shadow-sm flex items-center gap-2"
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Menyimpan...</span>
                        </>
                      ) : (
                        <span>Simpan Perubahan</span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
