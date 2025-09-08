import type { MediaItem } from "@/shared/media";
import { img } from "@/shared/images";
import { useNavigate } from "react-router-dom";

function Card({ item }: { item: MediaItem }) {
  const navigate = useNavigate();
  const title = item.title || item.name || "—";
  const poster = item.poster_path || item.profile_path;
  const to = item.media_type === "person"
    ? `/persons/${item.id}`
    : `/movies/${item.id}`; // si es TV y no tienes page de TV, mantén movies o ajusta

  return (
    <button
      onClick={() => navigate(to)}
      className="w-40 flex-shrink-0 rounded-xl overflow-hidden bg-white/10 border border-white/20 hover:bg-white/20 transition"
      title={title}
    >
      {poster && <img src={img.poster(poster, "w342")} alt={title} className="w-40 h-60 object-cover" />}
      <div className="p-2 text-left">
        <div className="text-sm font-semibold line-clamp-2">{title}</div>
        {item.vote_average != null && (
          <div className="text-xs text-white/70 mt-1">⭐ {item.vote_average.toFixed(1)}</div>
        )}
      </div>
    </button>
  );
}

export function MediaRail({ items }: { items: MediaItem[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pr-4">
        {items.map(i => <Card key={`${i.media_type}-${i.id}`} item={i} />)}
      </div>
    </div>
  );
}
