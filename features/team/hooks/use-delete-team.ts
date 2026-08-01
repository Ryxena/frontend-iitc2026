import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { deleteTeam } from "@/features/team/api/delete-team";
import type { ApiErrorResponse } from "@/types/index";

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-team"] });
      queryClient.invalidateQueries({ queryKey: ["my-competitions"] });
    },
  });
}

export function getDeleteTeamErrorMessage(error: unknown): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? "Gagal menghapus tim";
  }
  return "Terjadi kesalahan, coba lagi";
}
