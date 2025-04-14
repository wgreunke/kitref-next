//This page is used to test db connection.  
import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
import RedditSimpleComponent from '../components/RedditSimpleComponent'

export default async function TestPage() {
  const supabase = createClient()
  
  const { data: parents, error } = await supabase
    .from('child_cards')
    .select('*')
    .eq('parent_card', 'Milwaukee_123');

    const sampleEmbededLink = `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="740"><a href="https://www.reddit.com/r/MilwaukeeTool/comments/1ju3sk4/new_packout_bit_organizer/">New Packout Bit Organizer!</a><br> by<a href="https://www.reddit.com/user/Minute_Brilliant2796/">u/Minute_Brilliant2796</a> in<a href="https://www.reddit.com/r/MilwaukeeTool/">MilwaukeeTool</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`


  if (error) {
    return <div>Error loading parents: {error.message}</div>;
  }

  return (
    <div>
      <h1>Test Page</h1>

      {/*<pre>{JSON.stringify(parents, null, 2)}</pre>*/}
      
      <RedditSimpleComponent RedditEmbededLink={sampleEmbededLink} />
    </div>
  );
}

