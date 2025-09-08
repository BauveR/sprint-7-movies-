import { Link } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import {
  useAuthUserQuery,
  useLogoutMutation,
} from "@/query/authQueries";
import logo from "@/assets/tmbd logo.svg";

export const Header = () => {
  const { data: user } = useAuthUserQuery();
  const isLogged = !!user;

  const { mutate: logout, isPending } = useLogoutMutation();

  return (
    <header className="bg-slate-900 p-6 text-white flex justify-between items-center">
      {/* Logo + Nav */}
      <div className="flex items-center gap-6">
      <Link to="/">
          <img src={logo} alt="TMDB Logo" className="w-30 h-8" /> 
        </Link>
        <NavBar />
      </div>

      {/* Login / Logout */}
      <div>
        {!isLogged && (
          <Link
            to="/login"
            className="font-bold bg-pink-500 px-4 py-2 rounded-lg hover:bg-sky-700 hover:cursor-pointer transition-colors border-2 border-sky-500"
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
