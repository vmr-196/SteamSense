import { Link, NavLink } from "react-router-dom";
import {
  Gamepad2,
  House,
  Search,
  Heart,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  const navClass =
    "flex items-center gap-2 rounded-lg px-4 py-2 text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white";

  const activeClass =
    "bg-blue-600 text-white shadow-md";

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#171a21]/90 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="rounded-xl bg-blue-600 p-3 shadow-lg">
            <Gamepad2 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              SteamSense
            </h1>

            <p className="text-xs text-slate-400">
              AI Powered Recommendations
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-2">

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navClass} ${
                isActive ? activeClass : ""
              }`
            }
          >
            <House size={18} />
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `${navClass} ${
                isActive ? activeClass : ""
              }`
            }
          >
            <Search size={18} />
            Search
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `${navClass} ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                <Heart size={18} />
                Wishlist
              </NavLink>

              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  `${navClass} ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                <Sparkles size={18} />
                AI Center
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${navClass} ${
                    isActive ? activeClass : ""
                  }`
                }
              >
                <User size={18} />
                Profile
              </NavLink>

              <button
                onClick={logout}
                className="ml-3 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium transition hover:bg-red-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

          {!token && (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navClass} ${
                  isActive ? activeClass : ""
                }`
              }
            >
              <User size={18} />
              Login
            </NavLink>
          )}

        </div>

      </div>

    </nav>
  );
}