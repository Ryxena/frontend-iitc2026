import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

// Mengikuti pola dari auth route
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function POST(request: NextRequest) {
  // 1. Validasi Token Sesi di sisi Next.js Server
  // Karena ini route berproteksi, pastikan cookie ada sebelum menembak ke Laravel
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json<ApiErrorResponse>(
      {
        message: "Unauthorized. Sesi Anda telah habis, silakan login kembali.",
      },
      { status: 401 },
    );
  }

  try {
    // 2. Ambil data form (berisi file) dari client browser
    const formData = await request.formData();
    const file = formData.get("proveOfPayment");

    if (!file) {
      return NextResponse.json<ApiErrorResponse>(
        {
          message: "Data tidak valid",
          errors: { proveOfPayment: ["File bukti pembayaran wajib diunggah"] },
        },
        { status: 422 },
      );
    }

    // 3. Susun FormData baru untuk dikirim ke Laravel via Axios
    // Persis seperti yang dilakukan pada route login
    const form = new FormData();
    form.append("proveOfPayment", file);

    // 4. Kirim request ke backend Laravel menggunakan instance Axios (laravelApi)
    const { data } = await laravelApi.post("/payment/mine", form, {
      headers: {
        // Sisipkan Bearer Token dari Cookie ke Header Axios
        Authorization: `Bearer ${token}`,
        // Catatan: Axios akan otomatis mengatur header 'Content-Type': 'multipart/form-data'
        // beserta 'boundary'-nya secara otomatis karena kita mengirim object FormData bawaan
      },
    });

    // 5. Kembalikan data sukses dari Laravel ke Frontend Client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // DEBUG SEMENTARA: supaya error aslinya kelihatan di terminal npm run dev
    console.error("[POST /api/payment/mine] error:", error);

    // 6. Error handling konsisten menggunakan format bawaan kamu
    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ??
        (status === 422
          ? "Format file tidak valid atau terlalu besar"
          : "Terjadi kesalahan saat mengunggah bukti pembayaran, coba lagi");

      return NextResponse.json<ApiErrorResponse>(
        { message, errors: error.response?.data?.errors },
        { status },
      );
    }

    // Fallback jika error bukan berasal dari Axios (misal error dari Next.js itu sendiri)
    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan internal pada server Next.js" },
      { status: 500 },
    );
  }
}
