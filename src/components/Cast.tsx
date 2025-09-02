import { useMovieCredits } from "@/features/persons/hooks";
import type { CastMember } from "@/features/persons/types";
import { ActorCard } from "./ActorCard";

export const Cast = ({ movieId }: { movieId: number }) => {
  const { data, isError, error } = useMovieCredits(movieId);

  if (isError) return <pre>Error: {String(error)}</pre>;

  const cast: CastMember[] = data?.cast ?? [];
  if (!cast.length) return null;

  return (
    <>
      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400 text-center m-5">
        Movie Cast
      </h2>
      <div className="flex flex-row gap-5 m-6 p-4 overflow-x-auto">
        {cast.slice(0, 16).map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
    </>
  );
};
