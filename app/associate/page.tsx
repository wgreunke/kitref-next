//This page is for associating existing cards with a parent card
//It will take in a card_id and then display all the cards that are not associated with it.
//Only pull cards where mfg does not equal 'Milwaukee'
//This page will have to work on the client side

'use client'
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Add proper type for your cards
interface Card {
    // Add the properties your card has, for example:
    id: string;
    name: string;
    // ... other properties
}

function AssociateCardsContent() {
  const searchParams = useSearchParams();
  const card_id = searchParams.get('card_id');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCards() {
      try {
        const { data, error } = await supabase
          .from('cards')
          .select('*')
          .neq('mfg', 'Milwaukee');

        if (error) throw error;
        setCards(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  const setChildCard = async (child_card) => {
    try {
      const { error } = await supabase
        .from('child_cards')
        .insert({
          parent_card: card_id,
          child_card: child_card
        })
        .single();

      if (error) throw error;
      window.location.href = `/products/${card_id}`;
    } catch (err) {
      console.error('Error setting child card:', err.message);
    }
  };

  if (loading) return <div>Loading cards...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <p>Choose a card to associate with {card_id}</p>
      <div>
        {cards.map((c) => (
          <div key={c.card_id}>
            <p>{c.card_title}</p>
            <p>{c.mfg}</p>
            <p>{c.model_number}</p>
            <button onClick={() => setChildCard(c.card_id)}>Associate</button>
          </div>
        ))}
      </div>
      <p>Card Id: {card_id}</p>
    </div>
  );
}

export default function AssociateCards() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssociateCardsContent />
    </Suspense>
  );
}