import Image from "next/image";

export default function Home() {
  return (
    <div >
      <h3>The best place for Milwaukee Packout Tips and Tricks</h3>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>This is main</h2>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h2>This is footer</h2>
      </footer>
    </div>
  );
}
