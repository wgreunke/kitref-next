//This is a simple component that just strips out the javascipt from embeeded code.

import Script from 'next/script'
//Note to prevent cross-site scripting attacks, 
//need to add some security measures. like Dompurify.

//Need to add error checking if the embeded link is not valid.




export default function RedditSimpleComponent({ RedditEmbededLink }: { RedditEmbededLink?: string })
{
    // Use the nullish coalescing operator
    const testLink = `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by<a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in<a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`;

    const embeddedLink = RedditEmbededLink ?? testLink;

    function TextBeforeScript(embed: string)
    {
        const textBeforeScript = embed.split('<script')[0];
        return textBeforeScript;
    }

    return (
        <div>
            <div 
                style={{ width: '300px', margin: '0 auto' }}
                dangerouslySetInnerHTML={{ __html: TextBeforeScript(embeddedLink) }}
            />
            <Script 
                src="https://embed.reddit.com/widgets.js"
                strategy="afterInteractive"
                async
            />
        </div>
    )
}
