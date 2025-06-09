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

  trailingSlash: false,

  // Configure images for external domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mrsybafdmuafbwsocent.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;
