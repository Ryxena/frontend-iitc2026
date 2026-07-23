"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logoIITC2026 from "@/public/Logo-IITC2026.svg";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Bagian Logo (Kiri) */}
        <Link href="/" className="flex items-center">
          <Image
            src={logoIITC2026}
            alt="Logo IITC2026"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Bagian Navigasi (Tengah) */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
          <Link href="#tentang" className="hover:text-blue-700">
            Tentang
          </Link>
          <Link href="#kompetisi" className="hover:text-blue-700">
            Kompetisi
          </Link>
          <Link href="#timeline" className="hover:text-blue-700">
            Timeline
          </Link>
          <Link href="#faq" className="hover:text-blue-700">
            FAQ
          </Link>
        </nav>

        {/* Bagian Tombol (Kanan) */}
        <Button className="bg-blue-700 hover:bg-blue-800 rounded-full px-6">
          Daftar Sekarang
        </Button>
      </div>
    </header>
  );
}
