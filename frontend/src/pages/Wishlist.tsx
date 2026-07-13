import { useQuery } from "@tanstack/react-query";

import GameCard from "../components/game/GameCard";
import { getWishlist } from "../services/wishlistService";

export default function Wishlist() {
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  if (isLoading) {
    return <h1>Loading wishlist...</h1>;
  }

  if (isError) {
    return <h1>Failed to load wishlist.</h1>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        ❤️ My Wishlist
      </h1>

      {games.length === 0 ? (
        <p className="text-slate-400">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {games.map((game: any) => (
            <GameCard
              key={game.app_id}
              game={game}
            />
          ))}
        </div>
      )}
    </div>
  );
}