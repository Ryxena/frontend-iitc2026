// features/team/hooks/use-submit-team-work.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { submitTeamWork } from "../api/submit-team-work";
import type { ApiErrorResponse } from "@/types/index";

export function useSubmitTeamWork() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTeamWork,
    onSuccess: () => {
      // Konsisten dengan queryKey asli yang dipakai useMyTeam
      // (TEAM_QUERY_KEYS.myTeamDetail = ["my-team-detail"]) supaya UI
      // langsung refresh menampilkan link yang baru disimpan.
      queryClient.invalidateQueries({
        queryKey: ["my-competitions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-team-detail"],
      });
    },
  });
}

// Helper pesan error khusus submit karya
export function getSubmitTeamWorkErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Gagal menyimpan data karya. Pastikan format tautan sudah benar."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
