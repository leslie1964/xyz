/** @type {import('next').NextConfig} */
const nextConfig =  {
  async redirects() {
    return [
      // Redirect root to login
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
      // Redirect all other routes to login (be careful with this approach)
      // {
      //   source: '/((?!login|api).*)',
      //   destination: '/login',
      //   permanent: false,
      // },
    ]
  },
};

export default nextConfig;
