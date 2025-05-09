export async function getPokemonDetails(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();

  const flavorText =
    speciesData.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f|\n|\r/g, " ") || "No description available.";

  // Evolution chain
  const evolutionRes = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionRes.json();
  const evolutionChain = [];
  let evo = evolutionData.chain;

  while (evo) {
    const evoName = evo.species.name;
    const evoRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
    const evoData = await evoRes.json();
    evolutionChain.push({
      name: evoName,
      id: evoData.id,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoData.id}.png`,
    });
    evo = evo.evolves_to[0];
  }

  // Type effectiveness
  const typeRes = await Promise.all(data.types.map((t) => fetch(`https://pokeapi.co/api/v2/type/${t.type.name}`)));
  const typeData = await Promise.all(typeRes.map((res) => res.json()));
  const weaknesses = new Set();
  const strengths = new Set();

  typeData.forEach((type) => {
    type.damage_relations.double_damage_from.forEach((t) => weaknesses.add(t.name));
    type.damage_relations.double_damage_to.forEach((t) => strengths.add(t.name));
  });

  return {
    pokemon: {
      id: data.id,
      name: data.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      types: data.types.map((t) => t.type.name),
      stats: data.stats,
      abilities: data.abilities.map((a) => a.ability.name),
      weight: data.weight,
      height: data.height,
    },
    description: flavorText,
    evolution: evolutionChain,
    typeEffectiveness: {
      strengths: Array.from(strengths),
      weaknesses: Array.from(weaknesses),
    },
  };
}
