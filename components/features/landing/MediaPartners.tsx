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
  const [isPaused, setIsPaused] = useState(false);

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

  const duration = singleSetWidth > 0 ? singleSetWidth / PIXELS_PER_SECOND : 20;

  return (
    <section className="w-full py-12">
      {/* Header: eyebrow + judul + jumlah partner */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 mb-2">
            Media Partner
          </h2>
          <p className="text-slate-500">
            Berkolaborasi menyebarkan semangat inovasi budaya.
          </p>
        </div>
      </div>

      <div
        className="group relative w-full border border-slate-200 rounded-2xl bg-linear-to-b from-slate-50 to-slate-50/50 p-6 sm:p-8 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fade di kedua sisi */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

        <motion.div
          ref={trackRef}
          className="flex gap-12 w-max items-center"
          animate={
            singleSetWidth > 0
              ? { x: isPaused ? undefined : [0, -singleSetWidth] }
              : undefined
          }
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeItems.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center justify-center shrink-0 px-3"
            >
              {partner.image ? (
                <div className="relative flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={160}
                    height={64}
                    className="max-h-14 md:max-h-16 w-auto object-contain grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                  />
                </div>
              ) : (
                <span className="font-bold text-slate-700 text-base md:text-lg tracking-wide whitespace-nowrap transition-colors duration-300 hover:text-[#2F2FE4]">
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
