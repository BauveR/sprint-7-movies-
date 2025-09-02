import { useNavigate } from "react-router-dom";
import type { CastMember } from "@/features/persons/types";

export const ActorCard = ({ actor }: { actor: CastMember }) => {
  const navigate = useNavigate();
  if (!actor.profile_path) return null;

  return (
    <div
      className="flex flex-col items-center shadow-lg bg-sky-950/80 p-4 rounded-lg hover:cursor-pointer transition-transform hover:scale-105"
      onClick={() => navigate(`/persons/${actor.id}`)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
        alt={actor.name}
        className="w-40 rounded-md mb-2 shadow-sm shadow-sky-950"
      />
      <h3 className="text-md text-center font-bold text-white w-40">{actor.name}</h3>
      {actor.character && (
        <p className="text-center text-gray-300 w-40">{actor.character}</p>
      )}
    </div>
  );
};
