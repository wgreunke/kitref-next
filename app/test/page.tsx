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

  if (error) {
    return <div>Error loading parents: {error.message}</div>;
  }

  return (
    <div>
      <h1>Test Page</h1>

      {/*<pre>{JSON.stringify(parents, null, 2)}</pre>*/}
      
      <RedditSimpleComponent />
    </div>
  );
}

