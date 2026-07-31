"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CloudUpload,
  ArrowRight,
  FileUp,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  useUploadPayment,
  getPaymentErrorMessage,
} from "@/features/payment/hooks/use-upload-payment";

export default function UploadProof() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);

  // Menyamakan penamaan mutasi dengan pola loginMutation
  const paymentMutation = useUploadPayment();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientError(null); // Reset error setiap kali pilih file baru
    paymentMutation.reset(); // Reset error dari server jika ada

    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi Client-Side: Maksimal 5MB
    if (file.size > 5 * 1024 * 1024) {
      setClientError("Ukuran file terlalu besar. Maksimal 5MB.");
      setUploadedFile(null);
      return;
    }

    // Validasi Client-Side: Tipe File
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setClientError("Format file tidak didukung. Gunakan JPG, PNG, atau PDF.");
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
  };

  const handleSubmit = () => {
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("proveOfPayment", uploadedFile);

    paymentMutation.mutate(formData, {
      onSuccess: (data) => {
        toast.success(data.message || "Bukti pembayaran berhasil dikirim!");
        setUploadedFile(null);
      },
      onError: (error) => {
        const errorMessage = getPaymentErrorMessage(error);
        toast.error(errorMessage);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileUp className="w-5 h-5 text-[#2F2FE4]" />
              <h3 className="font-semibold text-slate-900">
                Unggah Bukti Pembayaran
              </h3>
            </div>

            {/* Error Banner (Mirip dengan pola Form Login) */}
            {(paymentMutation.isError || clientError) && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                  {clientError || getPaymentErrorMessage(paymentMutation.error)}
                </p>
              </div>
            )}

            {/* Area Dropzone / Upload */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center relative transition-colors ${
                clientError
                  ? "border-red-300 bg-red-50/50"
                  : "border-blue-300 bg-[#f8faff] hover:bg-blue-50/50"
              }`}
            >
              <input
                type="file"
                onChange={handleFileSelect}
                accept="image/jpeg,image/png,application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                title="Klik untuk memilih file"
                disabled={paymentMutation.isPending}
              />

              <div className="w-12 h-12 bg-blue-100 text-[#2F2FE4] rounded-full flex items-center justify-center mb-4">
                {uploadedFile ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <CloudUpload className="w-6 h-6" />
                )}
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-1">
                {uploadedFile
                  ? uploadedFile.name
                  : "Tarik & Lepas file di sini"}
              </h4>

              <p className="text-xs text-slate-500 mb-6">
                {uploadedFile
                  ? "File berhasil dipilih. Siap untuk dikonfirmasi."
                  : "atau klik untuk menelusuri komputer Anda (Maks. 5MB, JPG/PNG/PDF)"}
              </p>

              <Button
                type="button"
                variant="outline"
                className="pointer-events-none bg-white font-medium px-8 rounded-lg shadow-sm border-slate-200 text-slate-700"
              >
                {uploadedFile ? "Ganti File" : "Pilih File"}
              </Button>
            </div>
          </div>

          {/* Footer Konfirmasi */}
          <div className="bg-slate-50/80 border-t border-slate-100 px-6 py-4 flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!uploadedFile || paymentMutation.isPending}
              className={`font-medium px-6 h-12 rounded-lg flex items-center gap-2 shadow-sm transition-colors ${
                uploadedFile && !paymentMutation.isPending
                  ? "bg-[#2F2FE4] hover:bg-[#2523b8] text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {paymentMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Memproses...
                </>
              ) : (
                <>
                  Konfirmasi Pembayaran <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
