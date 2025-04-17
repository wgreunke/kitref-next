/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mavawegzbegjydapzueh.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/**',
            },
        ],
    },
}

module.exports = nextConfig 