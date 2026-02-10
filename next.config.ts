import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'us-west-2.graphassets.com',
      },
    ],
  },
  serverExternalPackages: ['graffle', 'effect', '@effect/platform', '@wollybeard/kit'],
};

export default nextConfig;
