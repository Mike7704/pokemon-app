"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PokemonDetails() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch Pokémon details based on ID
    const fetchPokemon = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await res.json();
        setPokemon({
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          types: data.types.map((t) => t.type.name),
          stats: data.stats,
          abilities: data.abilities.map((a) => a.ability.name),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [id]); // Re-run when ID changes

  if (isLoading) {
    return <div>Loading Pokémon details...</div>;
  }

  if (!pokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <main className="ml-64 flex flex-col flex-1 p-2 gap-2 background-image">
      <h1 className="capitalize text-2xl font-semibold text-white">{pokemon.name}</h1>
      <Image src={pokemon.sprite || "/missing-sprite.png"} alt={`${pokemon.name} sprite`} width={256} height={256} />
      <div>
        <h2 className="text-xl">Types</h2>
        <ul className="flex flex-col">
          {pokemon.types.map((type) => (
            <li key={type} className="text-lg">
              {type}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl">Abilities</h2>
        <ul className="flex flex-col">
          {pokemon.abilities.map((ability) => (
            <li key={ability} className="text-lg">
              {ability}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl">Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="flex flex-col">
              <p>
                {stat.stat.name}: {stat.base_stat}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
