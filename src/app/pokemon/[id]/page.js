"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await res.json();
        setPokemon({
          id: data.id,
          name: data.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          types: data.types.map((t) => t.type.name),
          stats: data.stats,
          abilities: data.abilities.map((a) => a.ability.name),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) return <div className="text-red-500 p-4">Pokémon not found.</div>;

  return (
    <main className="ml-64 flex flex-col flex-1 p-2 gap-2 background-image">
      <div className="flex flex-col items-start gap-6">
        <h1 className="capitalize text-4xl font-bold">{pokemon.name}</h1>
        <Image src={pokemon.sprite || "/missing-sprite.png"} alt={`${pokemon.name} sprite`} width={256} height={256} />

        <div className="flex flex-col gap-4">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Type</h2>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((type) => (
                <span key={type} className="capitalize">
                  {type}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Abilities</h2>
            <ul>
              {pokemon.abilities.map((ability) => (
                <li key={ability} className="capitalize">
                  {ability}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Stats</h2>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="capitalize">
                  <div className="flex justify-between gap-5">
                    <p>{stat.stat.name}:</p>
                    <p className="font-semibold">{stat.base_stat}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
