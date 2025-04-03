'use client'
import { useState } from "react";

function TestClientComponent() {
    const [count, setCount] = useState(3)
    
    const handleClick = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <h1>Test Client Component</h1>
            <p>Count: {count}</p>
            <button 
                onClick={handleClick}
                style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            >
                Increment Count
            </button>
        </div>
    )
}

export default TestClientComponent;