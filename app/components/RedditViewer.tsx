//The RedditViewer takes in embedded reddit posts, decomposes the link then displays the post.
//Need to decompose in order to include the javascript code that runs the post.


//Start with hardcoded link.
export default function RedditViewer()
{
 const sampleEmbededLink = `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by<a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in<a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`
    function getRedditTitle(link: string)
    {
        const title = link.split('/')[4];
        return title;
    }

    function getRedditAuthor(link: string)
    {
        const author = link.split('/')[5];
        return author;
    }

    function getRedditBaseLink(link: string)
    {
        const baseLink = link.split('/')[0];
        return baseLink;
    }


    function getRedditSubreddit(link: string)
    {
        const subreddit = link.split('/')[3];
        return subreddit;
    }

 return (
        <div>
            <h1>Reddit Viewer</h1>
            <h2>{getRedditTitle(sampleEmbededLink)}</h2>
            <h3>{getRedditAuthor(sampleEmbededLink)}</h3>
            <h4>{getRedditBaseLink(sampleEmbededLink)}</h4>
            
        </div>
    )
}

