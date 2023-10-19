/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dota2protracker.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
