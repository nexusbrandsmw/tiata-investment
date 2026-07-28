import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tiatamw.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
