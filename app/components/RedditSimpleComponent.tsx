'use client'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

declare global {
    interface Window {
        rembeddit?: {
            init: () => void;
        };
    }
}

export default function RedditSimpleComponent({ RedditEmbededLink }: { RedditEmbededLink?: string }) {
    const embedContainerRef = useRef<HTMLDivElement>(null)
    // Using useRef instead of useState to avoid hydration mismatches
    const scriptLoadedRef = useRef(false)
    // Use useState with client-side only rendering
    const [isClient, setIsClient] = useState(false)
    
    const testLink = `<blockquote class="reddit-embed-bq" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by <a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in <a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote>`

    const embeddedLink = RedditEmbededLink ?? testLink

    // Set isClient to true once component is mounted on client
    useEffect(() => {
        setIsClient(true)
    }, [])

    // Handle script loading and Reddit embed initialization
    useEffect(() => {
        if (isClient && embedContainerRef.current) {
            // Only run this on the client side
            const script = document.createElement('script')
            script.src = 'https://embed.reddit.com/widgets.js'
            script.async = true
            script.onload = () => {
                scriptLoadedRef.current = true
                
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    if (window.rembeddit) {
                        try {
                            window.rembeddit.init()
                            console.log('Reddit embed initialized')
                        } catch (error) {
                            console.error('Error initializing Reddit embed:', error)
                        }
                    }
                }, 300)
            }
            
            document.body.appendChild(script)
            
            // Cleanup function
            return () => {
                if (script.parentNode) {
                    script.parentNode.removeChild(script)
                }
            }
        }
    }, [isClient])

    return (
        <div className="reddit-embed-wrapper">
            {/* Only render the content on the client side to avoid hydration mismatch */}
            {isClient ? (
                <div
                    ref={embedContainerRef}
                    style={{ 
                        width: '100%', 
                        maxWidth: '400px', 
                        margin: '0 auto',
                        minHeight: '100px' 
                    }}
                    dangerouslySetInnerHTML={{ __html: embeddedLink }}
                />
            ) : (
                <div 
                    style={{ 
                        width: '100%', 
                        maxWidth: '650px', 
                        margin: '0 auto',
                        minHeight: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px'
                    }}
                >
                    <p>Loading Reddit content...</p>
                </div>
            )}

            <style jsx global>{`
                .reddit-embed-wrapper iframe {
                    width: 100% !important;
                    min-height: 400px;
                }
                .reddit-embed-bq {
                    border: none !important;
                    margin-bottom: 0 !important;
                }
            `}</style>
        </div>
    )
}