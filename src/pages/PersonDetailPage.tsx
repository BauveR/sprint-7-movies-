import { useParams } from "react-router-dom";
import { usePerson } from "@/features/persons/hooks";

export const PersonDetailPage = () => {
  const { id } = useParams();
  const personId = Number(id);

  const { data: person, isLoading, isError, error } = usePerson(personId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-tl from-sky-800 to-sky-400">
          Loading person...
        </h1>
      </div>
    );
  }

  if (isError || !person) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {String(error ?? "Person not found")}
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="flex flex-col md:flex-row gap-6">
        {person.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={person.name}
            className="w-full md:w-72 rounded-lg shadow"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <p className="text-gray-600 mt-2">
            {person.birthday
              ? new Date(person.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })
              : "Birthday: —"}
            {person.place_of_birth ? ` • ${person.place_of_birth}` : ""}
          </p>
          {person.biography && (
            <p className="mt-4 whitespace-pre-line leading-relaxed">
              {person.biography}
            </p>
          )}
        </div>
      </section>
    </main>
  );
};
