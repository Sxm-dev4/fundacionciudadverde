import type { NextConfig } from "next";
import { createSecurityHeaders } from "./lib/security";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...createSecurityHeaders(process.env.NODE_ENV === "production")],
      },
    ];
  },
};

export default nextConfig;
