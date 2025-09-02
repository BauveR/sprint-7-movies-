import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { useRegisterMutation } from "@/auth/query/authQueries";
import { useState } from "react";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const initialForm = { email: "", password: "", confirmPassword: "" };
  const { onInputChange, email, password, confirmPassword } = useForm(initialForm);

  const [submitted, setSubmitted] = useState(false);
  const [match, setMatch] = useState(true);

  const { mutateAsync, isPending, error, isSuccess } = useRegisterMutation({
    onSuccess: () => {
      // tras registro + email verification enviado en tu hook
      setTimeout(() => navigate("/movies/page/1", { replace: true }), 2000);
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (password !== confirmPassword) {
      setMatch(false);
      return;
    }
    setMatch(true);
    await mutateAsync({ email, password });
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow text-center">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          <strong className="font-semibold">Success!</strong>{" "}
          Account created. We’ve sent a verification email to {email}.
        </div>
        <p className="text-sm text-gray-700 mb-4">
          You’ll be redirected to Movies in a moment…
        </p>
        <button
          onClick={() => navigate("/movies/page/1", { replace: true })}
          className="bg-sky-950 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 transition-colors"
        >
          Go to Movies Now
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow flex flex-col gap-4">
      <p className="text-sky-950 text-sm text-center">
        Join MovieDB to rate movies, create your watchlist, and get personalized recommendations!
      </p>

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
        autoComplete="new-password"
        minLength={6}
      />
      <input
        className={`p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 ${
          submitted && !match ? "border-red-500" : "border-sky-300"
        }`}
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onInputChange}
        required
        autoComplete="new-password"
        minLength={6}
      />

      {submitted && !match && (
        <div className="text-red-600 text-sm -mt-2">Passwords do not match</div>
      )}

      {error && (
        <div className="text-red-600 text-sm">{String((error as any)?.message ?? "Register failed")}</div>
      )}

      <button
        className="bg-sky-950 text-white font-bold py-2 rounded-lg hover:bg-sky-700 transition-colors disabled:opacity-60"
        disabled={isPending}
      >
        {isPending ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="text-center text-sm text-sky-950">
        Already have an account?{" "}
        <Link to="/login" className="hover:underline font-bold">Log in</Link>
      </p>
    </form>
  );
};
