//These are the functions that handle the form actions.
'use server'
import {revalidatePath} from "next/cache"
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

//Need to parse the input data to validate it.
//Try out zod for this.
//https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts

//When this function is called, the card id is already created.
//This just updates the blank card with the data.
//Do not need to worry about parents becasue they have allready been created and do not
export async function createCardAction(
    prevState: {message: string},
    formData: FormData
)
{
    //Build the card id
    const card_id = formData.get('card_id') as string
    const mfg_name = formData.get('mfg_name')
    const model_number = formData.get('model_number')
    const card_family = formData.get('card_family')
    const card_title = formData.get('card_title')
    const main_url = formData.get('main_url')
    const card_type = formData.get('card_type')
    const card_description = formData.get('card_description')
    const source = formData.get('source')
    const embed_code = formData.get('embed_code')
    
    console.log('Updating card with ID:', card_id, 'Type:', typeof card_id)
    console.log('Model number:', model_number)

    //Check if card_id is null or undefined.  If so, set it to 9999  
    if (card_id === null || card_id === undefined) {
        console.log('Card ID is null or undefined')
    }

    //Add card to supabase
    //Set the card to active
    const {data, error} = await supabase
        .from('cards')
        .update({
            model_number: model_number,
            mfg: mfg_name,
            card_title: card_title,
            card_body: card_description,
            source: source,
            card_family: card_family,
            main_url: main_url,
            embed_code: embed_code,
            active_card: true
        })
        .eq('card_id', card_id.toString())
        


        console.log('Data:', data)
    if (error) {
        console.error('Error updating card:', error)
        return {message: "Error creating card " + error.message}
    }


// Only return success message if both operations succeeded
return {message: "Card created successfully"}

}



//This function creates a blank card and then adds that card to a parent card.
//It returns a card ID that can used to add data in a new card form.
export async function createNewCardIDwithParent(formData: FormData) {
    const parentCardID = formData.get('parentCardID') as string
    //Convert the timstamep to 32 hexidecimal characters
    const card_id = new Date().getTime().toString()
      
    //Add the card to the parent card
    const {data, error} = await supabase
        .from('cards')
        .insert({
            card_id: card_id,
            active_card: false,
        })
      
    if (error) {
        console.error(error)
        return 
    }


    /*
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
*/



    redirect(`/newcard/${card_id}`)
}

