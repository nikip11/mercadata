// Configuración usando variables de entorno de Vite
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9999";
export const AUTHIFY_URL =
  import.meta.env.VITE_AUTHIFY_URL || "http://authify.local";
