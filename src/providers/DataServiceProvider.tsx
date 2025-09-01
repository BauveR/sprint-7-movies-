import { createContext, useContext, PropsWithChildren } from "react";
import type { DataService } from "../features/movies/service";
import { tmdbService } from "../infra/tmdbService";

const DataServiceCtx = createContext<DataService>(tmdbService);

export function DataServiceProvider({ children }: PropsWithChildren) {
  return <DataServiceCtx.Provider value={tmdbService}>{children}</DataServiceCtx.Provider>;
}

export const useDataService = () => useContext(DataServiceCtx);
