// features/profile/api/get-profile.ts
import { api } from "@/lib/api/axios";
import type { ProfileResponse } from "@/types/index"; // Sesuaikan path jika berbeda

export async function getProfile(): Promise<ProfileResponse> {
  const { data } = await api.get<ProfileResponse>("/profile");
  return data;
}
