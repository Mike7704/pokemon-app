export async function getPokemonByGeneration(generation) {
  try {
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
            name: pokemon.name,
            sprite: "/missing-sprite.png",
            types: [],
          };
        }
      })
    );

    return detailedData.sort((a, b) => a.id - b.id);
  } catch (err) {
    console.error("Error in getPokemonByGeneration:", err);
    return [];
  }
}
