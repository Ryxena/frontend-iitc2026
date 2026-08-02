// app/(dashboard)/dashboard/submission/page.tsx
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
  FolderOpen,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import SuccessModal from "@/components/features/dashboard/submission/SuccessModal";
import StepGuardModal from "@/components/features/dashboard/StepGuardModal";

import { useMyCompetitions } from "@/features/team/hooks/use-my-competitions";
import { useMyTeam } from "@/features/team/hooks/use-my-team";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { usePaymentStatus } from "@/features/payment/hooks/use-payment-status";
import {
  useSubmitTeamWork,
  getSubmitTeamWorkErrorMessage,
} from "@/features/team/hooks/use-submit-team-work";
import type { ProfileDetail } from "@/types/profile-type";

interface ExtendedProfileUser {
  name?: string;
  email?: string;
  phone?: string;
  participant?: ProfileDetail & {
    institution?: string;
    gender?: string;
    twibbon?: string;
  };
}

export default function UploadWorkPage() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { data: profileResponse, isLoading: isProfileLoading } = useProfile();
  const { data: myTeamsSummary, isLoading: isSummaryLoading } =
    useMyCompetitions();

  const hasTeam = Array.isArray(myTeamsSummary) && myTeamsSummary.length > 0;
  const { data: teamDetailResponse, isLoading: isDetailLoading } =
    useMyTeam(hasTeam);

  const { data: paymentResponse, isLoading: isPaymentLoading } =
    usePaymentStatus();

  // Evaluasi Profil dengan casting aman
  const user = profileResponse?.data?.user as ExtendedProfileUser | undefined;
  const participant = user?.participant;
  const userEmail = user?.email;

  const isProfileComplete = Boolean(
    user?.name &&
    user?.phone &&
    participant?.institution &&
    participant?.gender &&
    participant?.twibbon,
  );

  // Evaluasi Tim
  const team = teamDetailResponse?.data?.team;
  const isTeamComplete = Boolean(team);

  // Evaluasi Pembayaran
  const paymentStatus = paymentResponse?.data?.payment?.status;
  const isPaymentComplete =
    paymentStatus?.toLowerCase() === "valid" ||
    paymentStatus?.toLowerCase() === "success" ||
    paymentStatus?.toUpperCase() === "ACCEPTED";

  const isLeader = Boolean(
    team?.leader?.email &&
    userEmail &&
    team.leader.email.toLowerCase().trim() === userEmail.toLowerCase().trim(),
  );

  const submitMutation = useSubmitTeamWork();

  const [userEditedLink, setUserEditedLink] = useState<string | null>(null);
  const driveLink =
    userEditedLink !== null ? userEditedLink : team?.submissionLink || "";

  const isAlreadySubmitted = Boolean(
    team?.submissionLink && team.submissionLink.trim() !== "",
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveLink.trim() || !team || !isLeader) return;

    submitMutation.mutate(
      { submission: driveLink },
      {
        onSuccess: () => {
          setIsSuccessModalOpen(true);
        },
        onError: (error) => {
          toast.error(getSubmitTeamWorkErrorMessage(error));
        },
      },
    );
  };

  const isLoading =
    isSummaryLoading || isDetailLoading || isProfileLoading || isPaymentLoading;

  if (isLoading) {
    return (
      <div className="flex h-100 w-full items-center justify-center min-h-[calc(100vh-5rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-[#2F2FE4]" />
      </div>
    );
  }

  const competition = team?.competition;
  const compSlug = competition?.slug?.toLowerCase() || "";

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col items-center">
      <StepGuardModal
        isProfileComplete={isProfileComplete}
        isTeamComplete={isTeamComplete}
        isPaymentComplete={isPaymentComplete}
        requiredStep="submission"
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />

      {isProfileComplete && isTeamComplete && isPaymentComplete && team && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-5xl mx-auto space-y-10 relative z-10 pb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

            <div>
              {isAlreadySubmitted ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Karya Sudah Diunggah</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold shadow-xs">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Belum Unggah Karya</span>
                </div>
              )}
            </div>
          </div>

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

          <div className="space-y-3">
            <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-8 space-y-6">
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
                          <span>Proposal Karya</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>
                            Surat Pernyataan Orisinalitas (format PDF)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Prototype Figma/Lainnya (format LINK)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Video Showcase (format MP4).</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

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
                          <span>Proposal Karya</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Video Showcase</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>
                            Surat Pernyataan Orisinalitas (Format PDF)
                          </span>
                        </div>{" "}
                        <div className="flex items-center gap-3">
                          <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Dokumentasi Teknis (Opsional)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>
                            File besar/aset khusus (Jika tidak bisa di GitHub)
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!compSlug.includes("ui-ux") && !compSlug.includes("web") && (
                  <>
                    <div className="flex items-center gap-2 text-slate-900">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-base">
                        Persyaratan File GenAI
                      </h4>
                    </div>
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-6 space-y-3">
                      <p className="text-sm text-slate-600 font-medium">
                        Pastikan folder Google Drive Anda berisi file berikut:
                      </p>
                      <div className="space-y-2.5 pt-1 text-sm text-slate-700">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Video</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Proposal Karya</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>
                            Surat Pernyataan Orisinalitas (format PDF)
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <PlusCircle className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Dokumentasi Teknis (opsional).</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>Video Showcase (format MP4).</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                {submitMutation.isError && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>{getSubmitTeamWorkErrorMessage(submitMutation.error)}</p>
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
                      disabled={!isLeader || submitMutation.isPending}
                      className="pl-11 h-12 bg-white border-slate-200 focus-visible:ring-[#2F2FE4] text-slate-900 disabled:opacity-60 disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {!isLeader ? (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-xl text-sm">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>
                      Anda adalah anggota tim. Hanya ketua tim yang dapat
                      mengubah tautan karya.
                    </span>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={!driveLink.trim() || submitMutation.isPending}
                    className={`font-medium px-8 h-12 rounded-xl shadow-sm transition-all ${
                      driveLink.trim() && !submitMutation.isPending
                        ? "bg-[#2F2FE4] hover:bg-[#2523b8] text-white cursor-pointer"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />{" "}
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        {isAlreadySubmitted ? "Perbarui Link" : "Simpan Link"}{" "}
                        &rarr;
                      </>
                    )}
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-slate-200 shadow-none rounded-2xl bg-[#fafafa]">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900">Akses Google Drive</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pastikan link Google Drive Anda disetel ke &quot;Public&quot;
                  atau &quot;Anyone with the link&quot; agar juri dapat
                  mengakses dan menilai karya Anda tanpa hambatan.
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
      )}
    </div>
  );
}
