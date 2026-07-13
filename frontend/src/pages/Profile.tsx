import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import EditProfileModal from "../components/profile/EditProfileModal";
import { getProfile } from "../services/profileService";
import { getWishlist } from "../services/wishlistService";
import { getRecentlyViewed } from "../services/recentlyViewedService";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
export default function Profile() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const {
    data: wishlist = [],
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const {
    data: recentlyViewed = [],
  } = useQuery({
    queryKey: ["recently-viewed"],
    queryFn: getRecentlyViewed,
  });

  const [editOpen, setEditOpen] = useState(false);

  const latestViewed =
    recentlyViewed.length > 0
      ? recentlyViewed[0]
      : null;

  const [passwordOpen, setPasswordOpen] =
  useState(false);

  if (isLoading) {
    return (
      <h1 className="text-center text-2xl">
        Loading profile...
      </h1>
    );
  }

  if (isError || !profile) {
    return (
      <h1 className="text-center text-2xl text-red-500">
        Failed to load profile.
      </h1>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Header */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {profile.username}
            </h1>

            <p className="mt-2 text-slate-400">
              {profile.email}
            </p>

            
          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            ❤️ Wishlist
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {wishlist.length}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Saved Games
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            👀 Recently Viewed
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {recentlyViewed.length}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Recent Games
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            🤖 Recommendation Mode
          </p>

          <h2 className="mt-3 text-xl font-bold">
            {wishlist.length > 0
              ? "Wishlist AI"
              : "Recently Viewed AI"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Active AI Source
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">
            🧠 AI Model
          </p>

          <h2 className="mt-3 text-xl font-bold">
            TF-IDF + Cosine
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Content-Based Filtering
          </p>
        </div>

      </div>

      {/* Last Viewed */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          🎮 Last Viewed Game
        </h2>

        {latestViewed ? (

          <div className="flex flex-col gap-6 md:flex-row">

            <img
              src={`https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${latestViewed.app_id}/header.jpg`}
              alt={latestViewed.title}
              className="w-full max-w-md rounded-xl"
            />

            <div>

              <h3 className="text-3xl font-bold">
                {latestViewed.title}
              </h3>

              <p className="mt-4 text-slate-400">
                Last game you explored.
              </p>

            </div>

          </div>

        ) : (

          <p className="text-slate-400">
            No recently viewed games.
          </p>

        )}

      </div>

      {/* Account Actions */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Account Settings
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => setEditOpen(true)}
            className="rounded-lg bg-blue-600 px-6 py-3 transition hover:bg-blue-700"
          >
            ✏️ Edit Profile
          </button>

          <button
              onClick={() => setPasswordOpen(true)}
              className="rounded-lg bg-yellow-600 px-6 py-3 transition hover:bg-yellow-700">
              🔒 Change Password
            </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="rounded-lg bg-red-600 px-6 py-3 transition hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </div>

      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        username={profile.username}
        email={profile.email}
      />
      
      <ChangePasswordModal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
      />
    </div>
  );
}