//This page is used to test db connection.  
import { createClient } from '../../utils/supabase/server'
import Link from 'next/link'

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
      <pre>{JSON.stringify(parents, null, 2)}</pre>
    </div>
  );
}

