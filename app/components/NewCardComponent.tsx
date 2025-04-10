"use client"
import  {useActionState} from "react"
import { useFormStatus } from "react-dom"
import {createCardAction} from "@/app/actions"

const initialState = {message: ""};

function SubmitButton() {
    const {pending} = useFormStatus()
    return <button 
        type="submit" 
        aria-disabled={pending}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded shadow transition duration-200 ease-in-out disabled:opacity-50"
    >
        Add a new card
    </button>
}

export function NewCardComponent({ cardId }: { cardId: string }) {
    const [state, formAction] = useActionState(createCardAction, initialState)

    return (
        <div className="bg-red-50">
            <p>This is the new card component. {cardId}</p>
            <br/>
        <form action={formAction} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="mfg_name" className="block text-sm font-medium text-gray-700 mb-2">Mfg Name: Use website name if not manufacturer.  Eg: Amazon, Etsy, etc.</label>
                <input 
                    type="text" 
                    name="mfg_name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter mfg name"
                />
                <label htmlFor="model_number" className="block text-sm font-medium text-gray-700 mb-2">Model Number: Use the id in the url if no model number.</label>
                <input 
                    type="text" 
                    name="model_number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter model number"
                />
                <label htmlFor="card_family" className="block text-sm font-medium text-gray-700 mb-2">Card Family</label>
                <input 
                    type="text" 
                    name="card_family" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter Family"
                />

                <label htmlFor="card_title" className="block text-sm font-medium text-gray-700 mb-2">Card Name</label>
                <input 
                    type="text" 
                    name="card_title" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter card title"
                /> 
                <label htmlFor="card_description" className="block text-sm font-medium text-gray-700 mb-2">Card Description</label>
                <textarea
                    name="card_description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter card description"
                />
                
                <label htmlFor="card_type" className="block text-sm font-medium text-gray-700 mb-2">Card Source</label>
                <select
                    name="card_type"
                    id="card_type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a type</option>
                    <option value="Product">Product</option>
                    <option value="Accessory">Accessory</option>
                    <option value="Other">Other</option>
                </select>
                

                <label htmlFor="main_url" className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
                <textarea
                    name="main_url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the link to the page. "
                />


                <label htmlFor="card_source" className="block text-sm font-medium text-gray-700 mb-2">Card Source</label>
                <select
                    name="card_source"
                    id="card_source"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a source</option>
                    <option value="Reddit">Reddit</option>
                    <option value="Amazon">Amazon</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Etsy">Etsy</option>
                    <option value="OEM">OEM</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="embed_code" className="block text-sm font-medium text-gray-700 mb-2">Embed Code</label>
                <textarea
                    name="embed_code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter embed code"
                />

            </div>
            <input type="hidden" name="parent_card_id" defaultValue={cardId} />
            <div className="mt-6">
                <SubmitButton />
                <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
      </p>
      <p>
        {JSON.stringify(state)}
      </p>
      <p>Message should be above</p>
            </div>
        </form>
        </div>
    );
}


