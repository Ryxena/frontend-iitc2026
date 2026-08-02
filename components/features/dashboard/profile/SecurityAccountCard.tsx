"use client";

import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface SecurityFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecurityAccountCardProps {
  values: SecurityFormValues;
  onChange: (values: SecurityFormValues) => void;
}

export default function SecurityAccountCard({
  values,
  onChange,
}: SecurityAccountCardProps) {
  const setField = <K extends keyof SecurityFormValues>(
    key: K,
    value: SecurityFormValues[K],
  ) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
      <div className="flex items-center gap-2 text-slate-900">
        <Lock className="w-4 h-4 text-[#2F2FE4]" />
        <h3 className="font-bold text-base">Keamanan Akun</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="oldPassword" className="text-slate-700 font-medium">
            Password Lama
          </Label>
          <Input
            id="oldPassword"
            type="password"
            value={values.oldPassword}
            onChange={(e) => setField("oldPassword", e.target.value)}
            className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-slate-700 font-medium">
            Password Baru
          </Label>
          <Input
            id="newPassword"
            type="password"
            value={values.newPassword}
            onChange={(e) => setField("newPassword", e.target.value)}
            className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-slate-700 font-medium"
          >
            Konfirmasi Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
            className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
          />
        </div>
      </div>
    </div>
  );
}
