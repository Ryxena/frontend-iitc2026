import { api } from "@/lib/api/axios";
import { UploadPaymentResponse } from "@/types";
// Sesuaikan interface ini dengan response dari Laravel (sesuai gambar Postman)

export async function uploadPayment(
  formData: FormData,
): Promise<UploadPaymentResponse> {
  // Kita menembak ke BFF Next.js route handler
  const { data } = await api.post<UploadPaymentResponse>(
    "/payment/mine",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
