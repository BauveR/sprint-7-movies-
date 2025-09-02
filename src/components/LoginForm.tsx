import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import {
  useGoogleSignInMutation,
  useLoginMutation,
  useAuthUserQuery,
} from "@/query/authQueries";
import { useEffect } from "react";

export const LoginForm = () => {
  const navigate = useNavigate();
  const initialForm = { email: "", password: "" };
  const { onInputChange, email, password } = useForm(initialForm);

  const { mutateAsync: login, isPending, error } = useLoginMutation();
  const {
    mutateAsync: signInWithGoogle,
    isPending: isGooglePending,
    error: googleError,
  } = useGoogleSignInMutation();

  const { data: user } = useAuthUserQuery();

  useEffect(() => {
    if (user) navigate("/movies/page/1", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const onGoogle = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signInWithGoogle();
  };

  const isAnyPending = isPending || isGooglePending;
  const displayError = error ?? googleError;

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
      <p className="text-sky-950 text-sm text-center mb-5">
        Log in to rate movies, create your watchlist and get recommendations.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          className="p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onInputChange}
          required
          autoComplete="email"
        />
        <input
          className="p-2 border border-sky-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onInputChange}
          required
          autoComplete="current-password"
        />

        <button
          className="bg-sky-950 text-white font-bold py-2 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-500 font-semibold">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        disabled={isAnyPending}
        onClick={onGoogle}
        className={`w-full flex items-center justify-center gap-3 py-2 border rounded-lg text-sm font-medium ${
          isAnyPending ? "opacity-60 cursor-not-allowed" : "hover:bg-sky-50"
        }`}
      >
        {/* Icono Google minimal */}
        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none">
          <path d="M47.5 24.55c0-1.63-.13-3.27-.41-4.87H24.48v9.24h12.96c-.54 2.98-2.26 5.62-4.8 7.3v5.99h7.74c4.54-4.18 6.12-10.35 6.12-17.66Z" fill="#4285F4"/>
          <path d="M24.48 48c6.47 0 11.92-2.13 15.9-5.79l-7.74-5.99c-2.16 1.46-4.94 2.34-8.16 2.34-6.25 0-11.55-4.22-13.45-9.9H3.03v6.18C7.11 42.88 15.41 48 24.48 48Z" fill="#34A853"/>
          <path d="M11 28.6c-1-2.98-1-6.21 0-9.19V13.23H3.03c-3.4 6.78-3.4 14.77 0 21.56L11 28.6Z" fill="#FBBC04"/>
          <path d="M24.48 9.5c3.43-.05 6.73 1.24 9.21 3.6l6.85-6.86C36.2 2.17 30.44-0.07 24.48.00 15.41.00 7.11 5.12 3.03 13.23L11 19.41C12.9 13.72 18.22 9.5 24.48 9.5Z" fill="#EA4335"/>
        </svg>
        {isAnyPending ? "Signing in..." : "Continue with Google"}
      </button>

      {displayError && (
        <div className="text-red-600 text-sm mt-3">
          {String((displayError as any)?.message ?? "Login failed")}
        </div>
      )}

      <p className="mt-4 text-sm text-center text-gray-700">
        Don’t have an account?{" "}
        <Link to="/register" className="text-sky-600 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};
