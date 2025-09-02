import { Navigate, Outlet } from "react-router-dom";
import { useAuthUserQuery } from "@/auth/query/authQueries";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: user, isLoading } = useAuthUserQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400">
          Checking authentication...
        </h1>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
