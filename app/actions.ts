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
    //Build the card id
    const mfg_name = formData.get('mfg_name')
    const model_number = formData.get('model_number')
    const card_id = `${mfg_name}-${model_number}`


    const card_title = formData.get('card_title')
    const parent_card_id = formData.get('parent_card_id')
    const card_description = formData.get('card_description')
    const card_source = formData.get('card_source')
    const embed_code = formData.get('embed_code')



//For now, just send message.  Later will add to db.
return {message: "Card created just now"}

}

