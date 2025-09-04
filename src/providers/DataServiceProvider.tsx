import { createContext, useContext, PropsWithChildren } from "react";
import type { DataService } from "@/features/movies/service";
import { tmdbService } from "@/infra/tmdbService";

const Ctx = createContext<DataService | null>(null);

export function DataServiceProvider({ children }: PropsWithChildren) {
  return <Ctx.Provider value={tmdbService}>{children}</Ctx.Provider>;
}

export function useDataService(): DataService {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDataService debe usarse dentro de <DataServiceProvider>.");
  return v;
}
