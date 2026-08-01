import { api } from "@/lib/api/axios";

export async function getMyTeam() {
  const { data } = await api.get("/teams/mine");
  return data;
}
