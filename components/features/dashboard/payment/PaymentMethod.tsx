import { Copy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ElementType } from "react";

interface PaymentMethodProps {
  title: string;
  provider: string;
  accountNumber: string;
  accountName?: string;
  icon: ElementType;
}

export default function PaymentMethod({
  title,
  provider,
  accountNumber,
  accountName,
  icon: Icon,
}: PaymentMethodProps) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900">{title}</h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex-1 flex flex-col justify-center">
          <p className="text-xs text-slate-500 font-medium mb-2">{provider}</p>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xl font-bold tracking-wider text-slate-900">
              {accountNumber}
            </span>
            <button
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Salin Nomor"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          {accountName && (
            <p className="text-sm text-slate-600">a.n. {accountName}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
