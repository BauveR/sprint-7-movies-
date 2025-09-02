import { useParams } from "react-router-dom";
import { useMovie } from "@/features/movies/hooks";
import { Cast } from "../components/Cast";

export const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { data: movie, isLoading, isError, error } = useMovie(movieId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400">
          Loading movie...
        </h1>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {String(error ?? "Movie not found")}
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="flex flex-col md:flex-row gap-6">
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-80 rounded-lg shadow"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600 mt-2">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
          <p className="mt-4 leading-relaxed">{movie.overview}</p>
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">Rating:</span>{" "}
            {movie.vote_average?.toFixed(1)}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <Cast movieId={movieId} />
      </section>
    </main>
  );
};
