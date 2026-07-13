import { Link } from "react-router-dom";
import type { Game } from "../../types/game";

type Props = {
  game: Game;
};

export default function GameCard({ game }: Props) {
  return (
    <Link
      to={`/game/${game.app_id}`}
      className="block"
    >
      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

        <img
          src={`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/header.jpg`}
          alt={game.title}
          className="h-44 w-full object-cover"
        />

        <div className="space-y-3 p-5">

          <h2 className="line-clamp-2 text-lg font-bold">
            {game.title}
          </h2>

          {"rating" in game && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Rating
              </span>

              <span className="font-medium text-green-400">
                {game.rating}
              </span>
            </div>
          )}

          {"price_final" in game && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Price
              </span>

              <span className="font-bold text-blue-400">
                ${game.price_final}
              </span>
            </div>
          )}

          <div className="pt-2">

            <button
              className="w-full rounded-lg bg-blue-600 py-2 font-semibold transition hover:bg-blue-700"
            >
              View Details
            </button>

          </div>

        </div>

      </div>
    </Link>
  );
}