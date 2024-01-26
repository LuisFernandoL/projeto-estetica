/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  images: {
    domains:["https://sudbury.legendboats.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // formats: ["image/webp"],
  },
};

module.exports = nextConfig;
