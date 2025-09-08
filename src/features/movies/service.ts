import type { MoviesResponse, Movie } from "./types";
import type { MovieCredits, PersonDetails } from "@/features/persons/types";
import type { MediaItem } from "@/shared/media";

// Respuesta paginada genérica
export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Tipo para parámetros de discover/search
export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface DataService {
  // Movies
  getMovies(page: number): Promise<MoviesResponse>;
  getMovieById(id: number): Promise<Movie>;
  getMovieCredits(movieId: number): Promise<MovieCredits>;

  // Person
  getPersonDetails(personId: number): Promise<PersonDetails>;

  // Extra (para home / discover / search)
  getTrending(period: "day" | "week"): Promise<Paged<MediaItem>>;
  getPopularTV(page: number): Promise<Paged<MediaItem>>;
  discoverMovies(params?: QueryParams): Promise<Paged<MediaItem>>;
  discoverTV(params?: QueryParams): Promise<Paged<MediaItem>>;
  searchMulti(query: string, page?: number): Promise<Paged<MediaItem>>;
}
