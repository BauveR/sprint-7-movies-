import type { MoviesResponse, Movie } from "./types";
import type { MovieCredits, PersonDetails } from "../persons/types";

export interface DataService {
  getMovies(page: number): Promise<MoviesResponse>;
  getMovieById(id: number): Promise<Movie>;
  getMovieCredits(movieId: number): Promise<MovieCredits>;
  getPersonDetails(personId: number): Promise<PersonDetails>;
}
