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
  Loader2,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import SuccessModal from "@/components/features/dashboard/submission/SuccessModal";

// Cek eksistensi tim (ringan) + detail lengkap tim (leader, members,
// submissionLink, competition) + profil user yang login.
import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import {
  useUpdateTeam,
  getUpdateTeamErrorMessage,
} from "@/features/team/hooks/use-update-team";

export default function UploadWorkPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 1. Cek dulu (ringan) apakah user punya tim sama sekali — pola yang sama
  //    dipakai di dashboard/team/page.tsx, biar dua halaman ini konsisten
  //    caranya nge-gate query detail yang lebih berat.
  const { data: myTeamsSummary, isLoading: isSummaryLoading } =
    useMyCompetitions();
  const hasTeam = Array.isArray(myTeamsSummary) && myTeamsSummary.length > 0;

  // 2. Baru fetch detail lengkap kalau memang ada tim. Detail ini yang
  //    punya leader.email, submissionLink, dan competition lengkap
  //    (slug, name, price, description, deadline) — data yang gak ada
  //    di useMyCompetitions.
  const { data: teamDetailResponse, isLoading: isDetailLoading } =
    useMyTeam(hasTeam);
  const team = teamDetailResponse?.data?.team;

  // 3. Profil user yang login — dipakai buat nentuin leader/bukan lewat
  //    PERBANDINGAN EMAIL, bukan Boolean(team?.leader) yang selalu true
  //    (karena field "leader" emang selalu ada di objek team, siapapun
  //    yang login).
  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const userEmail = profileResponse?.data?.user?.email;

  const isLeader = Boolean(
    team?.leader?.email &&
    userEmail &&
    team.leader.email.toLowerCase().trim() === userEmail.toLowerCase().trim(),
  );

  const updateMutation = useUpdateTeam();

  // State lokal untuk input link — kalau user belum ngetik apa-apa, pakai
  // data dari server; kalau sudah ngetik, pakai inputan user. Ini derived
  // state biasa, gak butuh useEffect buat sinkronisasi.
  const [userEditedLink, setUserEditedLink] = useState<string | null>(null);
  const driveLink =
    userEditedLink !== null ? userEditedLink : team?.submissionLink || "";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Jaga-jaga ganda: tombol submit ini seharusnya sudah gak kerender
    // sama sekali kalau !isLeader (lihat JSX di bawah), tapi dicek lagi
    // di sini supaya gak ada request "siluman" walau somehow ke-trigger.
    if (!driveLink.trim() || !team || !isLeader) return;

    const payload = {
      name: team.name,
      // "title" wajib menurut validasi Laravel tapi bisa null di data kita
      // (belum pernah diisi) — fallback ke nama tim biar gak keblok
      // validasi cuma gara-gara field kosong.
      title: team.title ?? team.name,
      submission: driveLink,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        setIsSuccessModalOpen(true);
      },
      onError: (error) => {
        toast.error(getUpdateTeamErrorMessage(error));
      },
    });
  };

  const isLoading = isSummaryLoading || isDetailLoading || isProfileLoading;

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2F2FE4]" />
      </div>
    );
  }

  // Belum punya tim sama sekali — jangan render form upload apa pun,
  // arahkan ke halaman Manajemen Tim dulu.
  if (!hasTeam || !team) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center gap-3">
        <AlertCircle className="w-10 h-10 text-slate-300" />
        <p className="text-slate-500 text-sm max-w-sm">
          Anda belum tergabung dalam tim manapun. Buat atau gabung tim terlebih
          dahulu di halaman Manajemen Tim sebelum bisa mengunggah karya.
        </p>
      </div>
    );
  }

  const competition = team.competition;
  const compSlug = competition?.slug?.toLowerCase() || "";

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
            Cabang Lomba:{" "}
            <span className="font-semibold text-[#2F2FE4]">
              {competition?.name || "Memuat..."}
            </span>
          </p>
        </div>

        {/* Alert Informasi Ketua Tim */}
        <div className="w-full bg-[#f0f4ff] border border-[#d6e0ff] rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <div className="mt-0.5">
            <Info className="w-5 h-5 text-[#2F2FE4]" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#2F2FE4] mb-1">
              Informasi Ketua Tim ({team.leader?.name || "Ketua"})
            </h4>
            <p className="text-sm text-slate-600">
              Hanya Ketua Tim yang dapat mengunggah atau memperbarui tautan
              karya. Pastikan link yang dimasukkan sudah final.
            </p>
          </div>
        </div>

        {/* PERSYARATAN DINAMIS BERDASARKAN CABANG LOMBA */}
        <div className="space-y-3">
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              {/* KONDISI 1: UI/UX DESIGN */}
              {compSlug.includes("ui-ux") && (
                <>
                  <div className="flex items-center gap-2 text-slate-900">
                    <LayoutGrid className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-bold text-base">
                      Persyaratan File UI/UX Design
                    </h4>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                    <p className="text-sm text-slate-600 font-medium">
                      Pastikan folder Google Drive Anda berisi file berikut:
                    </p>
                    <div className="space-y-2.5 pt-1 text-sm text-slate-700">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Proposal Karya (PDF)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Surat Pernyataan Orisinalitas (PDF)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Link Prototype Figma</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>
                          Video Showcase / Presentasi (MP4 - Opsional)
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* KONDISI 2: WEB DESIGN / DEVELOPMENT */}
              {compSlug.includes("web") && (
                <>
                  <div className="flex items-center gap-2 text-slate-900">
                    <FileText className="w-5 h-5 text-[#2F2FE4]" />
                    <h4 className="font-bold text-base">
                      Persyaratan File Web Design & Development
                    </h4>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                    <p className="text-sm text-slate-600 font-medium">
                      Pastikan folder Google Drive Anda berisi file berikut:
                    </p>
                    <div className="space-y-2.5 pt-1 text-sm text-slate-700">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Proposal Karya & Dokumentasi Teknis</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Surat Pernyataan Orisinalitas (Format PDF)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>
                          Link Repository (GitHub/GitLab) atau Demo Website
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* KONDISI 3: GEN AI / UMUM (Fallback) */}
              {!compSlug.includes("ui-ux") && !compSlug.includes("web") && (
                <>
                  <div className="flex items-center gap-2 text-slate-900">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h4 className="font-bold text-base">
                      Persyaratan File Kompetisi
                    </h4>
                  </div>
                  <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                    <p className="text-sm text-slate-600 font-medium">
                      Pastikan folder Google Drive Anda berisi file berikut:
                    </p>
                    <div className="space-y-2.5 pt-1 text-sm text-slate-700">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Proposal & Dokumentasi Proyek</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Surat Pernyataan Orisinalitas (Format PDF)</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* FORM INPUT LINK & TOMBOL SIMPAN (DIPROTEKSI KHUSUS LEADER) */}
        <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSave} className="space-y-6">
              {updateMutation.isError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{getUpdateTeamErrorMessage(updateMutation.error)}</p>
                </div>
              )}

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
                    onChange={(e) => setUserEditedLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    disabled={!isLeader || updateMutation.isPending}
                    className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-[#2F2FE4] text-slate-900 disabled:opacity-60 disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Jika bukan leader, tampilkan peringatan di bawah input */}
              {!isLeader ? (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-xl text-sm">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>
                    Anda adalah anggota tim. Hanya ketua tim yang dapat mengubah
                    tautan karya.
                  </span>
                </div>
              ) : (
                <Button
                  type="submit"
                  disabled={!driveLink.trim() || updateMutation.isPending}
                  className={`font-medium px-8 h-12 rounded-xl shadow-sm transition-all ${
                    driveLink.trim() && !updateMutation.isPending
                      ? "bg-[#2F2FE4] hover:bg-[#2523b8] text-white cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                      Menyimpan...
                    </>
                  ) : (
                    <>Simpan Link &rarr;</>
                  )}
                </Button>
              )}
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
