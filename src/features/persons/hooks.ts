import { useQuery } from "@tanstack/react-query";
import { useDataService } from "../../providers/DataServiceProvider";
import type { MovieCredits, PersonDetails } from "./types";

export const useMovieCredits = (movieId: number) => {
  const svc = useDataService();
  return useQuery<MovieCredits>({
    queryKey: ["movieCredits", movieId],
    queryFn: () => svc.getMovieCredits(movieId),
    staleTime: 5 * 60 * 1000,
    enabled: !!movieId,
  });
};

export const usePerson = (personId: number) => {
  const svc = useDataService();
  return useQuery<PersonDetails>({
    queryKey: ["person", personId],
    queryFn: () => svc.getPersonDetails(personId),
    staleTime: 5 * 60 * 1000,
    enabled: !!personId,
  });
};
