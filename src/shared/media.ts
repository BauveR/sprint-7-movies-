// src/types/media.ts
export type MediaType = "movie" | "tv" | "person";

export interface MediaItem {
  id: number;
  media_type?: MediaType;
  title?: string;           // movies
  name?: string;            // tv/person
  overview?: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  profile_path?: string | null;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}
