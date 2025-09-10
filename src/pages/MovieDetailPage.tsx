import { useParams } from "react-router-dom";
import { useMovie } from "@/features/movies/hooks";
import { Cast } from "../components/Cast";

type MovieExtra = {
  backdrop_path?: string | null;
  genres?: { id: number; name: string }[];
  runtime?: number | null;
};

function ScoreBadge({ value }: { value: number }) {
  const pct = Math.round(value * 10); 
  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/50 border border-white/20">
      <span className="text-sm font-bold text-white">{pct}<span className="text-[10px]">%</span></span>
    </div>
  );
}

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

  // Acceso “seguro” a campos extra sin any:
  const m = movie as typeof movie & MovieExtra;

  const title = movie.title;
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "—";
  const score = Number(movie.vote_average ?? 0);
  const genres = m.genres ?? [];
  const runtime = m.runtime ?? null;
  const backdrop = m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : null;
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section
        className="relative"
        style={{
          backgroundImage: backdrop
            ? `linear-gradient(to right, rgba(2,6,23,0.9) 20%, rgba(2,6,23,0.55) 50%, rgba(2,6,23,0.2) 100%), url(${backdrop})`
            : "linear-gradient(to right, #0b1220, #0b1220)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/90" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {poster && (
              <img
                src={poster}
                alt={title}
                className="w-full md:w-72 lg:w-80 rounded-xl shadow-2xl border border-white/10"
              />
            )}

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold">
                {title} <span className="opacity-80 font-semibold">({year})</span>
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/80">
                {movie.release_date && (
                  <span>
                    {new Date(movie.release_date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </span>
                )}
                {runtime ? <span>• {Math.floor(runtime / 60)}h {runtime % 60}m</span> : null}
                {!!genres.length && (
                  <>
                    <span>•</span>
                    <ul className="flex flex-wrap gap-2">
                      {genres.map((g) => (
                        <li key={g.id} className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                          {g.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <ScoreBadge value={score} />
                  <div className="text-sm leading-tight">
                    <div className="font-semibold">User Score</div>
                    <div className="text-white/70">Puntuación media</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-white/20" />

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10" title="Add to list">＋</button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10" title="Mark as favorite">❤</button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10" title="Add to watchlist">✔</button>
                  <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10" title="Rate it">★</button>
                </div>
              </div>

              {movie.overview && (
                <div className="mt-6">
                  <h2 className="text-xl font-bold">Overview</h2>
                  <p className="mt-2 text-white/90 leading-relaxed">{movie.overview}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <h2 className="text-2xl font-bold mb-4">Top Billed Cast</h2>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <Cast movieId={movieId} />
        </div>
      </section>
    </main>
  );
};
