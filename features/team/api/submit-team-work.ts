// features/team/api/submit-team-work.ts
import { api } from "@/lib/api/axios";

// Input disederhanakan: endpoint submission cuma butuh link,
// bukan name/title/avatar (itu tanggung jawab endpoint "Update Team" terpisah).
export interface SubmitTeamWorkInput {
  submission: string;
}

export async function submitTeamWork(input: SubmitTeamWorkInput) {
  const formData = new FormData();
  formData.append("submission", input.submission);

  // PENTING: JANGAN set header Content-Type secara manual ke string
  // "multipart/form-data" — tanpa boundary, Laravel gagal parse body-nya.
  //
  // TAPI: instance `api` (lib/api/axios.ts) punya default header
  // Content-Type: "application/json" yang di-set eksplisit lewat
  // axios.create(). Kalau dibiarkan, default itu bisa nempel dan gak
  // ke-override otomatis jadi multipart/form-data walau data-nya FormData.
  // Makanya di sini kita override eksplisit jadi `undefined` — ini bikin
  // axios/browser yang nentuin Content-Type + boundary yang benar sendiri,
  // khusus untuk request ini saja (gak ngubah default instance-nya).
  //
  // Path sesuai route handler yang sudah dipindah ke
  // app/api/teams/mine/submission/route.ts (sesuai dokumentasi Postman:
  // POST /api/teams/mine/submission).
  const { data } = await api.post("/teams/mine/submission", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return data;
}
