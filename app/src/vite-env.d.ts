/// <reference types="vite/client" />

// Definición de tipos para las variables de entorno
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTHIFY_URL: string;
  // Añadir otras variables de entorno según sea necesario
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
