import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Interrompe o build se houver erros de TypeScript
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
