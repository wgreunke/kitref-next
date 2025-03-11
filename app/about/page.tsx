export default function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">About KitRef</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          Welcome to KitRef, your comprehensive reference for electronic kits and components. 
          Our mission is to provide a centralized resource for electronics enthusiasts, 
          makers, and professionals to find detailed information about various electronic kits 
          and their manufacturers.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">What We Offer</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Comprehensive kit information</li>
          <li>Manufacturer details and links</li>
          <li>Model numbers and specifications</li>
          <li>Direct links to manufacturer websites</li>
        </ul>

        <p className="mt-4">
          This site is maintained as a reference resource for the electronics community. 
          All product information is sourced directly from manufacturers.
        </p>
      </div>
    </div>
  );
}