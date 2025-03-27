//This page is for associating existing cards with a new card.
//It will take in a card_id and then display all the cards that are not associated with it.
//This page will have to work on the client side
'use client'
//This is hack, load all the cards on the server side and then have a serch to narrow down the card.
//This is a hack because it loads all cards on the server side.



import { useSearchParams } from 'next/navigation';

export default function AssociateCards() {
    //Grab the card_id from the url
    const card_id = useSearchParams().get('card_id');

    //Get all the cards 


    
    return(
    <div>
        <p>Associate Cards</p>
        <p>Card Id: {card_id}</p>
    </div>)

}