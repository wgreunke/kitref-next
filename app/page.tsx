import Image from "next/image";
import Link from 'next/link'
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


//Get data from supabase
const { data, error } = await supabase
  .from('cards')
  .select('*')

export default function Home() {
  return (
    <div>
      <h3>The best place for Milwaukee Packout Tips and Tricks</h3>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>This is main</h2>
        {/* Remove or modify this line that's causing the error */}
        {/* <h2>{data}</h2> */}

        {data?.map((card) => (
          <Link 
            href={`/products/${card.card_id}`} 
            key={card.card_id}
            className="text-blue-600 hover:underline"
          >
            {card.card_title}
          </Link>
        ))}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h2>This is footer</h2>
      </footer>
    </div>
  );
}
