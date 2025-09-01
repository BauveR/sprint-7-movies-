import { useQuery } from "@tanstack/react-query";
import { useDataService } from "../../providers/DataServiceProvider";
import type { MoviesResponse, Movie } from "./types";

export const useMovies = (page: number) => {
  const svc = useDataService();
  return useQuery<MoviesResponse>({
    queryKey: ["movies", page],
    queryFn: () => svc.getMovies(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovie = (id: number) => {
  const svc = useDataService();
  return useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => svc.getMovieById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};
