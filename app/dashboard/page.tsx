"use client";

import { motion } from "framer-motion";
import RegistrationStepper from "@/components/features/dashboard/RegistrationStepper";
import PromoBanner from "@/components/features/dashboard/PromoBanner";
import DeadlineCard from "@/components/features/dashboard/DeadlineCard";
import EmptyStateCard from "@/components/features/dashboard/EmptyStateCard";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Greeting Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Halo, Ahmad!</h1>
        <p className="text-slate-500">
          Selamat datang di portal kompetisi Heritage Tech.
        </p>
      </div>

      {/* Stepper Card */}
      <RegistrationStepper />

      {/* Grid Layout (Banner & Side Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Kiri (Span 2) */}
        <div className="lg:col-span-2 flex">
          <PromoBanner />
        </div>

        {/* Cards Kanan (Span 1) */}
        <div className="flex flex-col gap-6">
          <DeadlineCard />
          <EmptyStateCard />
        </div>
      </div>
    </motion.div>
  );
}
