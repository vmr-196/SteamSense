import { useQuery } from "@tanstack/react-query";

import {
  getRecommendations,
  getWishlistRecommendations,
} from "../../services/recommendationService";

type Recommendation = {
  app_id: number;
  title: string;
  similarity_score: number;
};

type Props = {
  mode: "recent" | "wishlist";
  appId?: number;
};

export default function RecommendationSection({
  mode,
  appId,
}: Props) {
  const {
    data: games = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recommendations", mode, appId],
    queryFn: () => {
      if (mode === "wishlist") {
        return getWishlistRecommendations();
      }

      return getRecommendations(appId!);
    },
    enabled:
      mode === "wishlist" ||
      (mode === "recent" && !!appId),
  });

  if (isLoading) {
    return (
      <h2 className="text-center">
        Loading recommendations...
      </h2>
    );
  }

  if (isError) {
    return (
      <h2 className="text-center text-red-500">
        Failed to load recommendations.
      </h2>
    );
  }

  if (games.length === 0) {
    return (
      <h2 className="text-center text-slate-400">
        No recommendations found.
      </h2>
    );
  }

  return (
    <section className="space-y-6">

      <h2 className="text-3xl font-bold">
        🤖 AI Recommendations
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {games.map((game: Recommendation) => (

          <div
            key={game.app_id}
            className="rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:scale-105 hover:border-blue-500"
          >

            <img
              src={`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/header.jpg`}
              alt={game.title}
              className="mb-4 w-full rounded-lg"
            />

            <h3 className="text-xl font-bold">
              {game.title}
            </h3>

            <div className="mt-5 flex items-center justify-between">

              <span className="rounded-full bg-blue-600 px-3 py-1 text-sm">

                🤖 AI Match

              </span>

              <span className="font-bold text-green-400">

                {(game.similarity_score * 100).toFixed(1)}%

              </span>

            </div>

            <div className="mt-5 rounded-lg bg-slate-800 p-4">

              <h4 className="mb-3 font-semibold text-blue-400">
                🤖 Why this recommendation?
              </h4>

              <ul className="space-y-2 text-sm text-slate-300">
                <li>✔ Similar game description</li>
                <li>✔ Similar gameplay keywords</li>
                <li>✔ Similar Steam tags</li>
                <li>✔ TF-IDF + Cosine Similarity</li>
              </ul>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}