import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 604800, // 7 days
    remotePatterns: [new URL('https://cdn.dummyjson.com/product-images/**')],
  },
};

export default nextConfig;
