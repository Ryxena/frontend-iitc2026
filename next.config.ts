// next.config.ts — tambahkan (atau merge) bagian images ini

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      // kalau kamu juga pakai cover lomba dari Laravel storage (transfer_receipt, cover, dll),
      // tambahkan juga hostname backend-nya di sini, misal:
      // { protocol: "http", hostname: "localhost", port: "8000" },
      // { protocol: "https", hostname: "intermediaiitc.com" },
    ],
  },
};

export default nextConfig;
