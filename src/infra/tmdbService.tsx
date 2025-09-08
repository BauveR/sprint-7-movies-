import { http } from "@/shared/axios";
import type { DataService, Paged, QueryParams } from "@/features/movies/service";
import type { MoviesResponse, Movie } from "@/features/movies/types";
import type { MovieCredits, PersonDetails } from "@/features/persons/types";
import type { MediaItem } from "@/shared/media";

export const tmdbService: DataService = {
  // Movies
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

  // Person
  async getPersonDetails(personId) {
    const { data } = await http.get(`person/${personId}`, {
      params: { language: "es-ES" },
    });
    return data as PersonDetails;
  },

  // Extra
  async getTrending(period) {
    const { data } = await http.get(`trending/all/${period}`, {
      params: { language: "es-ES" },
    });
    return data as Paged<MediaItem>;
  },

  async getPopularTV(page) {
    const { data } = await http.get("tv/popular", {
      params: { page, language: "es-ES" },
    });
    return data as Paged<MediaItem>;
  },

  async discoverMovies(params: QueryParams = {}) {
    const { data } = await http.get("discover/movie", {
      params: { language: "es-ES", ...params },
    });
    return data as Paged<MediaItem>;
  },

  async discoverTV(params: QueryParams = {}) {
    const { data } = await http.get("discover/tv", {
      params: { language: "es-ES", ...params },
    });
    return data as Paged<MediaItem>;
  },

  async searchMulti(query, page = 1) {
    const { data } = await http.get("search/multi", {
      params: { query, page, language: "es-ES", include_adult: false },
    });
    return data as Paged<MediaItem>;
  },
};
