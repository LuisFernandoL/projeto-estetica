/** @type {import('next').NextConfig} */
const nextConfig = {
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
