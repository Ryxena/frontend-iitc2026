import AuthLeftPanel from "@/components/features/auth/AuthLeftPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - IITC 2026",
  description:
    "Buat akun untuk berpartisipasi dalam warisan teknologi nusantara.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-white flex font-sans">
      {" "}
      <AuthLeftPanel />
      {children}
    </div>
  );
}
