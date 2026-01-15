/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable trailing slash redirect to avoid 307 errors on Stripe webhooks
    skipTrailingSlashRedirect: true,
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
