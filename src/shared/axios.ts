import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  headers: {
    "x-public-api-key": "mi-clave-publica-para-front",
    accept: "application/json",
  },
});
