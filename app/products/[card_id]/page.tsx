import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const RunEmbedCode = ({ embedCode }: { embedCode: string }) => {
  return (
    <div>
      <p>Embed Code:</p>
    </div>
  );
};
 
export default async function Page({  params,}: {
  params: Promise<{ card_id: string }>
}) 
{
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



  const { data: child_cards, error: child_cards_error } = await supabase
  .from('child_cards')
  .select('*')
  .eq('parent_card', card_id);

if (child_cards_error) {
  return <div>Error loading parents: {child_cards_error.message}</div>;
}


  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col">
        <div className="bg-red-700 text-white p-4 flex justify-center">
          <h1 className="text-2xl font-bold">KitRef</h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto p-4">
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="inline-block mb-4 text-blue-600 hover:text-blue-800 hover:underline"
        >
          ← Back to Home
        </Link>

        {/* Product Details */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">{card.card_title}</h1>
         
          <p className="mb-4">{card.card_body}</p>
          <div className="space-y-2">
            <p>Manufacturer: {card.mfg}</p>
            <p>Model: {card.model_number}</p>
            <p><Link className="text-blue-600 hover:text-blue-800 hover:underline"
            href={`${card.main_url}`} target="_blank" rel="noopener noreferrer">Link to page</Link></p>
           </div>
        </div>

        {/* Child Cards Section */}
        {child_cards && child_cards.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <div className="grid gap-4">
              {child_cards.map((child) => (
                <div key={child.child_card}>
                  <Link 
                    href={`/products/${child.child_card}`}
                    className="flex items-center gap-4"
                  >
                   
                    <div>
                      <h3 className="font-semibold text-lg text-red-700">
                        {child.child_card}
                      </h3>
                      {child.model_number && (
                        <p className="text-gray-600">Model: {child.model_number}</p>
                      )}
                    </div>
                  </Link>
                  <p>Title: {child.card_title}</p>
                  <p> {child.card_body}</p>


                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No related products found</p>
          </div>
        )}

      </div>
        <p>Associate Existing cards</p>
        <Link className="text-blue-600 hover:text-blue-800 hover:underline" href={`/associate?card_id=${card_id}`}>Add a child card.</Link>
        <a 
          href={`https://kitref-child.streamlit.app?page_action=show_card_list&parent_card_id=${card_id}`} 
          className="text-blue-600 hover:text-blue-800 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Add a child card. ST
        </a>

    </div>
  )
}