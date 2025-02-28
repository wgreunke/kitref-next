import React from 'react';

export default async function Cards({
   params, 
}: {  
     params: Promise<{ card_id:string}>;
}) {
     const card_id = (await params).card_id;
 
     return (
    <div>
      <h2>cards</h2>
      <p> {card_id}</p>
    </div>
     );
}


