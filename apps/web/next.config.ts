import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  reactStrictMode: false,
  transpilePackages: ["@nattui/react-components"],
  typedRoutes: true,
}

export default nextConfig
