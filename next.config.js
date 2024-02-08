/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID:
      "744946436961-e6hm92o5l2q7g6oihf39o3b0f2rpt59m.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    GITHUB_ID: "9fd68e0d4a0d389952fe",
    GITHUB_SECRET: "1ed4d07508f789806b1824635b2a370c2c78b819",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.ibb.co",
        port: "8001",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
