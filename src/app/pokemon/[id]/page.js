"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPokemonDetails } from "@/api/getPokemonDetails";

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [evolution, setEvolution] = useState([]);
  const [typeEffectiveness, setTypeEffectiveness] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { pokemon, description, evolution, typeEffectiveness } = await getPokemonDetails(id);
        setPokemon(pokemon);
        setDescription(description);
        setEvolution(evolution);
        setTypeEffectiveness(typeEffectiveness);
      } catch (err) {
        console.log("Failed to load Pokémon data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return isLoading || !pokemon ? (
    <main className="ml-64 flex flex-col flex-1 p-2 gap-6 overflow-y-auto background-image">
      <p className="text-lg font-semibold">{isLoading ? "Loading..." : "Pokémon not found."}</p>
    </main>
  ) : (
    <main className="ml-64 flex flex-col flex-1 p-2 gap-6 overflow-y-auto background-image">
      <div className="flex flex-col gap-2">
        <h1 className="capitalize text-4xl font-bold">{pokemon.name}</h1>
        <p className="text-lg">{description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Image src={pokemon.sprite} alt={pokemon.name} width={256} height={256} />

        <div className="flex flex-col flex-wrap justify-center gap-2">
          <h2 className="text-2xl font-semibold">Type</h2>
          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <p key={type} className="bg-yellow-300 text-center min-w-20 rounded-full capitalize">
                {type}
              </p>
            ))}
          </div>

          <p className="text-2xl font-semibold">Strong Against</p>
          <div className="flex gap-2 flex-wrap">
            {typeEffectiveness.strengths.map((type) => (
              <p key={type} className="bg-green-600 text-center min-w-20 rounded-full capitalize">
                {type}
              </p>
            ))}
          </div>
          <p className="text-2xl font-semibold">Weak Against</p>
          <div className="flex gap-2 flex-wrap">
            {typeEffectiveness.weaknesses.map((type) => (
              <p key={type} className="bg-red-600 text-center min-w-20 rounded-full capitalize">
                {type}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Abilities</h2>
        <ul className="list-disc list-inside">
          {pokemon.abilities.map((ability) => (
            <li key={ability} className="capitalize">
              {ability}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name} className="capitalize flex justify-between max-w-50">
              <p>{stat.stat.name}: </p>
              <p className="font-semibold">{stat.base_stat}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Physical Attributes</h2>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Evolution Chain</h2>
        <div className="flex gap-4 flex-wrap items-center">
          {evolution.map((stage) => (
            <Link key={stage.id} href={`/pokemon/${stage.id}`} className="text-center group">
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={stage.sprite}
                  alt={stage.name}
                  width={96}
                  height={96}
                  className="group-hover:scale-105 transition-transform"
                />
                <p className="capitalize text-sm">{stage.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
