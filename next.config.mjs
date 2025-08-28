/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        // All game files:
        source: "/games/:path*",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          // Helps embedder vs same-origin resources:
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
