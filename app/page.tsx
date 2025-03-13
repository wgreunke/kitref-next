import Link from 'next/link'
//Connect to supabase
import { createClient } from '../utils/supabase/server'

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//const supabase = createClient(supabaseUrl, supabaseKey)

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variables for Supabase test');
}

async function getCards() {
  const supabase = createClient();
  const { data, error } = await supabase.from('cards').select('*');
  return data;
}

const supabase = createClient();



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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ family?: string }>;
}) {
  const params = await searchParams;
  const selectedFamily = params.family || 'Milwaukee Packout';

  // Fetch cards filtered by family
  const { data: filteredData, error: filteredError } = await supabase
    .from('cards')
    .select('*')
    .eq('card_family', selectedFamily);

  const groupedByMfg = (filteredData || []).reduce((acc, card) => {
    const mfg = card.mfg || 'Other';
    if (!acc[mfg]) {
      acc[mfg] = [];
    }
    acc[mfg].push(card);
    return acc;
  }, {} as Record<string, typeof filteredData>);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-col gap-2">
          <Link 
            href="/?family=m12" 
            className={`text-blue-600 hover:underline ${selectedFamily === 'm12' ? 'font-bold' : ''}`}
          >
            M12
          </Link>
          <Link 
            href="/?family=m18" 
            className={`text-blue-600 hover:underline ${selectedFamily === 'm18' ? 'font-bold' : ''}`}
          >
            M18
          </Link>
          <Link 
            href="/?family=Milwaukee Packout" 
            className={`text-blue-600 hover:underline ${selectedFamily === 'Milwaukee Packout' ? 'font-bold' : ''}`}
          >
            Milwaukee Packout
          </Link>
          <Link 
            href="/?family=m12-m18" 
            className={`text-blue-600 hover:underline ${selectedFamily === 'm12-m18' ? 'font-bold' : ''}`}
          >
            M12/M18
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-6">{selectedFamily.toUpperCase()} Products</h1>
        {(Object.entries(groupedByMfg) as [string, typeof filteredData][]).sort().map(([mfg, mfgCards]) => (
          <div key={mfg} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{mfg}</h2>
            <div className="ml-4">
              {(mfgCards || [])
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
    </div>
  );
} 