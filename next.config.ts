import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  },
  /* config options here */
};

export default nextConfig;
