/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.stratz.com',
        port: '',
        pathname: '/images/dota2/heroes/**',
      },
    ],
  },
};

module.exports = nextConfig;
