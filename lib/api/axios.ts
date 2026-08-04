import axios from "axios";

/**
 * Instance ini dipakai oleh CLIENT COMPONENTS.
 * baseURL HARUS mengarah ke Route Handler Next.js sendiri (/api/...),
 * BUKAN langsung ke Laravel. Kalau baseURL diarahkan ke Laravel
 * (mis. http://localhost:8000/api), request akan dikirim LANGSUNG dari
 * browser, dan itu memicu masalah berantai:
 *   1. CSRF 419 — request lintas-origin ke Laravel butuh siklus
 *      sanctum/csrf-cookie yang belum tentu kamu jalankan, plus setup
 *      CORS credentials yang rumit untuk cookie lintas-origin.
 *   2. Cookie httpOnly TIDAK PERNAH ter-set — karena token cuma nyampe
 *      ke JS di browser lewat response body, bukan lewat Set-Cookie dari
 *      Route Handler kita. Artinya token balik rawan dicuri XSS.
 *
 * Dengan baseURL "/api": browser manggil Next.js kita sendiri (same-origin,
 * tanpa CORS/CSRF), lalu Next.js Route Handler-lah yang manggil Laravel
 * server-to-server dan men-set cookie httpOnly. Lihat:
 *   - app/api/auth/login/route.ts
 *   - app/api/auth/register/route.ts
 */
export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      // Mencegah infinite redirect loop:
      // Hapus HTTPOnly cookie terlebih dahulu melalui endpoint server sebelum pindah halaman,
      // agar middleware tidak mengira user masih login dan me-redirect kembali ke dashboard.
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (e) {
        // Abaikan error jaringan saat mencoba logout
      } finally {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
