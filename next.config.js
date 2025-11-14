/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Skip ESLint during production builds to avoid build-time failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript type checking during builds (already checked separately)
    ignoreBuildErrors: false,
  },
  images: {
    // Add all external image hosts your app uses to avoid runtime image warnings
    domains: ['api.builder.io', 'api.ok777.io'],
  },
  // Custom build ID generation to fix Next.js build issue
  generateBuildId: async () => {
    // Generate a build ID based on timestamp
    return `build-${Date.now()}`;
  },
  // If you later need i18n with the App Router, reintroduce carefully.
  // i18n: {
  //   locales: ['en', 'es'],
  //   defaultLocale: 'en',
  // },
};

module.exports = nextConfig;
