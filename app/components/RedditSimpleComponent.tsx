'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'
import DOMPurify from 'dompurify'

export default function RedditSimpleComponent({ RedditEmbededLink }: { RedditEmbededLink?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const testLink = `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by<a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in<a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`;

    const embeddedLink = RedditEmbededLink ?? testLink;

    function TextBeforeScript(embed: string) {
        return embed.split('<script')[0];
    }

    useEffect(() => {
        // Trigger Reddit embed reload after mount
        if (window?.__REDDIT_EMBED__?.load) {
            window.__REDDIT_EMBED__.load();
        }
    }, [embeddedLink]);

    return (
        <div>
            <div
                ref={containerRef}
                style={{ width: '300px', margin: '0 auto' }}
                dangerouslySetInnerHTML={{ __html: TextBeforeScript(embeddedLink) }}
            />
            <Script
                src="https://embed.reddit.com/widgets.js"
                strategy="afterInteractive"
                async
            />
        </div>
    );
}
