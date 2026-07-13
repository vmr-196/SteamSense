import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import RecommendationSection from "../components/home/RecommendationSection";
import { getRecentlyViewed } from "../services/recentlyViewedService";

export default function Recommendations() {
  const [mode, setMode] = useState<"wishlist" | "recent">(
    "wishlist"
  );

  const {
    data: recentlyViewed = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recently-viewed"],
    queryFn: getRecentlyViewed,
    enabled: mode === "recent",
  });

  if (mode === "recent") {
    if (isLoading) {
      return (
        <h1 className="text-center text-2xl">
          Loading AI recommendations...
        </h1>
      );
    }

    if (isError) {
      return (
        <h1 className="text-center text-red-500 text-2xl">
          Failed to load recommendations.
        </h1>
      );
    }

    if (recentlyViewed.length === 0) {
      return (
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">
            🤖 AI Recommendation Center
          </h1>

          <p className="text-slate-400">
            View a few games first to get AI recommendations.
          </p>
        </div>
      );
    }
  }

  const latestGame =
    recentlyViewed.length > 0
      ? recentlyViewed[0]
      : null;

  return (
    <div className="space-y-10">

      <section className="space-y-6">

        <h1 className="text-5xl font-bold">
          🤖 AI Recommendation Center
        </h1>

        <p className="text-slate-400">
          Personalized recommendations using
          Machine Learning.
        </p>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-slate-900 p-5">
            <p className="text-slate-400">
              AI Model
            </p>

            <h2 className="mt-2 text-xl font-bold">
              TF-IDF + Cosine
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5">
            <p className="text-slate-400">
              Recommendation Source
            </p>

            <h2 className="mt-2 text-xl font-bold">
              {mode === "wishlist"
                ? "❤️ Wishlist"
                : "👀 Recently Viewed"}
            </h2>
          </div>

          <div className="rounded-xl bg-slate-900 p-5">
            <p className="text-slate-400">
              Recommendations
            </p>

            <h2 className="mt-2 text-xl font-bold">
              Top 10
            </h2>
          </div>

        </div>

      </section>

      <div className="flex gap-4">

        <button
          onClick={() => setMode("wishlist")}
          className={`rounded-lg px-5 py-3 transition ${
            mode === "wishlist"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          ❤️ Wishlist
        </button>

        <button
          onClick={() => setMode("recent")}
          className={`rounded-lg px-5 py-3 transition ${
            mode === "recent"
              ? "bg-blue-600"
              : "bg-slate-800"
          }`}
        >
          👀 Recently Viewed
        </button>

      </div>

      {mode === "wishlist" ? (
        <RecommendationSection
          mode="wishlist"
        />
      ) : (
        latestGame && (
          <>
            <section className="rounded-xl border border-slate-700 p-6">
              <h2 className="text-2xl font-semibold">
                Based on your recently viewed game
              </h2>

              <p className="mt-2 text-xl text-blue-400">
                🎮 {latestGame.title}
              </p>
            </section>

            <RecommendationSection
              mode="recent"
              appId={latestGame.app_id}
            />
          </>
        )
      )}

    </div>
  );
}