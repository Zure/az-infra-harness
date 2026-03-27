import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // standalone output is only needed for npm package distribution;
  // enabling it in dev mode causes a Turbopack panic.
  ...(process.env.NODE_ENV === "production" ? { output: "standalone" } : {}),
};

export default nextConfig;
