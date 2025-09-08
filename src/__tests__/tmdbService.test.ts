// src/infra/__tests__/tmdbService.test.ts
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

// 1) Crear el mock "hoisted" ANTES del vi.mock
const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

// 2) Mockear el módulo que importa tmdbService
vi.mock("@/shared/axios", () => ({
  http: { get: getMock },
}));

// 3) Importar el SUT DESPUÉS del mock
import { tmdbService } from "@/infra/tmdbService";

beforeEach(() => {
  getMock.mockReset();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("tmdbService", () => {
  test("getMovies llama a /movie/popular con page + language", async () => {
    const fake = { results: [], page: 1, total_pages: 1, total_results: 0 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getMovies(2);

    expect(getMock).toHaveBeenCalledWith("movie/popular", {
      params: { page: 2, language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("getMovieById llama a /movie/:id con language", async () => {
    const fake = { id: 42, title: "Foo" };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getMovieById(42);

    expect(getMock).toHaveBeenCalledWith("movie/42", {
      params: { language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("getMovieCredits llama a /movie/:id/credits con language", async () => {
    const fake = { id: 42, cast: [], crew: [] };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getMovieCredits(42);

    expect(getMock).toHaveBeenCalledWith("movie/42/credits", {
      params: { language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("getPersonDetails llama a /person/:id con language", async () => {
    const fake = { id: 7, name: "Jane" };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getPersonDetails(7);

    expect(getMock).toHaveBeenCalledWith("person/7", {
      params: { language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("getTrending llama a /trending/all/:period con language", async () => {
    const fake = { results: [{ id: 1 }], page: 1, total_pages: 1, total_results: 1 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getTrending("day");

    expect(getMock).toHaveBeenCalledWith("trending/all/day", {
      params: { language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("getPopularTV llama a /tv/popular con page + language", async () => {
    const fake = { results: [], page: 3, total_pages: 10, total_results: 100 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.getPopularTV(3);

    expect(getMock).toHaveBeenCalledWith("tv/popular", {
      params: { page: 3, language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("discoverMovies mergea language + params", async () => {
    const fake = { results: [], page: 1, total_pages: 1, total_results: 0 };
    getMock.mockResolvedValueOnce({ data: fake });

    const params = { sort_by: "popularity.desc", "vote_count.gte": 500 };
    const res = await tmdbService.discoverMovies(params);

    expect(getMock).toHaveBeenCalledWith("discover/movie", {
      params: { language: "es-ES", ...params },
    });
    expect(res).toBe(fake);
  });

  test("discoverTV mergea language + params (params opcional)", async () => {
    const fake = { results: [], page: 1, total_pages: 1, total_results: 0 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.discoverTV(); // sin params

    expect(getMock).toHaveBeenCalledWith("discover/tv", {
      params: { language: "es-ES" },
    });
    expect(res).toBe(fake);
  });

  test("searchMulti usa query, page default=1, language es-ES e include_adult false", async () => {
    const fake = { results: [{ id: 1 }], page: 1, total_pages: 1, total_results: 1 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.searchMulti("dune");

    expect(getMock).toHaveBeenCalledWith("search/multi", {
      params: { query: "dune", page: 1, language: "es-ES", include_adult: false },
    });
    expect(res).toBe(fake);
  });

  test("searchMulti respeta page proporcionado", async () => {
    const fake = { results: [], page: 2, total_pages: 3, total_results: 50 };
    getMock.mockResolvedValueOnce({ data: fake });

    const res = await tmdbService.searchMulti("dune", 2);

    expect(getMock).toHaveBeenCalledWith("search/multi", {
      params: { query: "dune", page: 2, language: "es-ES", include_adult: false },
    });
    expect(res).toBe(fake);
  });
});
