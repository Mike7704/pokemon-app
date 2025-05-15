"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile Header with Burger Icon */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800 text-white px-4 py-3 z-1 flex items-center justify-between h-17 shadow">
        <button onClick={() => setOpen(true)} aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
        <Image src="/pokemon-logo.png" alt="Pokémon" width={120} height={40} className={`${open ? "hidden" : ""}`} />
      </div>

      {/* Sidebar (Desktop + Mobile Slide-in) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-1 transform transition-transform md:duration-0 duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-between items-center p-4">
          <Image src="/pokemon-logo.png" alt="Pokémon" width={160} height={73} />
          <button onClick={() => setOpen(false)} aria-label="Close Menu">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col flex-1 h-full p-4">
          <Image src="/pokemon-logo.png" alt="Pokémon" width={200} height={73} className="hidden md:block mb-6" />

          <nav className="flex flex-col gap-2">
            <Link
              className="px-3 py-2 bg-gray-700 hover:bg-yellow-500 hover:text-black rounded"
              href="/whos-that-pokemon"
              onClick={() => setOpen(false)}
            >
              Who's That Pokémon?
            </Link>
          </nav>

          <div className="mt-6 flex flex-col gap-2 overflow-auto">
            <h3 className="text-lg font-semibold">Generations</h3>
            {generations.map((g) => (
              <Link
                key={g.num}
                href={`/?gen=${g.num}`}
                onClick={() => setOpen(false)}
                className="px-3 py-2 bg-gray-700 hover:bg-yellow-500 hover:text-black rounded"
              >
                Gen {g.num} <span className="text-sm text-gray-400">({g.range})</span>
              </Link>
            ))}
          </div>

          <footer className="mb-23 md:mb-0 mt-auto text-sm text-gray-400 pt-6 border-t border-gray-500">
            Developed by Michael Cowley
          </footer>
        </div>
      </aside>
    </>
  );
}
