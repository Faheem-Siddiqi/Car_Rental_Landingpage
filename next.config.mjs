/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep development chunks isolated from production build output.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
