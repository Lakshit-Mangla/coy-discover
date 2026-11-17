/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  // Expose the API at the exact paths from the spec (GET /feed, POST /swipe,
  // GET /matches). The /api/* routes keep working too.
  async rewrites() {
    return [
      { source: "/feed", destination: "/api/feed" },
      { source: "/swipe", destination: "/api/swipe" },
      { source: "/matches", destination: "/api/matches" },
    ];
  },
};

module.exports = nextConfig;
