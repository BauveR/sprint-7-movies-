import { http } from "@/shared/axios";
import type { DataService } from "@/features/movies/service";
import type { MoviesResponse, Movie } from "@/features/movies/types";
import type { MovieCredits, PersonDetails } from "@/features/persons/types";

export const tmdbService: DataService = {
  async getMovies(page) {
    const { data } = await http.get("/movies/popular", { params: { page } });
    return data as MoviesResponse;
  },
  async getMovieById(id) {
    const { data } = await http.get(`/movies/${id}`);
    return data as Movie;
  },
  async getMovieCredits(movieId) {
    const { data } = await http.get(`/movies/${movieId}/credits`);
    return data as MovieCredits;
  },
  async getPersonDetails(personId) {
    const { data } = await http.get(`/person/${personId}`);
    return data as PersonDetails;
  },
};
