/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'app.creativehub.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '*.creativehub.io',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
