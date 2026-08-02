// features/profile/hooks/use-update-profile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { updateProfile } from "@/features/profile/api/update-profile";
import type { ApiErrorResponse } from "@/types/index";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      // Invalidate query agar UI (form, avatar, status keanggotaan) otomatis
      // ter-refresh dengan data profil terbaru dari server.
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
}

// Helper untuk ambil pesan error yang enak dibaca dari AxiosError
export function getProfileErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const validationErrors = error.response?.data?.errors;
    if (validationErrors) {
      const firstKey = Object.keys(validationErrors)[0];
      const firstMessage = validationErrors[firstKey]?.[0];
      if (firstMessage) return firstMessage;
    }
    return error.response?.data?.message || "Gagal memperbarui profil.";
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
