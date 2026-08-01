import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { laravelApi } from "@/lib/api/laravel-server";
import type { ApiErrorResponse } from "@/types/index";

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME ?? "token";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ memberId: string }> },
) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { memberId } = await params;
    const { data } = await laravelApi.delete(
      `/teams/mine/members/${memberId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (isAxiosError<ApiErrorResponse>(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ?? "Gagal mengeluarkan anggota",
          errors: error.response?.data?.errors,
        },
        { status: error.response?.status ?? 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
