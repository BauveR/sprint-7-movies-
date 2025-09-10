import { useQuery } from "@tanstack/react-query";
import { useDataService } from "@/providers/DataServiceProvider";
import type { MediaItem } from "@/shared/media";    
import type { Paged } from "@/features/movies/service";

export type QueryParams = Record<string, string | number | boolean | undefined>;

export const useTrending = (period: "day" | "week" = "day") => {
  const svc = useDataService();
  return useQuery<Paged<MediaItem>>({
    queryKey: ["trending", period],
    queryFn: () => svc.getTrending(period),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePopularTV = (page = 1) => {
  const svc = useDataService();
  return useQuery<Paged<MediaItem>>({
    queryKey: ["popularTV", page],
    queryFn: () => svc.getPopularTV(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDiscoverMovies = (params?: QueryParams) => {
  const svc = useDataService();
  return useQuery<Paged<MediaItem>>({
    queryKey: ["discoverMovies", params],
    queryFn: () => svc.discoverMovies(params ?? {}),
    staleTime: 5 * 60 * 1000,
  });
};

export const useDiscoverTV = (params?: QueryParams) => {
  const svc = useDataService();
  return useQuery<Paged<MediaItem>>({
    queryKey: ["discoverTV", params],
    queryFn: () => svc.discoverTV(params ?? {}),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchMulti = (query: string, page = 1, enabled = false) => {
  const svc = useDataService();
  return useQuery<Paged<MediaItem>>({
    queryKey: ["searchMulti", query, page],
    queryFn: () => svc.searchMulti(query, page),
    staleTime: 60 * 1000,
    enabled,
  });
};
