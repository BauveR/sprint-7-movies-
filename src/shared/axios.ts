import axios from "axios";
import { ENV } from "@/shared/env";

// 🔧 Normaliza el Bearer (acepta con o sin "Bearer ")
function normalizeBearer(raw: string) {
  const t = (raw || "").trim().replace(/^"+|"+$/g, "");
  return t.startsWith("Bearer ") ? t : t ? `Bearer ${t}` : "";
}

const AUTH = normalizeBearer(ENV.TMDB_BEARER);

// Valida formato JWT (v4)
const isJwt =
  /^Bearer\s+[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(AUTH);

if (import.meta.env.DEV) {
  const safe = (s: string) =>
    s ? `${s.slice(0, 4)}…${s.slice(-4)} (len=${s.length})` : "(vacío)";
  console.log("[TMDB] baseURL =", ENV.TMDB_URL);
  console.log("[TMDB] token(raw) =", safe(ENV.TMDB_BEARER));
  console.log("[TMDB] auth(hdr) =", safe(AUTH), "| jwt?", isJwt);
  if (!isJwt) {
    console.warn(
      "[TMDB] Token v4 inválido o vacío. Se intentará usar api_key v3 si existe."
    );
  }
}

// 🚀 Cliente Axios
export const http = axios.create({
  baseURL: ENV.TMDB_URL, // https://api.themoviedb.org/3
  headers: {
    accept: "application/json",
    ...(isJwt ? { Authorization: AUTH } : {}), // solo setea Bearer si es válido
  },
});

// Interceptor: si no hay Bearer válido, añade api_key v3 como query param
http.interceptors.request.use((config) => {
  if (!isJwt && ENV.TMDB_API_KEY) {
    config.params = { ...(config.params || {}), api_key: ENV.TMDB_API_KEY };
  }
  return config;
});

// Interceptor de respuesta para debug
http.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    const url = (err?.config?.baseURL || "") + (err?.config?.url || "");
    const params = err?.config?.params;
    const method = err?.config?.method;
    const hasAuth = !!err?.config?.headers?.Authorization;
    const data = err?.response?.data;

    console.error("[TMDB ERROR]", { status, method, url, params, hasAuth, data });
    return Promise.reject(err);
  }
);
