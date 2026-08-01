import { api } from "@/lib/api/axios";

export interface LeaveTeamResponse {
  success?: boolean;
  message: string;
}

export async function leaveTeam(): Promise<LeaveTeamResponse> {
  const { data } = await api.delete<LeaveTeamResponse>("/teams/mine/leave");
  return data;
}
