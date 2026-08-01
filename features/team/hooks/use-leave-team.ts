import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { leaveTeam } from "@/features/team/api/leave-team";
import type { ApiErrorResponse } from "@/types/index";

export function useLeaveTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-team"] });
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
    },
  });
}

export function getLeaveTeamErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Gagal keluar dari tim";
  }
  return "Terjadi kesalahan, coba lagi";
}
