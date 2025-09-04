import { http } from "@/shared/axios";
import type { DataService } from "@/features/movies/service";
import type { MoviesResponse, Movie } from "@/features/movies/types";
import type { MovieCredits, PersonDetails } from "@/features/persons/types";

export const tmdbService: DataService = {
  async getMovies(page) {
    const { data } = await http.get("movie/popular", {
      params: { page, language: "es-ES" },
    });
    return data as MoviesResponse;
  },
  async getMovieById(id) {
    const { data } = await http.get(`movie/${id}`, {
      params: { language: "es-ES" },
    });
    return data as Movie;
  },
  async getMovieCredits(movieId) {
    const { data } = await http.get(`movie/${movieId}/credits`, {
      params: { language: "es-ES" },
    });
    return data as MovieCredits;
  },
  async getPersonDetails(personId) {
    const { data } = await http.get(`person/${personId}`, {
      params: { language: "es-ES" },
    });
    return data as PersonDetails;
  },
};
