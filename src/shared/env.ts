export const ENV = {
    TMDB_URL: import.meta.env.VITE_TMDB_URL as string,
    TMDB_BEARER: import.meta.env.VITE_TMDB_BEARER as string,
  } as const;
  