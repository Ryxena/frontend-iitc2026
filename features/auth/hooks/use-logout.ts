// features/auth/hooks/use-logout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api/axios";

// Ekspor konstanta agar bisa digunakan bersama dengan halaman TeamPage
export const SELECTED_COMPETITION_STORAGE_KEY = "selectedCompetitionSlug";

async function logoutRequest() {
  const { data } = await api.post("/auth/logout");
  return data;
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      // 1. Hapus cache data user yang login saat ini
      queryClient.clear();

      // 2. BERSIHKAN LOCAL STORAGE dari sisa state dashboard/team akun sebelumnya
      try {
        localStorage.removeItem(SELECTED_COMPETITION_STORAGE_KEY);
      } catch (err) {
        console.error("Gagal menghapus data dari localStorage:", err);
      }

      // 3. Tampilkan pesan dan arahkan kembali ke halaman login
      toast.success("Berhasil logout");
      router.push("/");
    },
    onError: () => {
      // Walaupun API gagal merespons, kita tetap bersihkan memori lokal untuk berjaga-jaga
      queryClient.clear();
      try {
        localStorage.removeItem(SELECTED_COMPETITION_STORAGE_KEY);
      } catch (e) {} // Abaikan error senyap

      router.push("/");
    },
  });
}
