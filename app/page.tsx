import Link from 'next/link'
//Connect to supabase
import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//const supabase = createClient(supabaseUrl, supabaseKey)

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variables for Supabase test');
}

async function getCards() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data, error } = await supabase.from('cards').select('*');
  return data;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

export default async function Home() {
  const data = await getCards();

  // Define the card type with all required fields
  type Card = {
    card_id: string;
    mfg: string;
    card_title: string;
    model_number?: string;  // Added this field as optional
  };

  // First, organize the cards by manufacturer
  const groupedByMfg = (data || []).reduce<Record<string, Card[]>>((acc, card) => {
    const mfg = card.mfg || 'Other';
    if (!acc[mfg]) {
      acc[mfg] = [];
    }
    acc[mfg].push(card);
    return acc;
  }, {});

  return (
    <div className="p-4">
      {(Object.entries(groupedByMfg) as [string, Card[]][]).sort().map(([mfg, mfgCards]) => (
        <div key={mfg} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{mfg}</h2>
          <div className="ml-4">
            
            {mfgCards
              .sort((a, b) => (a.card_title || '').localeCompare(b.card_title || ''))
              .map(card => (
                <div key={card.card_id} className="mb-2">
                  {card.model_number && (
                    <span className="mr-2">{card.model_number}:</span>
                  )}
                  <Link 
                    href={`/products/${card.card_id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {card.card_title}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
