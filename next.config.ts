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
  async rewrites() {
    return [
      {
        source: "/cms/:path*",
        destination: "http://66.29.148.137/cms/:path*",
      },
    ];
  },
};

export default nextConfig;