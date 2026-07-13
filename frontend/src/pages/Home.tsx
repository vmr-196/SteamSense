import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import GameCard from "../components/game/GameCard";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import Hero from "../components/home/Hero";
import RecommendationSection from "../components/home/RecommendationSection";

import { getPopularGames } from "../services/gameService";

export default function Home() {
  const [latestViewed, setLatestViewed] =
    useState<number | null>(null);

  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popular-games"],
    queryFn: getPopularGames,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Failed to load games.</h1>;
  }

  return (
    <div className="space-y-10">

      <Hero />

      <RecentlyViewedSection
        onLatestViewed={setLatestViewed}
      />

      <section>
        <h2 className="mb-6 text-3xl font-bold">
          🔥 Popular Games
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {games?.map((game: any) => (
            <GameCard
              key={game.app_id}
              game={game}
            />
          ))}
        </div>
      </section>

      {latestViewed && (
       <RecommendationSection
    appId={latestViewed}
    mode="recent"
/>
      )}

    </div>
  );
}