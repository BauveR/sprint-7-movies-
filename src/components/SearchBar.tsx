import { useState } from "react";

type Props = {
  placeholder?: string;
  onSubmit: (q: string) => void;
  compact?: boolean;
};

export default function SearchBar({ placeholder="Busca películas, series y personas", onSubmit, compact }: Props) {
  const [q, setQ] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(q.trim()); }}
      className={[
        "w-full flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md",
        "focus-within:ring-2 focus-within:ring-sky-400",
        compact ? "px-3 py-2" : "px-4 py-3"
      ].join(" ")}
      role="search"
      aria-label="Buscar"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white placeholder-white/70 outline-none"
      />
      <button type="submit" className="px-3 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold">
        Buscar
      </button>
    </form>
  );
}
