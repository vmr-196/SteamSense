import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

import { changePassword } from "../../services/profileService";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({
  open,
  onClose,
}: Props) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const mutation = useMutation({
    mutationFn: changePassword,

    onSuccess: () => {
      toast.success(
        "Password updated successfully!"
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Failed to change password"
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
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full rounded bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded bg-slate-800 p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded bg-slate-800 p-3"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-slate-700 px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {

              if (
                newPassword !== confirmPassword
              ) {
                toast.error(
                  "Passwords do not match"
                );
                return;
              }

              mutation.mutate({
                current_password:
                  currentPassword,
                new_password: newPassword,
              });
            }}
            className="rounded bg-yellow-600 px-5 py-2 hover:bg-yellow-700"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}