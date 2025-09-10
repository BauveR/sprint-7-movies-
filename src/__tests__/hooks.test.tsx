import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const { getMoviesMock, getMovieByIdMock } = vi.hoisted(() => ({
  getMoviesMock: vi.fn(),
  getMovieByIdMock: vi.fn(),
}));


vi.mock("@/providers/DataServiceProvider", () => ({
  useDataService: () => ({
    getMovies: getMoviesMock,
    getMovieById: getMovieByIdMock,
  }),
}));

import { useMovies, useMovie } from "@/features/movies/hooks";

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: Infinity },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}

beforeEach(() => {
  getMoviesMock.mockReset();
  getMovieByIdMock.mockReset();
});

describe("useMovies", () => {
  test("llama al servicio con la página y devuelve data", async () => {
    const fake = { results: [{ id: 1, title: "Foo" }], page: 2, total_pages: 10, total_results: 100 };
    getMoviesMock.mockResolvedValueOnce(fake);

    const { result } = renderHook(({ page }) => useMovies(page), {
      wrapper: createWrapper(),
      initialProps: { page: 2 },
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getMoviesMock).toHaveBeenCalledTimes(1);
    expect(getMoviesMock).toHaveBeenCalledWith(2);
    expect(result.current.data).toBe(fake);
  });

  test("refetch al cambiar de página", async () => {
    getMoviesMock.mockResolvedValueOnce({ results: [], page: 1, total_pages: 1, total_results: 0 });
    const { result, rerender } = renderHook(({ page }) => useMovies(page), {
      wrapper: createWrapper(),
      initialProps: { page: 1 },
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    getMoviesMock.mockResolvedValueOnce({ results: [], page: 3, total_pages: 5, total_results: 50 });
    rerender({ page: 3 });

    await waitFor(() => expect(result.current.data?.page).toBe(3));
    expect(getMoviesMock).toHaveBeenCalledTimes(2);
    expect(getMoviesMock).toHaveBeenLastCalledWith(3);
  });
});

describe("useMovie", () => {
  test("enabled: false cuando id falsy (no llama al servicio)", async () => {
    const { result } = renderHook(() => useMovie(0 as unknown as number), {
      wrapper: createWrapper(),
    });

    expect(getMovieByIdMock).not.toHaveBeenCalled();
    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.status).toBe("pending");
  });

  test("llama al servicio con id y devuelve data", async () => {
    const movie = {
      id: 42,
      title: "Bar",
      overview: "Lorem",
      poster_path: "/p.jpg",
      release_date: "2024-01-01",
      vote_average: 8.1,
    };
    getMovieByIdMock.mockResolvedValueOnce(movie);

    const { result } = renderHook(() => useMovie(42), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(getMovieByIdMock).toHaveBeenCalledTimes(1);
    expect(getMovieByIdMock).toHaveBeenCalledWith(42);
    expect(result.current.data).toBe(movie);
  });
});
