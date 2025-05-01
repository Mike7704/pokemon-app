import Image from "next/image";
import Link from "next/link";

export default function PokemonCard({ id, name, sprite, types }) {
  return (
    <Link
      href={`/pokemon/${id}`}
      className="w-full h-24 flex items-center space-x-4 p-2 bg-white border rounded-lg shadow"
    >
      <Image src={sprite || "/missing-sprite.png"} alt={`${name} image`} width={64} height={64} />
      <div>
        <p className="capitalize text-lg font-semibold">
          #{id > 0 ? id : "???"} {name}
        </p>
        <p className="text-sm text-gray-600">{types.length > 0 ? types.join(" / ") : "Unknown type"}</p>
      </div>
    </Link>
  );
}
