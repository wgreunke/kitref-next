//This page is used to test db connection.  
import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!



export default async function TestPage() {
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  const { data: parents, error } = await supabase
    .from('child_cards')
    .select('*')
    .eq('parent_card', 'Milwaukee_123');

  if (error) {
    return <div>Error loading parents: {error.message}</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(parents, null, 2)}</pre>
    </div>
  );
}

