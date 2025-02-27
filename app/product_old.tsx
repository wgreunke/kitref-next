import Image from "next/image";
//Connect to supabase
import { createClient } from '@supabase/supabase-js'



//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//const supabase = createClient(supabaseUrl, supabaseKey)

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variables for Supabase test');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



//Here is the supabase table:
//cards:
/*
[
  {
    "column_name": "card_id",
    "data_type": "text",
    "is_nullable": "NO"
  },
  {
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO"
  },
  {
    "column_name": "card_title",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "main_url",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "model_number",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "card_body",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "mfg",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "card_type",
    "data_type": "character varying",
    "is_nullable": "YES"
  },
  {
    "column_name": "main_card_image",
    "data_type": "text",
    "is_nullable": "YES"
  },
  {
    "column_name": "mfg_price",
    "data_type": "real",
    "is_nullable": "YES"
  }
]
*/


//Get the data for a single product
const product_id = "Weihedesigns_WD-PDDL-3"

// Query single product from Supabase
const { data: product, error } = await supabase
  .from('cards')
  .select('*')
  .eq('card_id', product_id)
  .single() // This ensures we get a single object instead of an array

export default function ProductPage() {
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
