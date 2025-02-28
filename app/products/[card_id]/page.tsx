import React from 'react';
import { createClient } from '@supabase/supabase-js'

export default async function ProductPage({
  params,
}: {
  params: { card_id: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  // Fetch the specific card data
  const { data: card, error } = await supabase
    .from('cards')
    .select('*')
    .eq('card_id', params.card_id)
    .single();

  if (error) {
    return <div>Error loading card</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{card.card_title}</h1>
      <p>{card.card_body}</p>
      {card.main_card_image && (
        <img 
          src={card.main_card_image} 
          alt={card.card_title} 
          className="mt-4 max-w-md"
        />
      )}
      {/* Add any other card fields you want to display */}
    </div>
  );
}


