import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Gamepad2,
  Search,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-[#1B2838] via-[#171A21] to-[#0B1118] p-12 shadow-2xl">

      {/* Background Glow */}

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">

        {/* Left */}

        <div className="space-y-8">

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
            <Sparkles size={16} />
            AI Powered Game Discovery
          </div>

          <h1 className="text-6xl font-extrabold leading-tight">
            Discover your next
            <span className="block text-blue-400">
              favorite game.
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-8 text-slate-300">
            SteamSense analyzes thousands of Steam games
            using AI to recommend titles you'll actually
            enjoy. Search, build your wishlist, and get
            personalized recommendations instantly.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/search"
              className="steam-button flex items-center gap-2"
            >
              <Search size={18} />
              Explore Games
            </Link>

            <Link
              to="/recommendations"
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-6 py-3 font-semibold transition hover:border-blue-500 hover:bg-slate-700"
            >
              <Brain size={18} />
              AI Center
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="grid grid-cols-2 gap-5">

          <div className="steam-card">
            <Gamepad2
              className="mb-4 text-blue-400"
              size={28}
            />

            <h2 className="text-3xl font-bold">
              40K+
            </h2>

            <p className="mt-2 text-slate-400">
              Steam Games
            </p>
          </div>

          <div className="steam-card">
            <Brain
              className="mb-4 text-cyan-400"
              size={28}
            />

            <h2 className="text-3xl font-bold">
              AI
            </h2>

            <p className="mt-2 text-slate-400">
              Recommendations
            </p>
          </div>

          <div className="steam-card">
            <Sparkles
              className="mb-4 text-yellow-400"
              size={28}
            />

            <h2 className="text-3xl font-bold">
              TF-IDF
            </h2>

            <p className="mt-2 text-slate-400">
              Content Based
            </p>
          </div>

          <div className="steam-card">
            <ArrowRight
              className="mb-4 text-green-400"
              size={28}
            />

            <h2 className="text-3xl font-bold">
              Instant
            </h2>

            <p className="mt-2 text-slate-400">
              Smart Search
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}