"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Eye, EyeOff, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-md space-y-8"
    >
      {/* Header Formulir */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1a0b8c]">
          Mulai Inovasi Anda
        </h1>
        <p className="text-slate-500 text-sm">
          Buat akun untuk berpartisipasi dalam warisan teknologi nusantara.
        </p>
      </div>

      {/* Formulir */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Input Nama Lengkap */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700 font-medium">
            Nama Lengkap
          </Label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="name"
              type="text"
              className="pl-11 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Masukkan nama lengkap Anda"
            />
          </div>
        </div>

        {/* Input Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              className="pl-11 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="nama@email.com"
            />
          </div>
        </div>

        {/* Input Nomor Telepon */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-700 font-medium">
            Nomor Telepon
          </Label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            {/* Teks statis +62 di dalam input */}
            <span className="absolute left-11 text-slate-600 text-sm font-medium">
              +62
            </span>
            <Input
              id="phone"
              type="tel"
              className="pl-20 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="812XXXX"
            />
          </div>
        </div>

        {/* Input Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700 font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pl-11 pr-12 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Minimal 8 karakter"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Input Konfirmasi Password */}
        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-slate-700 font-medium"
          >
            Konfirmasi Password
          </Label>
          <div className="relative">
            <RotateCcw className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="pl-11 pr-12 bg-[#fafafa] border-slate-200 h-12 focus-visible:ring-[#1a0b8c]"
              placeholder="Ulangi password Anda"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Tombol Submit */}
        <Button className="w-full bg-[#1604a8] hover:bg-[#110287] text-white h-12 rounded-lg text-base font-medium mt-2 transition-colors shadow-md">
          Daftar
        </Button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="text-[#1a0b8c] font-semibold hover:underline"
        >
          Masuk
        </Link>
      </p>
    </motion.div>
  );
}
