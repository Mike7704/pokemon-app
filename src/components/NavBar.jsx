import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  const generations = [
    { num: 1, range: "1-151" },
    { num: 2, range: "152-251" },
    { num: 3, range: "252-386" },
    { num: 4, range: "387-493" },
    { num: 5, range: "494-649" },
    { num: 6, range: "650-721" },
    { num: 7, range: "722-809" },
    { num: 8, range: "810-905" },
    { num: 9, range: "906-1010" },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <Image src={"/pokemon-logo.png"} alt={"Pokémon"} width={200} height={73} />
      <nav className="flex flex-col gap-2 mt-8">
        <Link
          className="text-left px-3 py-2 bg-gray-700 hover:bg-yellow-500 hover:text-black rounded"
          href="/whos-that-pokemon"
        >
          Who's That Pokémon?
        </Link>
      </nav>

      <div className="flex flex-col flex-grow overflow-auto gap-1 mt-4">
        <h3 className="text-lg font-semibold">Generations</h3>
        <div className="flex flex-col gap-2">
          {generations.map((generation, index) => (
            <Link
              key={index}
              href={`/?gen=${generation.num}`} // Query params for generation range
              className="text-left px-3 py-2 bg-gray-700 hover:bg-yellow-500 hover:text-black rounded"
            >
              Gen {generation.num} <span className="text-sm text-gray-400">({generation.range})</span>
            </Link>
          ))}
        </div>
      </div>

      <footer className="text-sm text-gray-400 pt-4 border-t border-gray-400">Developed by Michael Cowley</footer>
    </aside>
  );
}
