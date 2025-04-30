"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const generation = searchParams.get("gen") || "1"; // Default to generation 1 if not provided

  // Fetch pokemon list based on generation
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
        const data = await res.json();

        const detailedData = await Promise.all(
          data.pokemon_species.map(async (pokemon) => {
            try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
              if (!res.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
              const details = await res.json();

              return {
                id: details.id,
                name: details.name,
                sprite: details.sprites.front_default,
              };
            } catch (err) {
              console.warn(`Error fetching ${pokemon.name}:`, err.message);
              return {
                id: 0,
                name: `${pokemon.name}`,
                sprite: "/missing-sprite.png", // Fallback sprite
              };
            }
          })
        );

        setPokemonList(detailedData);
        setFilteredList(detailedData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, [generation]); // Rerun when the generation changes

  // Filter pokemon list based on search
  useEffect(() => {
    const results = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredList(results);
  }, [searchTerm, pokemonList]);

  return (
    <main className="ml-64 flex flex-col flex-1 p-2 background-image">
      <h1 className="text-2xl font-semibold text-white">Pokédex Search</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 text-white border rounded"
      />

      {isLoading ? (
        <div className="text-lg font-semibold text-white">Loading...</div>
      ) : (
        <div className="flex flex-wrap overflow-y-auto gap-2 mt-2 mb-2">
          {filteredList.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} sprite={pokemon.sprite} />
          ))}
        </div>
      )}
    </main>
  );
}
