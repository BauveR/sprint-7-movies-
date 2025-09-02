import { Link } from "react-router-dom";
import { NavBar } from "@/pages/";
import {
  useAuthUserQuery,
  useLogoutMutation,
} from "@/auth/query/authQueries";

export const Header = () => {
  const { data: user } = useAuthUserQuery();
  const isLogged = !!user;

  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <header className="bg-sky-950 p-6 text-white flex justify-between items-center">
      {/* Logo + Nav */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="font-bold text-2xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-sky-400"
        >
          MovieDB
        </Link>
        <NavBar />
      </div>

      {/* Login / Logout */}
      <div>
        {!isLogged && (
          <Link
            to="/login"
            className="font-bold bg-sky-500 px-4 py-2 rounded-lg hover:bg-sky-700 hover:cursor-pointer transition-colors border-2 border-sky-500"
          >
            Login
          </Link>
        )}
        {isLogged && (
          <button
            className="font-bold bg-sky-500 px-4 py-1.5 rounded-lg hover:bg-sky-700 hover:cursor-pointer transition-colors border-2 border-sky-500"
            onClick={() => logout()}
            disabled={isPending}
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </header>
  );
};
