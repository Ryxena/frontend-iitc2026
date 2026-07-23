"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Sponsors() {
  // Array teks sponsor sesuai dengan yang ada di desain gambar
  const sponsorList = [
    "IITC Heritage Tech 2026",
    "Inovasi Masa Depan",
    "Warisan Budaya",
    "Tech meets Tradition",
    "IITC Heritage Tech 2026",
  ];

  return (
    <section className="w-full bg-slate-50/50 border-y border-slate-200 py-10 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Atas: Didukung Oleh & Lihat Selengkapnya */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase">
            Didukung Oleh
          </h3>
          <Link
            href="/sponsor"
            className="group flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Lihat Selengkapnya
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Baris Daftar Sponsor */}
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-between gap-8 min-w-max">
            {sponsorList.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center"
              >
                <span className="text-base sm:text-lg lg:text-xl font-medium text-slate-400 whitespace-nowrap select-none hover:text-slate-500 transition-colors cursor-default">
                  {sponsor}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
