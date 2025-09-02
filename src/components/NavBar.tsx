import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className="flex gap-4 text-white font-bold">
      <Link
        to="/movies/page/1"
        className="hover:text-sky-300 transition-colors"
      >
        Movies
      </Link>
      <Link to="/" className="hover:text-sky-300 transition-colors">
        TV Shows
      </Link>
      <Link to="/" className="hover:text-sky-300 transition-colors">
        People
      </Link>
      <Link to="/" className="hover:text-sky-300 transition-colors">
        More
      </Link>
    </nav>
  );
};
