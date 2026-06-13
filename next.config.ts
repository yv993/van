import type { NextConfig } from "next";

// Fingerprinted, content-stable assets (frame sequences, video, self-hosted
// imagery) can be cached hard — they're replaced by path, never mutated.
const IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  // Tree-shake barrel imports from these libs so only the used modules ship
  // (lucide-react is already optimized by Next's default list).
  experimental: {
    optimizePackageImports: ["motion", "radix-ui"],
  },
  images: {
    // Serve modern formats from the next/image optimizer (smallest first).
    formats: ["image/avif", "image/webp"],
    // Placeholder imagery is served from Unsplash.
    // TODO: swap for the client's real photos / CDN and update this allow-list.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/frames/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: IMMUTABLE }],
      },
    ];
  },
};

export default nextConfig;
