import type { Movie } from "@/features/movies/types";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movies/${movie.id}`)}
      className="flex flex-col items-center w-64 p-4 bg-white rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
      )}
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600">
          {new Date(movie.release_date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
