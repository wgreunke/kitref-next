//This shows a blank form for a new card.
//The user first navigates to a product page then
//Clicks new child and arrives at this page.
//Show a blank form.  When the form is submitted,
//Add the card and and create the association betwen the parent and child.

import { createClient } from '@supabase/supabase-js'
import { NewCardComponent } from "../../components/NewCardComponent"

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Ensure this is a Server Component
export default async function NewCard({ params }: {
    params: Promise<{ card_id: string }>
}) {
    const { card_id } = await params;
    
    return (
        <div>
            <NewCardComponent card_id={card_id} />
        </div>
    );
}

