// components/features/landing/MediaPartners.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useMediaPartners } from "@/features/media-partner/hooks/use-media-partners";

const PIXELS_PER_SECOND = 60;

const REPEAT_COUNT = 4;

export default function MediaPartners() {
  const { data, isLoading, isError } = useMediaPartners();

  const trackRef = useRef<HTMLDivElement>(null);
  const [singleSetWidth, setSingleSetWidth] = useState(0);

  const partners = data?.data?.mediaPartners ?? [];
  const hasPartners = partners.length > 0;

  const marqueeItems = hasPartners
    ? Array.from({ length: REPEAT_COUNT }, () => partners).flat()
    : [];

  useEffect(() => {
    if (!trackRef.current || !hasPartners) return;

    const measure = () => {
      const totalWidth = trackRef.current?.scrollWidth ?? 0;
      setSingleSetWidth(totalWidth / REPEAT_COUNT);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(trackRef.current);
    return () => resizeObserver.disconnect();
  }, [hasPartners, partners.length]);

  if (isLoading) {
    return (
      <section className="w-full py-12 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </section>
    );
  }

  if (isError || !hasPartners) {
    return null;
  }

  // Durasi dihitung dari lebar asli / kecepatan konstan, bukan angka fix.
  // Fallback 20 dipakai cuma sebentar sebelum measurement pertama selesai
  // (singleSetWidth masih 0 di render pertama).
  const duration = singleSetWidth > 0 ? singleSetWidth / PIXELS_PER_SECOND : 20;

  return (
    <section className="w-full py-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2">Media Partner</h2>
        <p className="text-slate-500">
          Berkolaborasi menyebarkan semangat inovasi budaya.
        </p>
      </div>

      <div className="relative w-full border border-slate-200 rounded-2xl bg-slate-50/50 p-6 overflow-hidden">
        {/* Fade di kedua sisi supaya transisi marquee terlihat halus */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-slate-50 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-slate-50 to-transparent z-10" />

        <motion.div
          ref={trackRef}
          className="flex gap-4 w-max items-center"
          animate={singleSetWidth > 0 ? { x: [0, -singleSetWidth] } : undefined}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center justify-center px-6 h-16 shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm min-w-37.5"
            >
              {partner.image ? (
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={120}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                />
              ) : (
                <span className="font-bold text-slate-700 text-sm tracking-wide whitespace-nowrap">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
