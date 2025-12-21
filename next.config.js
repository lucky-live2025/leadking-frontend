const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  compress: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  generateBuildId: async () => String(Date.now()),
  // Disable RSC prefetching for client components to prevent fetch errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Suppress webpack warnings
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        url: false,
      };
    }
    // Suppress ALL webpack warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { message: /Custom webpack configuration/ },
      { message: /webpack/ },
    ];
    return config;
  },
  // Suppress Next.js warnings
  experimental: {
    optimizeCss: false,
  },
  // Suppress client-side rendering warnings (these pages use 'use client' which is correct)
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
}

// Only use Sentry if DSN is configured
const sentryOptions = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
  ? {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    }
  : null;

if (sentryOptions) {
  module.exports = withSentryConfig(
    nextConfig,
    sentryOptions,
    {
      widenClientFileUpload: true,
      transpileClientSDK: true,
      tunnelRoute: '/monitoring',
      hideSourceMaps: true,
      disableLogger: true,
    }
  );
} else {
  module.exports = nextConfig;
}

