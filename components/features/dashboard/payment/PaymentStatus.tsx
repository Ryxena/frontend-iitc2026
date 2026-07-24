import { CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentStatus() {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl">
      <CardContent className="p-6 flex items-start gap-5">
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
          <CalendarClock className="w-7 h-7 text-orange-400" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-slate-900">
            Status: Menunggu Pembayaran
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Tim Anda belum menyelesaikan tahap pembayaran. Harap segera lakukan
            transfer dan unggah bukti.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
