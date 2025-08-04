import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//For now just put the top level pages in the sitemap
//Show Milwaukee Packout organizaer, create...
 
  const { data: filteredData, error: filteredError } = await supabase
  .from('cards')
  .select('*')
  .eq('card_family', 'Packout')
  .eq('mfg', 'Milwaukee')
  .eq('card_type', 'Product')
  .in('card_group', ['Organizer','Crate','Tool Box','Rolling', 'Drawer']);
  
//Create a last modified date that will need to be updated.
const lastModified = "2025-08-04T22:12:00.000Z"
 
 
  return [
    {
      url: 'https://www.kitref.com',
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://www.kitref.com/about',
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
   


    ...(filteredData || []).map((card) => ({
      url: `https://www.kitref.com/products/${card.card_id}`,
      lastModified: lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}