import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { searchGames } from "../services/gameService";
import GameCard from "../components/game/GameCard";

export default function Search() {
  const [query, setQuery] = useState("");

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchGames(query),
    enabled: query.length >= 2,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Search Games
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a game..."
        className="w-full rounded-xl bg-slate-800 p-4 outline-none border border-slate-700 focus:border-blue-500"
      />

      {isLoading && (
        <p>Searching...</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {games.map((game: any) => (
          <GameCard
            key={game.app_id}
            game={game}
          />
        ))}
      </div>
    </div>
  );
}