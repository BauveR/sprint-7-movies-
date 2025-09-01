src/
├─ app/
│  ├─ providers/
│  │  └─ DataServiceProvider.tsx
│  └─ main.tsx
├─ shared/
│  └─ axios.ts                # baseURL:'/api' (hablando con tu guard)
├─ features/
│  ├─ movies/
│  │  ├─ types.ts
│  │  ├─ hooks.ts             # usa el servicio (no axios)
│  │  └─ service.ts           # interfaz + shape del servicio
│  └─ persons/
│     ├─ types.ts
│     └─ hooks.ts
├─ infrastructure/
│  └─ tmdbService.ts          # implementación concreta del servicio
└─ App.tsx
