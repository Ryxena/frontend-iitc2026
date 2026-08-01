import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { uploadPayment } from "@/features/payment/api/upload-payment";
import type { ApiErrorResponse } from "@/types/index";

export function useUploadPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadPayment,
    onSuccess: () => {
      // Invalidate query agar UI status pembayaran otomatis ter-refresh (menunggu verifikasi)
      // Sesuaikan queryKey ini dengan key yang kamu pakai untuk get status tim/kompetisi
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
    },
  });
}

// Helper untuk ambil pesan error yang enak dibaca dari AxiosError
export function getPaymentErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Gagal mengunggah bukti pembayaran, periksa kembali file Anda."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
