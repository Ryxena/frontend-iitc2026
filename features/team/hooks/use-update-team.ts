// features/team/hooks/use-update-team.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { updateTeam } from "../api/update-team";
import type { ApiErrorResponse } from "@/types/index";

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      // Sebelumnya invalidate ["my-team"] — TIDAK cocok dengan queryKey
      // asli yang dipakai useMyTeam (TEAM_QUERY_KEYS.myTeamDetail =
      // ["my-team-detail"]), jadi invalidate ini gak pernah ngena dan UI
      // gak refresh nampilin link yang baru disimpan sampai user refresh
      // manual. Sekarang pakai konstanta yang sama biar dijamin sinkron.
      queryClient.invalidateQueries({
        queryKey: ["my-competitions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["my-team-detail"],
      });
    },
  });
}

// Helper pesan error khusus update team
export function getUpdateTeamErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return (
      error.response?.data?.message ??
      "Gagal menyimpan data karya. Pastikan format tautan sudah benar."
    );
  }
  return "Terjadi kesalahan pada server, coba lagi.";
}
