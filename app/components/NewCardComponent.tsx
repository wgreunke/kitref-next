"use client"
import  {useActionState} from "react"
import { useFormStatus } from "react-dom"
import {createCardAction} from "@/app/actions"


function SubmitButton() {
    const {pending} = useFormStatus()
    return <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
    </button>
}


export default function NewCardComponent({ cardId }: { cardId: string }) {
    const [state, formAction] = useActionState(createCardAction, null)

    return (
        <div>
            <p>This is the new card component. {cardId}</p>
        <form action={formAction}>
            <label htmlFor="card_name">Card Name</label>
            <input type="text" name="card_name" /> 
            <input type="text" name="parent_card_id" value={cardId} />
            <SubmitButton />
        </form>
        </div>
    );
}


