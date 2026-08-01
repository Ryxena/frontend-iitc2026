// features/payment/hooks/use-payment-status.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";

export function usePaymentStatus() {
  return useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => {
      const { data } = await api.get("/payment/status");
      return data;
    },
    // Jika endpoint mengembalikan 404 saat belum ada pembayaran, matikan retry agar tidak membebani server
    retry: false,
  });
}
