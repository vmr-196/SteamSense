import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { getGame } from "../services/gameService";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "../services/wishlistService";
import { addRecentlyViewed } from "../services/recentlyViewedService";

export default function GameDetails() {
  const { appId } = useParams();

  const queryClient = useQueryClient();

  const [inWishlist, setInWishlist] =
    useState(false);

  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game", appId],
    queryFn: () => getGame(Number(appId)),
    enabled: !!appId,
  });

  useEffect(() => {
    if (!game) return;

    addRecentlyViewed(game.app_id);

    async function checkWishlist() {
      const result = await isInWishlist(
        game.app_id
      );

      setInWishlist(result);
    }

    checkWishlist();
  }, [game]);

  async function handleWishlist() {
    if (!game) return;

    try {
      if (inWishlist) {
        await removeFromWishlist(game.app_id);

        toast.success(
          "Removed from wishlist 💔"
        );

        setInWishlist(false);
      } else {
        await addToWishlist(game.app_id);

        toast.success(
          "Added to wishlist ❤️"
        );

        setInWishlist(true);
      }

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

    } catch (error) {

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Something went wrong"
        );
      } else {
        toast.error(
          "Something went wrong"
        );
      }

    }
  }

  if (isLoading) {
    return (
      <h1 className="text-center text-2xl">
        Loading...
      </h1>
    );
  }

  if (isError || !game) {
    return (
      <h1 className="text-center text-2xl text-red-500">
        Game not found.
      </h1>
    );
  }

  const formatPrice = (price?: number) => {
    if (price == null) return "Free";

    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    ).format(price);
  };

  return (
  <div className="mx-auto max-w-7xl space-y-8">

    {/* Banner */}

    <img
      src={`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.app_id}/header.jpg`}
      alt={game.title}
      className="w-full rounded-2xl shadow-lg"
    />

    {/* Hero */}

    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

      <div className="space-y-4">

        <h1 className="text-5xl font-bold">
          {game.title}
        </h1>

        <div className="flex flex-wrap gap-3">

          <span className="rounded-full bg-blue-600 px-4 py-2">
            ⭐ {game.rating}
          </span>

          <span className="rounded-full bg-green-600 px-4 py-2">
            👍 {game.positive_ratio}%
          </span>

          <span className="rounded-full bg-slate-700 px-4 py-2">
            💬 {game.user_reviews?.toLocaleString()} Reviews
          </span>

        </div>

      </div>

      <button
        onClick={handleWishlist}
        className={`rounded-xl px-6 py-4 font-semibold transition ${
          inWishlist
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {inWishlist
          ? "💔 Remove from Wishlist"
          : "❤️ Add to Wishlist"}
      </button>

    </div>

    {/* Stats */}

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-xl bg-slate-900 p-6">

        <p className="text-slate-400">
          Price
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {formatPrice(game.price_final)}
        </h2>

        {game.discount !== 0 && (
          <p className="mt-1 text-green-400">
            {game.discount}% OFF
          </p>
        )}

      </div>

      <div className="rounded-xl bg-slate-900 p-6">

        <p className="text-slate-400">
          Rating Score
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {game.rating_score}
        </h2>

      </div>

      <div className="rounded-xl bg-slate-900 p-6">

        <p className="text-slate-400">
          Release Year
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {game.release_year}
        </h2>

      </div>

      <div className="rounded-xl bg-slate-900 p-6">

        <p className="text-slate-400">
          Popularity
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {game.popularity_score?.toFixed(1)}
        </h2>

      </div>

    </div>

    
    {/* Platforms */}

    <div className="rounded-2xl bg-slate-900 p-8">

      <h2 className="mb-5 text-3xl font-bold">
        💻 Supported Platforms
      </h2>

      <div className="flex flex-wrap gap-3">

        {game.win && (
          <span className="rounded-full bg-blue-700 px-4 py-2">
            🪟 Windows
          </span>
        )}

        {game.mac && (
          <span className="rounded-full bg-slate-700 px-4 py-2">
            🍎 macOS
          </span>
        )}

        {game.linux && (
          <span className="rounded-full bg-orange-700 px-4 py-2">
            🐧 Linux
          </span>
        )}

        {game.steam_deck && (
          <span className="rounded-full bg-green-700 px-4 py-2">
            🎮 Steam Deck
          </span>
        )}

      </div>

    </div>

    {/* AI */}

    <div className="rounded-2xl border border-blue-500 bg-slate-900 p-8">

      <h2 className="mb-4 text-3xl font-bold">
        🤖 AI Insight
      </h2>

      <p className="leading-8 text-slate-300">
        This recommendation is generated using
        a Content-Based Recommendation System
        powered by TF-IDF Vectorization and
        Cosine Similarity. Games are matched
        based on descriptions and tags to find
        titles with similar gameplay and themes.
      </p>

    </div>

  </div>
);
}