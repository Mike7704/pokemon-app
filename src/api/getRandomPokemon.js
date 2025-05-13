const generationRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1010],
};

export async function getRandomPokemon(generation) {
  const [min, max] = generationRanges[generation] || generationRanges[1];
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  if (!res.ok) throw new Error(`Failed to fetch Pokémon with ID ${randomId}`);

  const data = await res.json();

  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.other["official-artwork"].front_default,
  };
}
