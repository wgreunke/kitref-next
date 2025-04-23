import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.kitref.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.kitref.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.kitref.com/products/Milwaukee_48-22-8440',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
  ]
}