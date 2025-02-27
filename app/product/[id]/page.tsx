import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: {
    id: string
  }
}

async function ProductPage({ params }: PageProps) {
  const { data: product, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_id', params.id)
    .single()

  if (error) {
    return <div>Error loading product: {error.message}</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Link 
        href="/" 
        className="inline-block mb-4 text-blue-600 hover:text-blue-800 hover:underline"
      >
        ← Back to Home
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">{product.card_title}</h1>
      {product.main_card_image && (
        <Image 
          src={product.main_card_image}
          alt={product.card_title || 'Product image'}
          width={400}
          height={400}
        />
      )}
      <p className="my-4">{product.card_body}</p>
      <div className="mt-4">
        <p>Manufacturer: {product.mfg}</p>
        <p>Model: {product.model_number}</p>
        {product.mfg_price && <p>Price: ${product.mfg_price}</p>}
      </div>
    </div>
  )
}

export default ProductPage
