import Image from "next/image";

export default function PokemonCard({ name, sprite }) {
  return (
    <div className="p-2 border rounded-lg shadow bg-white flex items-center space-x-2 w-full">
      <Image src={sprite || "/missing-sprite.png"} alt={`${name} image`} width={64} height={64} />
      <p className="capitalize text-lg font-semibold">{name}</p>
    </div>
  );
}
