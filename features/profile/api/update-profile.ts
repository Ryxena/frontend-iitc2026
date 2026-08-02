// features/profile/api/update-profile.ts
import { api } from "@/lib/api/axios";
import type { ProfileResponse } from "@/types/profile-type";

export async function updateProfile(
  formData: FormData,
): Promise<ProfileResponse> {
  // PENTING: instance `api` (lib/api/axios.ts) punya default header
  // Content-Type: "application/json" yang di-set eksplisit lewat
  // axios.create(). Default level-instance kayak gini KADANG gak
  // otomatis ke-override jadi multipart/form-data + boundary walau
  // data yang dikirim FormData — beda kasus dengan kalau Content-Type
  // memang gak pernah di-set sama sekali dari awal.
  //
  // Makanya di sini kita override eksplisit jadi `undefined` khusus
  // untuk request ini saja (gak ngubah default instance-nya secara
  // global). Ini BUKAN "set manual ke multipart/form-data" (yang
  // memang salah karena kehilangan boundary) — ini "kosongin header
  // biar axios/browser yang isi otomatis dengan boundary yang benar".
  const { data } = await api.post<ProfileResponse>("/profile", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return data;
}
