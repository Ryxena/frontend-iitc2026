"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ProfileFormValues {
  fullName: string;
  institution: string;
  email: string;
  phone: string;
  nisnOrNim: string;
  gender: "male" | "female" | "";
}

interface ProfileInfoFormProps {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
}

export default function ProfileInfoForm({
  values,
  onChange,
}: ProfileInfoFormProps) {
  const setField = <K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K],
  ) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-slate-700 font-medium">
          Nama Lengkap <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          value={values.fullName}
          onChange={(e) => setField("fullName", e.target.value)}
          placeholder="Nama lengkap Anda"
          className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution" className="text-slate-700 font-medium">
          Asal Sekolah/Instansi <span className="text-red-500">*</span>
        </Label>
        <Input
          id="institution"
          value={values.institution}
          onChange={(e) => setField("institution", e.target.value)}
          placeholder="Nama sekolah atau kampus"
          className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          Email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="nama@email.com"
          className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-slate-700 font-medium">
          Nomor Telepon <span className="text-red-500">*</span>
        </Label>
        <div className="flex">
          <span className="inline-flex items-center px-3.5 h-11 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium">
            +62
          </span>
          <Input
            id="phone"
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="812xxxxxx"
            className="h-11 rounded-l-none bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nisnOrNim" className="text-slate-700 font-medium">
          NISN / NIM (Opsional)
        </Label>
        <Input
          id="nisnOrNim"
          value={values.nisnOrNim}
          onChange={(e) => setField("nisnOrNim", e.target.value)}
          placeholder="Masukkan NISN atau NIM"
          className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">
          Jenis Kelamin <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-6 h-11">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={values.gender === "male"}
              onChange={() => setField("gender", "male")}
              className="w-4 h-4 accent-[#2F2FE4]"
            />
            <span className="text-sm text-slate-700">Laki-laki</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              checked={values.gender === "female"}
              onChange={() => setField("gender", "female")}
              className="w-4 h-4 accent-[#2F2FE4]"
            />
            <span className="text-sm text-slate-700">Perempuan</span>
          </label>
        </div>
      </div>
    </div>
  );
}
