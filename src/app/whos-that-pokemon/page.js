"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getRandomPokemon } from "@/api/getRandomPokemon";

export default function WhosThatPokemon() {
  const [generation, setGeneration] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState("");
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true);
      try {
        const pokemonData = await getRandomPokemon(generation);
        setPokemon(pokemonData);
      } catch (err) {
        console.error("Failed to load Pokémon:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, [generation]);

  const handleGuess = () => {
    const isAnswerCorrect = guess.trim().toLowerCase() === pokemon.name.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setHasGuessed(true);

    setScore((prev) => ({
      correct: prev.correct + (isAnswerCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const resetGame = () => {
    setHasGuessed(false);
    setGuess("");
    setPokemon(null);
    setIsCorrect(false);
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const newPokemon = await getRandomPokemon(generation);
        setPokemon(newPokemon);
      } catch (err) {
        console.error("Failed to load new Pokémon:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  };

  return (
    <main className="md:ml-64 md:mt-0 mt-17 flex flex-col flex-1 justify-center p-2 gap-6">
      <div className="background2-image"></div>
      <div className="flex flex-col items-center self-center text-center gap-6 max-w-md w-full lg:self-start lg:ml-25">
        <h1 className="md:text-4xl text-3xl font-bold">Who&apos;s That Pokémon?</h1>

        <div className="flex items-center gap-2">
          <label className="text-md font-semibold">Select Generation:</label>
          <select
            value={generation}
            onChange={(e) => setGeneration(Number(e.target.value))}
            className="ml-2 p-2 rounded border"
          >
            {Array.from({ length: 9 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Gen {i + 1}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-lg font-semibold h-110.5">Loading...</p>
        ) : (
          <>
            <Image
              src={pokemon.sprite}
              alt="Who's that Pokémon?"
              width={256}
              height={256}
              className={`select-none pointer-events-none user-drag-none transition duration-500 ${
                hasGuessed ? "brightness-100" : "brightness-0"
              }`}
              draggable="false"
            />

            {!hasGuessed ? (
              <>
                <input
                  type="text"
                  placeholder="Enter your guess..."
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  className="w-full p-3 bg-white border rounded-lg shadow"
                />
                <button
                  onClick={handleGuess}
                  className="w-40 p-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 cursor-pointer"
                >
                  Submit Guess
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold h-11">
                  {isCorrect ? `Correct! It's ${pokemon.name}!` : `Incorrect! It's ${pokemon.name}!`}
                </h2>
                <button
                  onClick={resetGame}
                  className="w-40 p-3 bg-green-600 text-white rounded shadow hover:bg-green-700 cursor-pointer"
                >
                  Play Again
                </button>
              </>
            )}
            <p className="text-lg font-medium">
              Score: {score.correct} / {score.total}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
