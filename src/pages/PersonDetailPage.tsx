// src/pages/PersonDetailPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePerson } from "@/features/persons/hooks";

// Utilidad simple para perfiles de persona
const profileUrl = (
  path?: string | null,
  size: "w185" | "w342" | "w500" | "original" = "w342"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

// Componente pequeño "Leer más"
function ReadMore({ text, max = 600 }: { text: string; max?: number }) {
  const [open, setOpen] = useState(false);
  if (!text) return null;
  if (text.length <= max)
    return <p className="whitespace-pre-line leading-relaxed">{text}</p>;
  return (
    <div>
      <p className="whitespace-pre-line leading-relaxed">
        {open ? text : text.slice(0, max) + "…"}
      </p>
      <button
        className="mt-2 text-sky-400 hover:underline font-semibold"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Mostrar menos" : "Leer más"}
      </button>
    </div>
  );
}

export const PersonDetailPage = () => {
  const { id } = useParams();
  const personId = Number(id || 0);

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

  const photo = profileUrl(person.profile_path, "w500");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-8">
          {/* LEFT: Sidebar con foto y datos básicos */}
          <aside className="self-start">
            {person.profile_path && (
              <img
                src={photo}
                alt={person.name}
                className="w-72 max-w-full rounded-xl shadow-2xl border border-white/10 mx-auto md:mx-0"
              />
            )}

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3">Personal Info</h3>

              <div className="mb-3">
                <div className="text-white/60 text-sm">Birthday</div>
                <div className="font-semibold">
                  {person.birthday
                    ? new Date(person.birthday).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      })
                    : "—"}
                </div>
              </div>

              <div className="mb-3">
                <div className="text-white/60 text-sm">Place of Birth</div>
                <div className="font-semibold">
                  {person.place_of_birth || "—"}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Nombre + Biografía */}
          <section>
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {person.name}
            </h1>

            {person.biography && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">Biography</h2>
                <ReadMore text={person.biography} />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
