//This is a simple component that just strips out the javascipt from embeeded code.

import Script from 'next/script'
//Note to prevent cross-site scripting attacks, 
//need to add some security measures. like Dompurify.




export default function RedditSimpleComponent()
{

const sampleEmbededLink = `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by<a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in<a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`

function TextBeforeScript(embed: string)
{
    const textBeforeScript = embed.split('<script')[0];
    return textBeforeScript;
}



    return (
        <div>
            <h1>Reddit Simple Component</h1>
            <div 
                style={{ width: '300px', margin: '0 auto' }}
                dangerouslySetInnerHTML={{ __html: TextBeforeScript(sampleEmbededLink) }}
            />
            <Script 
                src="https://embed.reddit.com/widgets.js"
                strategy="afterInteractive"
                async
            />
        </div>
    )
}
