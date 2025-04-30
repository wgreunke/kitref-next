import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import RedditSimpleComponent from '@/app/components/RedditSimpleComponent'
import Image from 'next/image'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)


const { data: imageUrl } = await supabase.storage
    .from('kitref-images')
    .getPublicUrl('Milwaukee_48-22-8440.webp');


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
        <div className="bg-red-700 text-white p-4 flex ">
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
          <h2 className="text-2xl font-bold text-gray-900">{card.card_title}</h2>
         <br/>
          <p>{card.card_body}</p>
          
            <p>Manufacturer: {card.mfg}</p>
            <p>Model: {card.model_number}</p>
            <p><Link className="text-blue-600 hover:text-blue-800 hover:underline"
            href={`${card.main_url}`} target="_blank" rel="noopener noreferrer">View product source</Link></p>
           

         //show image
     
          
        </div>

        {/* ********************** Child Cards Section *************************** */}
        {child_cards && child_cards.length > 0 ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center">Accessories and Ideas</h2>
            <hr className="my-4 border-gray-300"/>
            <div>
              {child_cards.map((child) => (
                <div key={child.child_card}>
                  {child.source === "Reddit" ? (
                    <div>
                    <h3 className="font-semibold text-lg  mt-2 max-w-md">{child.card_title}</h3>
                    <RedditSimpleComponent RedditEmbededLink={child.embed_code} />
                    </div>
                  ) : (
                    <div className="flex flex-col ">
                      <div className="flex  space-x-4">
                        <p className="font-bold text-gray-500">{child.source}</p>
                        <Link 
                          href={`/products/${child.child_card}`}>
                          <p className="text-blue-500">Edit</p>                        
                        </Link>
                      </div>
                      <h3 className="font-semibold text-lg  ">{child.card_title}</h3>
                      <p>Image here</p>

                      <p>{child.card_body}</p> 
                      <Link 
                        href={child.main_url}
                        className="text-blue-600 hover:text-blue-800 hover:underline inline-flex">
                       <h3 className="font-semibold text-lg text-blue-500">Go to Source: {child.source}</h3>
                      </Link>
                    <br/>
                    </div>
                  )}
                               <hr className="my-4 border-gray-300"/>
                </div>
              ))}

            </div>
          </div>
        ) : (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No related products found</p>
          </div>
        )}
       <Link className="text-blue-600 hover:text-blue-800 hover:underline" href={`/newcard/${card_id}`}>Add a child card.</Link>
 
      </div>

        
    </div>
  )
}