import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login as loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

type LoginForm = {
  username: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const auth = useAuth();

  const navigate = useNavigate();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await loginUser(data);

      auth.login(response.access_token);

      toast.success("Logged in successfully!");

      navigate("/");
    } catch {
      toast.error("Invalid username or password");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-5 rounded-xl bg-slate-800 p-8 shadow-lg"
      >
        <h1 className="text-center text-3xl font-bold">
          Login
        </h1>

        <input
          {...register("username")}
          placeholder="Username or Email"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded bg-slate-700 p-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 font-semibold transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}