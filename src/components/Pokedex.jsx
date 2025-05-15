"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPokemonByGeneration } from "@/api/getPokemonByGeneration";
import PokemonCard from "@/components/PokemonCard";

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const generation = searchParams.get("gen") || "1"; // Default to generation 1 if not provided

  // Fetch pokemon list based on generation
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getPokemonByGeneration(generation);
      setPokemonList(data);
      setFilteredList(data);
      setIsLoading(false);
    };

    fetchData();
  }, [generation]); // Rerun when the generation changes

  // Filter pokemon list based on search
  useEffect(() => {
    const results = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredList(results);
  }, [searchTerm, pokemonList]);

  return (
    <main className="md:ml-64 md:mt-0 mt-17 flex flex-col flex-1 p-2 gap-2">
      <div className="background-image"></div>
      <h1 className="text-2xl font-semibold">Pokédex Search</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 bg-white border rounded-lg shadow"
      />

      {isLoading ? (
        <div className="text-lg font-semibold">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 overflow-y-scroll">
          {filteredList.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              types={pokemon.types}
            />
          ))}
        </div>
      )}
    </main>
  );
}
