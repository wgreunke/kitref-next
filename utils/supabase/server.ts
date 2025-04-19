//https://kodaschool.com/blog/next-js-and-supabase-how-to-store-and-serve-images

import { createClient as createClientBase } from '@supabase/supabase-js';

export const createClient = () => {
  return createClientBase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}; 