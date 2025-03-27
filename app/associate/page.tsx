//This page is for associating existing cards with a new card.
//It will take in a card_id and then display all the cards that are not associated with it.
//This page will have to work on the client side
//'use client'
//This is hack, load all the cards on the server side and then have a serch to narrow down the card.
//This is a hack because it loads all cards on the server side.
'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AssociateCards() {
  const searchParams = useSearchParams();
  const card_id = searchParams.get('card_id');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Your async operations here
    }
    fetchData();
  }, [card_id]);

  return (
    <div>
      <p>Associate Cards</p>
      <p>Card Id: {card_id}</p>
    </div>
  );
}