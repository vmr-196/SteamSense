import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

import {
  register as registerUser,
} from "../services/authService";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success(
        "Account created successfully!"
      );

      navigate("/login");

    } catch (error) {

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.detail ??
            "Registration failed"
        );
      } else {
        toast.error("Something went wrong");
      }

    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg"
      >

        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <input
          {...register("username")}
          placeholder="Username"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 font-semibold transition hover:bg-blue-700"
        >
          Create Account
        </button>

        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}