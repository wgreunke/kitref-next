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

/**  This is for the supabase image loader transformer*/
/**  https://supabase.com/docs/guides/storage/serving/image-transformations?queryGroups=language&language=js#get-a-public-url-for-a-transformed-image   */

module.exports = {
    images: {
      loader: 'custom',
      loaderFile: './supabase-image-loader.js',
    },
  }


module.exports = nextConfig 