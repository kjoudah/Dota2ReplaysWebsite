const nextConfig = {
  swcMinify: true,
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
