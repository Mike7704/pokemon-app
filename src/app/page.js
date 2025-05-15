import { Suspense } from "react";
import PokeDex from "@/components/Pokedex";

export default function Home() {
  return (
    <Suspense fallback={<div className="md:ml-64 md:mt-0 mt-17 p-4">Loading Pokédex...</div>}>
      <PokeDex />
    </Suspense>
  );
}
