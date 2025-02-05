/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
    images: {
        unoptimized: true,
        formats: ['image/webp'],
        deviceSizes: [32, 64, 96],
        remotePatterns: [
            { hostname: 'www.google.com' },
            { hostname: 'cdn.discordapp.com' }
        ]
    }
};

module.exports = nextConfig;