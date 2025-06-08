import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Disable optimistic client cache to fix navigation issues
    optimisticClientCache: false,
  },
};

export default nextConfig;
