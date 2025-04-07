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
            <br/>
        <form action={formAction} className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="card_name" className="block text-sm font-medium text-gray-700 mb-2">Card Name</label>
                <input 
                    type="text" 
                    name="card_name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="Enter card name"
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


