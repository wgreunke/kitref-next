import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import RedditSimpleComponent from '@/app/components/RedditSimpleComponent'
import Image from 'next/image'
import { createNewCardIDwithParent } from '@/app/actions'

// Create a single instance of the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

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

//Get all the parents of the card
const { data: parents, error: parents_error } = await supabase
  .from('card_parents')
  .select('*')
  .eq('child_card', card_id);

if (parents_error) {
  return <div>Error loading parents: {parents_error.message}</div>;
}

//Get all the child cards of the card
  const { data: child_cards, error: child_cards_error } = await supabase
  .from('child_cards')
  .select('*')
  .eq('parent_card', card_id)
  .eq('active_card', "TRUE");

if (child_cards_error) {
  return <div>Error loading parents: {child_cards_error.message}</div>;
}


//***********************  Return ******************************* */

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col">
        <div className="bg-red-700 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">KitRef</h1>
          <div className="flex items-center space-x-4">
            {/*<a href="/login" className="text-white hover:text-gray-300">Login</a>*/}
            <form action={createNewCardIDwithParent} className="inline-block">
                <input type="hidden" name="parentCardID" value={card_id} />
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    New Child Card
                </button>
            </form>
          </div>
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
         <Image src={`https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p/${card.main_card_image}`} alt={card.card_title} width={300} height={300} />
                     
          <p>{card.card_body}</p>
          
            <p>Manufacturer: {card.mfg}</p>
            <p>Model: {card.model_number}</p>
            <p><Link className="text-blue-600 hover:text-blue-800 hover:underline"
            href={`${card.main_url}`} target="_blank" rel="noopener noreferrer">View product source</Link></p>
           

        
     
          
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
                      <div className="flex gap-4 items-start">
                        <Image src={`https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p/${child.main_card_image}`} alt={ '.'} width={120} height={120}  className="flex-shrink-0" />
                        <div>
                          <p dangerouslySetInnerHTML={{ __html: child.card_body?.split('\n').slice(0, 5).join('<br>') || '' }}></p> 
                          {child.main_url && (
                            <Link 
                              href={child.main_url}
                              className="text-blue-600 hover:text-blue-800 hover:underline inline-flex">
                             <h3 className="font-semibold text-lg text-blue-500">Go to Source: {child.source}</h3>
                            </Link>
                          )}
                        </div>
                      </div>
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
        <form action={createNewCardIDwithParent} className="inline-block">
            <input type="hidden" name="parentCardID" value={card_id} />
            <button 
                type="submit" 
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
                Create a new child card
            </button>
        </form>

<br/>
<p>Parents:</p>
{parents.map((parent) => (
  <div key={parent.parent_card}>
    <Link href={`/products/${parent.parent_card}`}>
      <p className="text-blue-600 hover:text-blue-800 hover:underline">{parent.parent_card}</p>
    </Link>
  </div>
))}


      </div>

        
    </div>
  )
}