import React from 'react';

export default async function Cards({
   params, 
}: {  
     params: Promise<{ cardid:string}>;
}) {
     const cardid = (await params).cardid;
 
     return (
    <div>
      <h2>cards</h2>
      <p> {cardid}</p>
    </div>
     );
}


