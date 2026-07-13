import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { updateProfile } from "../../services/profileService";

type Props = {
  open: boolean;
  onClose: () => void;
  username: string;
  email: string;
};

export default function EditProfileModal({
  open,
  onClose,
  username,
  email,
}: Props) {
  const queryClient = useQueryClient();

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  useEffect(() => {
    setNewUsername(username);
    setNewEmail(email);
  }, [username, email]);

  const mutation = useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      toast.success("Profile updated successfully!");

      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });

      onClose();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to update profile"
        );
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Edit Profile
        </h2>

        <div className="space-y-4">

          <div>

            <label className="mb-2 block">
              Username
            </label>

            <input
              value={newUsername}
              onChange={(e) =>
                setNewUsername(e.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block">
              Email
            </label>

            <input
              type="email"
              value={newEmail}
              onChange={(e) =>
                setNewEmail(e.target.value)
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              mutation.mutate({
                username: newUsername,
                email: newEmail,
              })
            }
            className="rounded-lg bg-blue-600 px-5 py-2 hover:bg-blue-700"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

