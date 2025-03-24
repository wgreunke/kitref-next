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
  const selectedFamily = params.family || 'Packout';

  // Fetch cards filtered by family
  const { data: filteredData, error: filteredError } = await supabase
    .from('cards')
    .select('*')
    .eq('card_family', selectedFamily)
    .eq('mfg', 'Milwaukee');

  const groupedByMfg = (filteredData || []).reduce((acc, card) => {
    const card_group = card.card_group || 'Other';
    if (!acc[card_group]) {
      acc[card_group] = [];
    }
    acc[card_group].push(card); 
    return acc;
  }, {} as Record<string, typeof filteredData>);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bars */}
      <div className="flex flex-col">
        {/* Text bar */}
        <div className="bg-red-700 text-white p-4 flex justify-center">
          <h1 className="text-2xl font-bold">KitRef</h1>
        </div>

        {/* Image bar */}
        <div className="bg-white p-4 flex justify-center">
          <img 
            src="/hero.png" 
            alt="KitRef Hero" 
            className="h-24 w-auto"
          />
        </div>

        {/* Tagline bar */}
        <div className="bg-white p-4 flex justify-center border-b">
          <p className="text-sm font-bold text-center max-w-md">
            Linking the Ecosystem of Milwaukee Tools, Storage and Accessories
          </p>
        </div>
      </div>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 p-4 border-r-2 border-red-700 min-h-screen">
          <h4 className="text-2xl font-bold mb-4">Products</h4>
          <div className="flex flex-col gap-2">
            <Link 
              href="/?family=M12" 
              className={`text-blue-600 hover:underline ${selectedFamily === 'M12' ? 'font-bold' : ''}`}
            >
              M12
            </Link>
            <Link 
              href="/?family=M18" 
              className={`text-blue-600 hover:underline ${selectedFamily === 'M18' ? 'font-bold' : ''}`}
            >
              M18
            </Link>
            <Link 
              href="/?family=Packout" 
              className={`text-blue-600 hover:underline ${selectedFamily === 'Packout' ? 'font-bold' : ''}`}
            >
              Packout
            </Link>
            <Link 
              href="/?family=M18 / M12" 
              className={`text-blue-600 hover:underline ${selectedFamily === 'M18 / M12' ? 'font-bold' : ''}`}
            >
              M18/M12
            </Link>
          </div>
          <br></br>
          <hr className="border-red-700"></hr>
          <br></br>
          <Link href="https://kitref.streamlit.app/" className="text-blue-600 hover:underline">Add New Card</Link>
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
    </div>
  );
} 