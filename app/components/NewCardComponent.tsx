'use client'
import { useState } from "react";

export default function NewCardComponent({ cardId }: { cardId: string }) {
    const [formData, setFormData] = useState({});

    return (
        <div>
            <h2>Create a New Card</h2>
            <p>Parent Card ID: {cardId}</p>
            {/* Your form here */}
        </div>
    );
}


