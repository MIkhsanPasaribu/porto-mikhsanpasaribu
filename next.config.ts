import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Matikan pemeriksaan ESLint saat build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opsional: Matikan pemeriksaan TypeScript jika masih ada error
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
