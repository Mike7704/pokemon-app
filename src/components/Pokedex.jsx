"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
                types: details.types.map((t) => t.type.name),
              };
            } catch (err) {
              console.warn(`Error fetching ${pokemon.name}:`, err.message);
              return {
                id: 0,
                name: `${pokemon.name}`,
                sprite: "/missing-sprite.png", // Fallback sprite
                types: [],
              };
            }
          })
        );

        // Sort pokemon by id
        const sortedData = detailedData.sort((a, b) => a.id - b.id);
        // Set the pokemon list and filtered list
        setPokemonList(sortedData);
        setFilteredList(sortedData);
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
    <main className="ml-64 flex flex-col flex-1 p-2 gap-2 background-image">
      <h1 className="text-2xl font-semibold text-white">Pokédex Search</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 bg-white border rounded-lg shadow"
      />

      {isLoading ? (
        <div className="text-lg font-semibold text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 overflow-y-scroll ">
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
