const BASE_IMG = "https://image.tmdb.org/t/p";

export const img = {
  poster: (path?: string | null, size: "w154"|"w342"|"w500"|"w780"|"original"="w500") =>
    path ? `${BASE_IMG}/${size}${path}` : "",
  backdrop: (path?: string | null, size: "w780"|"w1280"|"original"="w1280") =>
    path ? `${BASE_IMG}/${size}${path}` : "",
  profile: (path?: string | null, size: "w185"|"w342"|"w500"|"original"="w342") =>
    path ? `${BASE_IMG}/${size}${path}` : "",
};
