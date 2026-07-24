import { ListOrdered } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentInstructions() {
  const instructions = [
    "Transfer sesuai nominal biaya pendaftaran kompetisi (Rp 150.000).",
    "Simpan bukti transfer dalam format JPG, PNG, atau PDF.",
    "Unggah file bukti pada area dropzone di samping.",
    "Tunggu verifikasi admin maksimal 2×24 jam kerja.",
  ];

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl bg-[#fafafa]">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <ListOrdered className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-lg text-slate-900">Instruksi</h3>
        </div>

        <div className="space-y-5">
          {instructions.map((text, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
