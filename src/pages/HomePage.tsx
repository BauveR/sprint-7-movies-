import { useMemo, useState } from "react";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { TabsToggle } from "@/components/TabsToggle";
import { MediaRail } from "@/components/MediaRail";
import { useTrending, useDiscoverMovies, useDiscoverTV } from "@/features/home/hooks";
import { img } from "@/shared/images";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const { data: trendingDay } = useTrending("day");
  const heroBackdrop = useMemo(() => {
    const first = trendingDay?.results?.find(r => r.backdrop_path);
    return first ? img.backdrop(first.backdrop_path, "original") : undefined;
  }, [trendingDay]);

  const [trendPeriod, setTrendPeriod] = useState<"day"|"week">("day");
  const { data: trending } = useTrending(trendPeriod);

  const [popularKind, setPopularKind] = useState<"movie"|"tv">("movie");
  const { data: popularMovies } = useDiscoverMovies({ sort_by: "popularity.desc", page: 1 });
  const { data: popularTV } = useDiscoverTV({ sort_by: "popularity.desc", page: 1 });

  const [freeKind, setFreeKind] = useState<"movie"|"tv">("movie");
  const { data: freeMovies } = useDiscoverMovies({ sort_by: "vote_count.desc", "vote_count.gte": 500 });
  const { data: freeTV } = useDiscoverTV({ sort_by: "vote_count.desc", "vote_count.gte": 500 });

  return (
    <main className="pb-10">
      <Hero
        backgroundUrl={heroBackdrop}
        onSearch={(q) => navigate(`/movies/page/1?query=${encodeURIComponent(q)}`)}
        title="Bienvenido."
        subtitle="Explora películas, series y personas."
      />

      <Section
        title="Trending"
        actions={
          <TabsToggle
            tabs={[{value:"day",label:"Today"},{value:"week",label:"This Week"}]}
            value={trendPeriod}
            onChange={setTrendPeriod}
          />
        }
      >
        <MediaRail items={trending?.results ?? []} />
      </Section>

      <Section
        title="What's Popular"
        actions={
          <TabsToggle
            tabs={[{value:"movie",label:"Movies"},{value:"tv",label:"TV"}]}
            value={popularKind}
            onChange={setPopularKind}
          />
        }
      >
        <MediaRail items={(popularKind === "movie" ? popularMovies : popularTV)?.results ?? []} />
      </Section>

      <Section
        title="Free to Watch"
        actions={
          <TabsToggle
            tabs={[{value:"movie",label:"Movies"},{value:"tv",label:"TV"}]}
            value={freeKind}
            onChange={setFreeKind}
          />
        }
      >
        <MediaRail items={(freeKind === "movie" ? freeMovies : freeTV)?.results ?? []} />
      </Section>

      <Section title="Join Today">
        <div className="rounded-2xl p-6 bg-sky-950/80 text-white">
          <h3 className="text-xl font-bold mb-2">Únete para personalizar tu experiencia</h3>
          <p className="text-white/80 mb-4">Valora títulos, crea listas y recibe recomendaciones.</p>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 font-semibold"
          >
            Create an account
          </button>
        </div>
      </Section>
    </main>
  );
};
