/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['aceternity.com', 'images6.alphacoders.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com',
      'images.unsplash.com',
    ],
    },
    async headers() {
      return [
        {
          source: "/api/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
            {
              key: "Content-Range",
              value: "bytes : 0-9/*",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;