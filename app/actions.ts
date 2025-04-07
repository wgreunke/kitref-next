//These are the functions that handle the form actions.
'use server'
import {revalidatePath} from "next/cache"
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

//Need to parse the input data to validate it.
//Try out zod for this.
//https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts


export async function createCardAction(
    prevState: {message: string},
    formData: FormData
)
{
    const card_name = formData.get('card_name')
    const parent_card_id = formData.get('parent_card_id')



//For now, just send message.  Later will add to db.
return {message: "Card created just now"}

}

