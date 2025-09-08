import SearchBar from "@/components/SearchBar";

type Props = {
  title?: string;
  subtitle?: string;
  backgroundUrl?: string;     // si no llega, usa un color/gradiente
  onSearch: (q: string) => void;
};

export function Hero({
  title = "Bienvenido.",
  subtitle = "Millones de películas, series y personas por descubrir.",
  backgroundUrl,
  onSearch,
}: Props) {
  return (
    <header
      className="relative h-[44vh] min-h-[320px] flex items-center"
      style={{
        backgroundImage: backgroundUrl
          ? `linear-gradient(to right, rgba(3,7,18,0.8), rgba(3,7,18,0.4)), url(${backgroundUrl})`
          : "linear-gradient(to right, #0f172a, #0369a1)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h1>
        <p className="mt-2 text-white/90 text-lg">{subtitle}</p>
        <div className="mt-6 max-w-2xl">
          <SearchBar compact placeholder="Busca una película, serie o persona..." onSubmit={onSearch} />
        </div>
      </div>
    </header>
  );
}
