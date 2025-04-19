'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MyImage() {
  const [buckets, setBuckets] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [imageUrl, setImageUrl] = useState<string>('https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p//Milwaukee_48-22-8440%20.webp');



  return (
    <div>

        <img src={imageUrl} alt="My Image" />
      <h2>Storage Buckets:</h2>
    
    </div>
  );
}
