//These are the functions that handle the form actions.
'use server'
import { createClient } from '@supabase/supabase-js'
import {revalidatePath} from "next/cache"


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)



export async function createCardAction(formData: FormData) {
//Need to parse the input data to validate it.
//Try out zod for this.
//https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts

//For now, just send message.  Later will add to db.
return {message: "Card created"}

}

