import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable optimistic client cache to fix navigation issues
    optimisticClientCache: false,
    // Set stale times to 0 to prevent caching issues
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
