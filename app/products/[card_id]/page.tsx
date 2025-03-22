import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function Page({
  params,
}: {
  params: Promise<{ card_id: string }>
}) {
  const card_id = (await params).card_id

  const { data: card, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_id', card_id)
    .single()

  if (error) {
    console.error('Error fetching card:', error.message)
    return <div>Error loading card</div>
  }

  




  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bars */}
      <div className="flex flex-col">
        {/* Text bar */}
        <div className="bg-red-700 text-white p-4 flex justify-center">
          <h1 className="text-2xl font-bold">KitRef</h1>
        </div>


      </div>

      {/* Main content */}
      <div className="container mx-auto p-4">
        <Link 
          href="/" 
          className="inline-block mb-4 text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-2xl font-bold mb-4">{card.card_title}</h1>
        <p className="text-xl font-bold mb-2">Manufacturer - {card.mfg} : {card.model_number}</p>
        <p>Type: {card.card_type}</p>
        <p>{card.card_body}</p>
        {card.main_url && (
          <a 
            href={card.main_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            Visit {card.mfg}
          </a>
        )}
        <p>{card.type}</p>
        
        <hr className="border-red-700" style={{ marginTop: '10px', marginBottom: '10px' }}></hr> 
        
      <Link 
        href={`https://kitref.streamlit.app/?page_action=edit_card&card_id=${card_id}`} 
        className="text-blue-600 hover:underline"
      >
        EditCard
      </Link>
      </div>
      
    </div>
  )
}