import { api } from "@/lib/api/axios";
import { UpdateTeamInput } from "@/types";

export async function updateTeam(input: UpdateTeamInput) {
  const formData = new FormData();

  formData.append("name", input.name);
  formData.append("title", input.title);

  if (input.submission) {
    formData.append("submission", input.submission);
  }
  if (input.avatar) {
    formData.append("avatar", input.avatar);
  }

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
  // Path juga dibetulin ke "/teams/mine/update" — sesuai route handler
  // asli di app/api/teams/mine/update/route.ts (bukan "/teams/mine/submission"
  // yang kepakai sebelumnya, itu tebakan salah dari nama folder di explorer).
  const { data } = await api.post("/teams/mine/update", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return data;
}
