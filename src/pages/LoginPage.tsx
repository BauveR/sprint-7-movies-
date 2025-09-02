import { Navigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { useAuthUserQuery } from "@/query/authQueries";

export const LoginPage = () => {
  const { data: user } = useAuthUserQuery();
  const isLogged = !!user;

  return (
    <>
      {isLogged && <Navigate to="/movies/page/1" replace />}
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-6 p-6">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400 text-center">
          Login to your account
        </h1>
        <LoginForm />
      </main>
    </>
  );
};
