/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development',
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            { hostname: 'www.google.com' },
            { hostname: 'cdn.discordapp.com' }
        ]
    }
};

module.exports = nextConfig;