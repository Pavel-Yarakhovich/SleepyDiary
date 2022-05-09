/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // https://www.guidgenerator.com
    secret: "testSecretWord",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // dev api
        : "https://sleepy-diary.vercel.app//api", // prod api
  },
};

module.exports = nextConfig;
