//Test supabase image storage


//https://supabase.com/docs/guides/storage/serving/image-transformations?queryGroups=language&language=js

//Use the url method to get the image

import Image from 'next/image';

export default function loadSupaImages() {

return (
    <div>
        <p>This tests loading images from supabase storage</p>
 
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            margin: '20px 0',
            backgroundColor: '#f9f9f9'
        }}>
            <Image src="https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p/Milwaukee_48-22-8440.webp" alt="My Image" width={100} height={100} />
            <div>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Milwaukee_48-22-8440</p>
                <p style={{ margin: '0', color: '#666' }}>Rolling Drawers</p>
            </div>
        </div>

        
        <Image src="https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p/Milwaukee_43-22-8431.png" alt="My Image" width={100} height={100} />
        <Image src="https://mavawegzbegjydapzueh.supabase.co/storage/v1/object/public/kitref-images-p/Milwaukee_48-22-8444.png" alt="My Image" width={100} height={100} />

    </div>
)

}