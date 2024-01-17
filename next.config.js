/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/*'
      },
      {
        protocol: 'https',
        hostname: 'mbcnyqlazlnrnrncctns.supabase.co',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        pathname: '/**'
      }
    ]
  }
};

module.exports = nextConfig;
