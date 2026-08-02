// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Silakan login kembali." },
      { status: 401 },
    );
  }

  try {
    const { data } = await laravelApi.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[GET /api/profile] error:", error);

    if (isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status ?? 500;
      const message =
        error.response?.data?.message ?? "Gagal mengambil data profil";

      return NextResponse.json<ApiErrorResponse>(
        { message, errors: error.response?.data?.errors },
        { status },
      );
    }

    return NextResponse.json<ApiErrorResponse>(
      { message: "Terjadi kesalahan internal server" },
      { status: 500 },
    );
  }
}

// POST — Update Profile via BFF
export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized. Silakan login kembali." },
      { status: 401 },
    );
  }

  const laravelBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://intermediaiitc.com/public/api";
  const contentType = request.headers.get("content-type") || "";

  try {
    // ========================================================================
    // KASUS FILE UPLOAD (multipart/form-data): avatar dan/atau twibbon.
    //
    // PENTING — kenapa TIDAK pakai `await request.formData()` lalu forward
    // ulang objek FormData-nya: File/Blob yang didapat dari parsing FormData
    // di SATU request itu gak selalu bisa dipakai aman jadi body di request
    // LAIN (fetch baru ke Laravel). Metadata (nama file, mimetype) kebawa,
    // tapi isi binary-nya bisa "hilang"/kosong pas nyampe di server tujuan —
    // itu yang bikin Laravel bilang "The avatar field must be a file"
    // walau user sudah pilih file yang benar dan field-nya memang terkirim.
    //
    // Solusi paling aman: JANGAN diparsing sama sekali di sini. Teruskan
    // body request MENTAH (raw stream) apa adanya dari browser langsung ke
    // Laravel, lengkap dengan Content-Type asli-nya (termasuk boundary).
    // Next.js/Node butuh `duplex: "half"` setiap kali body berupa stream.
    // ========================================================================
    if (contentType.includes("multipart/form-data")) {
      const response = await fetch(`${laravelBaseUrl}/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": contentType,
        },
        body: request.body,
        // @ts-expect-error -- "duplex" belum ada di tipe RequestInit bawaan
        // TS/lib.dom.d.ts versi tertentu, tapi wajib di-set saat body berupa
        // ReadableStream di runtime Node/undici (Next.js App Router).
        duplex: "half",
      });

      const responseData = await response.json();
      return NextResponse.json(responseData, { status: response.status });
    }

    // ========================================================================
    // KASUS TANPA FILE (application/json) — fallback kalau suatu saat ada
    // pemanggil lain yang update profil tanpa upload apa pun.
    // ========================================================================
    const jsonBody = await request.json();
    const response = await fetch(`${laravelBaseUrl}/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    });

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: response.status });
  } catch (error: unknown) {
    console.error("[POST /api/profile] error internal:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan internal server pada BFF";

    return NextResponse.json<ApiErrorResponse>(
      { message: errorMessage },
      { status: 500 },
    );
  }
}
