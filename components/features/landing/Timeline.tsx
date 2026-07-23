"use client";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  ShieldCheck,
  FileText,
  Megaphone,
  Trophy,
  LucideIcon,
} from "lucide-react";

type MarkerShape = "diamond" | "circle" | "filled";
type BadgeVariant = "blue" | "orange" | "white";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  icon: LucideIcon;
  markerShape: MarkerShape;
  badgeVariant: BadgeVariant;
  align: "left" | "right";
}

const timelineData: TimelineItem[] = [
  {
    id: "01",
    title: "Pendaftaran",
    subtitle: "Early Bird & Regular",
    date: "3 Agt - 22 Agt 2026",
    icon: ClipboardCheck,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "02",
    title: "Technical Meeting",
    subtitle: "Technical Meeting Peserta",
    date: "20 Agustus 2026",
    icon: ShieldCheck,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "03",
    title: "Pengerjaan & Upload",
    subtitle: "Online Submission",
    date: "20 Agt - 30 Agt 2026",
    icon: FileText,
    markerShape: "diamond",
    badgeVariant: "blue",
    align: "left",
  },
  {
    id: "04",
    title: "Pengumuman",
    subtitle: "Finalis Terpilih",
    date: "7 Sept 2026",
    icon: Megaphone,
    markerShape: "circle",
    badgeVariant: "orange",
    align: "right",
  },
  {
    id: "05",
    title: "Seminar & Awarding",
    subtitle: "Presentasi Offline & Penutupan",
    date: "12 Sept 2026",
    icon: Trophy,
    markerShape: "filled",
    badgeVariant: "white",
    align: "left",
  },
];

const badgeStyles: Record<BadgeVariant, string> = {
  blue: "border border-blue-200 bg-blue-50 text-blue-700",
  orange: "border border-orange-200 bg-orange-50 text-orange-600",
  white: "bg-white text-blue-700",
};

function Marker({ item }: { item: TimelineItem }) {
  const Icon = item.icon;

  if (item.markerShape === "filled") {
    return (
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-blue-700 rounded-xl z-10 shadow-md">
        <Icon className="w-4 h-4 text-white" strokeWidth={2.25} />
      </div>
    );
  }

  const shapeClass =
    item.markerShape === "diamond" ? "rounded-lg rotate-45" : "rounded-full";
  const iconRotate = item.markerShape === "diamond" ? "-rotate-45" : "";

  return (
    <div
      className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-white border-2 border-slate-200 z-10 shadow-sm ${shapeClass}`}
    >
      <Icon
        className={`w-4 h-4 text-slate-600 ${iconRotate}`}
        strokeWidth={2.25}
      />
    </div>
  );
}

export default function Timeline() {
  return (
    <section id="timeline" className="w-full scroll-mt-24 py-12">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-2">Timeline Kegiatan</h2>
          <p className="text-slate-500">
            Catat tanggal penting agar tidak terlewat.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-blue-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
          <div className="w-2.5 h-2.5 border border-slate-300 rotate-45"></div>
        </div>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Garis tengah vertikal (Desktop) / Garis kiri (Mobile) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>

        <div className="space-y-12 md:space-y-10">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                item.align === "left" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Ruang kosong untuk sisi sebaliknya di desktop */}
              <div className="hidden md:block md:w-1/2"></div>

              {/* Ikon Marker */}
              <Marker item={item} />

              {/* Konten Card */}
              <div
                className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                  item.align === "left" ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <Card
                  className={`shadow-sm hover:shadow-md transition-shadow rounded-2xl ${
                    item.markerShape === "filled"
                      ? "bg-blue-700 border-none shadow-lg"
                      : "border-slate-200"
                  }`}
                >
                  <CardContent className="p-6">
                    <h3
                      className={`font-bold text-lg ${
                        item.markerShape === "filled"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm mt-0.5 mb-3 ${
                        item.markerShape === "filled"
                          ? "text-blue-100"
                          : "text-slate-500"
                      }`}
                    >
                      {item.subtitle}
                    </p>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-md ${badgeStyles[item.badgeVariant]}`}
                    >
                      {item.date}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
