import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import GameCard from "../game/GameCard";
import { getRecentlyViewed } from "../../services/recentlyViewedService";
import { useAuth } from "../../context/AuthContext";

type Props = {
  onLatestViewed?: (appId: number) => void;
};

export default function RecentlyViewedSection({
  onLatestViewed,
}: Props) {
  const { token } = useAuth();

  const {
    data: games = [],
    isLoading,
  } = useQuery({
    queryKey: ["recently-viewed"],
    queryFn: getRecentlyViewed,
    enabled: !!token,
  });

  useEffect(() => {
    if (games.length > 0 && onLatestViewed) {
      onLatestViewed(games[0].app_id);
    }
  }, [games, onLatestViewed]);

  if (!token) return null;

  if (isLoading) {
    return <p>Loading recently viewed...</p>;
  }

  if (games.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">
        👀 Recently Viewed
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {games.map((game: any) => (
          <GameCard
            key={game.app_id}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}