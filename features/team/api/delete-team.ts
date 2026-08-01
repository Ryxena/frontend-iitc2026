import { api } from "@/lib/api/axios";

export interface DeleteTeamResponse {
  success?: boolean;
  message: string;
}

export async function deleteTeam(): Promise<DeleteTeamResponse> {
  const { data } = await api.delete<DeleteTeamResponse>("/teams/mine");
  return data;
}
