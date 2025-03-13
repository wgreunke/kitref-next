import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t mt-8 py-4">
      <div className="container mx-auto flex justify-center gap-8">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        
        <Link href="/about" className="text-blue-600 hover:underline">
          About
        </Link>

        <Link 
          href="https://forms.gle/FR8BU4oB6TYeVjC47" 
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </Link>
      </div>
    </footer>
  );
}