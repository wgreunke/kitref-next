export default function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">About KitRef</h1>
      
      <div className="prose max-w-none">
        <p className="mb-4">
          Milwaukee tools are seen on every jobsite and are carried in the ubiquitous red Packout rolling tool boxes. This combination has unleashed a flurry of creativity from the 3d printing world to create a wide range of organizers, accessories and storage solutions.
        </p>
        
        <p className="mb-4">
          KitRef's mission is to connect you with the ever growing selection of accessories and solutions so you can find what you need and get the job done.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">What We Offer</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Comprehensive kit information</li>
          <li>Manufacturer details and links</li>
          <li>Model numbers and specifications</li>
          <li>Direct links to manufacturer websites</li>
        </ul>

        <p className="mt-4">
          KitRef is not affiliated with Milwaukee or any of its products.
        </p>
      </div>
    </div>
  );
}