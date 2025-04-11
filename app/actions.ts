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
    const card_id = `${mfg_name}_${model_number}`


    const card_family = formData.get('card_family')
    const card_title = formData.get('card_title')
    const parent_card_id = formData.get('parent_card_id')
    const main_url = formData.get('main_url')
    const card_type = formData.get('card_type')
    const card_description = formData.get('card_description')
    const source = formData.get('source')
    const embed_code = formData.get('embed_code')


    //Add card to supabase
    const {data, error} = await supabase
        .from('cards')
        .insert({
            card_id: card_id,
            model_number: model_number,
            mfg: mfg_name,
            card_title: card_title,
            card_body: card_description,
            source: source,
            card_family: card_family,
            main_url: main_url,
            embed_code: embed_code
        })

    if (error) {
        console.error(error)
        return {message: "Error creating card " + error.message}
    }

//After you add a child card, add the association between parent and child.
const {data:association_data, error:association_error} = await supabase
.from('card_parents')
.insert({
    parent_card: parent_card_id,
    child_card: card_id
})
if (association_error) {
    console.error(association_error)
    return {message: "Error adding the relationship between parent and child " + association_error.message}
}

// Only return success message if both operations succeeded
return {message: "Card created successfully"}

}

