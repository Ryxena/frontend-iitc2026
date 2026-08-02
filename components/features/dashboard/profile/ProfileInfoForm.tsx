"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ProfileFormValues {
  fullName: string;
  grade: string;
  institution: string;
  email: string;
  phone: string;
  nisnOrNim: string;
  gender: "male" | "female" | string;
}

interface ProfileInfoFormProps {
  values: ProfileFormValues;
  onChange: (values: ProfileFormValues) => void;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
] as const;

// Field teks biasa (Nama Lengkap, Asal Sekolah, NISN/NIM) semuanya punya
// struktur identik: Label + Input dengan styling sama. Diekstrak ke sini
// supaya JSX di komponen utama gak duplikasi 3x class string yang sama.
interface TextFieldProps {
  id: string;
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextField({
  id,
  label,
  required,
  value,
  onChange,
  placeholder,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-700 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 bg-white border-slate-200 focus-visible:ring-[#2F2FE4]"
      />
    </div>
  );
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
      <TextField
        id="fullName"
        label="Nama Lengkap"
        required
        value={values.fullName}
        onChange={(value) => setField("fullName", value)}
        placeholder="Nama lengkap Anda"
      />

      <TextField
        id="institution"
        label="Asal Sekolah/Instansi"
        required
        value={values.institution}
        onChange={(value) => setField("institution", value)}
        placeholder="Nama sekolah atau kampus"
      />

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700 font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          readOnly
          disabled
          className="h-11 bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed"
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

      <TextField
        id="nisnOrNim"
        label="NISN / NIM (Opsional)"
        value={values.nisnOrNim}
        onChange={(value) => setField("nisnOrNim", value)}
        placeholder="Masukkan NISN atau NIM"
      />

      <div className="space-y-2">
        <Label className="text-slate-700 font-medium">
          Jenis Kelamin <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-6 h-11">
          {GENDER_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                checked={values.gender === option.value}
                onChange={() => setField("gender", option.value)}
                className="w-4 h-4 accent-[#2F2FE4]"
              />
              <span className="text-sm text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
