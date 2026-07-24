import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "@/components/features/landing/Navbar";
import Footer from "@/components/features/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IITC | Lomba Teknologi Nasional 2026",
  description:
    "Kompetisi IT skala nasional untuk SMK/SMA sederajat seluruh Indonesia. Total hadiah berlimpah.",
  keywords: [
    "lomba IT nasional",
    "kompetisi web",
    "lomba SMK/SMA sederajat 2026",
    "seminar teknologi",
  ],
  openGraph: {
    title: "Lomba Teknologi Nasional 2026",
    description:
      "Daftarkan tim terbaikmu sekarang dan menangkan total hadiah Rp 50 Juta!",
    url: "https://lombanasional.com",
    siteName: "Amikom TechFest",
    images: [
      {
        url: "https://lombanasional.com/og-banner.png", // Banner saat link di-share di WA/Social Media
        width: 1200,
        height: 630,
        alt: "Banner Lomba Nasional 2026",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`${inter.className} bg-slate-50/50 text-slate-900`}>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
