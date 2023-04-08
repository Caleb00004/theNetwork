/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }


// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['components']
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

// module.exports = {
//   eslint: {
//     dirs: ['components']
//   }
// }
