// src/App.tsx
import { useDataService } from "@/providers/DataServiceProvider";

export default function App() {
  const svc = useDataService(); // fallará si no está envuelto
  return <div>App OK</div>;
}
