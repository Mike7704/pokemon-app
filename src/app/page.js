import { Suspense } from "react";
import PokeDex from "@/components/Pokedex";

export default function Home() {
  return (
    <Suspense fallback={<div className="ml-64 p-4 text-white">Loading Pokédex...</div>}>
      <PokeDex />
    </Suspense>
  );
}
