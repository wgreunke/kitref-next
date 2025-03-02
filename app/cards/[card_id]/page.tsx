
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
    <div>
      <h1>{card.card_title}</h1>
      <p>{card.card_description}</p>
    </div>
  )
}
