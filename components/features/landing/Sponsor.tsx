"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSponsors } from "@/features/sponsor/hooks/use-sponsors";

export default function Sponsors() {
  const { data, isLoading, isError } = useSponsors();

  if (isLoading) {
    return (
      <section className="w-full bg-slate-50/50 border-y border-slate-200 py-10 my-12 h-38.5 animate-pulse" />
    );
  }

  if (isError) {
    return null;
  }

  const sponsorsList = data?.data?.sponsors ?? [];

  // Filter berdasarkan masing-masing tier
  const platinumSponsors = sponsorsList.filter(
    (s) => s.tier.toLowerCase() === "platinum",
  );
  const goldSponsors = sponsorsList.filter(
    (s) => s.tier.toLowerCase() === "gold",
  );
  const silverSponsors = sponsorsList.filter(
    (s) => s.tier.toLowerCase() === "silver",
  );
  const bronzeSponsors = sponsorsList.filter(
    (s) => s.tier.toLowerCase() === "bronze",
  );

  // Tentukan batas maksimal logo di landing page agar pas 1 baris tanpa turun
  const MAX_ITEMS = 7;

  // Susun urutan: Platinum -> Gold -> Silver -> Bronze
  let displaySponsors = [...platinumSponsors, ...goldSponsors];

  if (displaySponsors.length < MAX_ITEMS) {
    const needed = MAX_ITEMS - displaySponsors.length;
    displaySponsors = [...displaySponsors, ...silverSponsors.slice(0, needed)];
  }

  if (displaySponsors.length < MAX_ITEMS) {
    const needed = MAX_ITEMS - displaySponsors.length;
    displaySponsors = [...displaySponsors, ...bronzeSponsors.slice(0, needed)];
  }

  // Batasi persis maksimal 6 item agar tidak pernah turun baris
  displaySponsors = displaySponsors.slice(0, MAX_ITEMS);

  if (displaySponsors.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-slate-50/50 border-y border-slate-200 py-10 my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Atas: Didukung Oleh & Lihat Selengkapnya */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-bold tracking-[0.15em] text-slate-400 uppercase">
            Didukung Oleh
          </h3>
          <Link
            href="/sponsor"
            className="group flex items-center text-sm font-medium text-slate-600 hover:text-[#2F2FE4] transition-colors"
          >
            Lihat Selengkapnya
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Baris Daftar Sponsor: Menggunakan flex-nowrap dan justify-center agar rapat di tengah dan tidak turun */}
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex items-center justify-center sm:justify-between gap-8 md:gap-12 flex-nowrap min-w-max sm:min-w-0">
            {displaySponsors.map((sponsor, index) => (
              <motion.div
                key={`${sponsor.id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center h-12 md:h-14 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
              >
                {sponsor.image ? (
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    width={140}
                    height={50}
                    className="max-h-12 md:max-h-14 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg md:text-xl font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap cursor-default">
                    {sponsor.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
