import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: Props) {
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
    <div>
      <h1>{product.card_title}</h1>
      {product.main_card_image && (
        <Image 
          src={product.main_card_image}
          alt={product.card_title || 'Product image'}
          width={400}
          height={400}
        />
      )}
      <p>{product.card_body}</p>
      <div>
        <p>Manufacturer: {product.mfg}</p>
        <p>Model: {product.model_number}</p>
        {product.mfg_price && <p>Price: ${product.mfg_price}</p>}
      </div>
    </div>
  )
} 