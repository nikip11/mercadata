import { http } from "@/plugins/http";
import useLocalStorage from "@/share/composables/useLocalStorage";
import { defineStore } from "pinia";
import { ref } from "vue";

// const AUTHFY_URL = "http://localhost:8000/auth/mercadata/login";
const AUTHFY_URL =
  "https://authify-production.up.railway.app/auth/mercadata/login";

// TODO: Cambiar a un archivo de configuración
// TODO: hacer un check del token al servicio de authenticacion para verificar si el token no ha expirado
// TODO: Implementar refresh token

interface AuthType {
  accessToken: string;
}

export const useAuthStore = defineStore("auth", () => {
  const { getItem, setItem, removeItem } = useLocalStorage();

  const auth = ref<AuthType | null>(null);
  const error = ref("");
  const loading = ref(false);
  const status = ref(""); // "pending", "success", "error"

  const isAuthenticated = (): boolean => {
    return auth.value !== null && !!auth.value.accessToken;
  };

  const login = async (credentials: any) => {
    loading.value = true;
    status.value = "pending";
    error.value = "";

    try {
      const response = await http.post(AUTHFY_URL, credentials);
      console.log("response", response);
      auth.value = {
        accessToken: response.data.access_token as string,
      };

      setItem("auth", auth.value);

      status.value = "success";
    } catch (err) {
      console.log("Error en el login", err);
      error.value = "Credenciales incorrectas";
      status.value = "error";
    } finally {
      loading.value = false;
    }
  };

  // Método para cerrar sesión
  const logout = () => {
    auth.value = null;
    removeItem("auth");
    status.value = "complete"; // Podría representar que la sesión se ha cerrado
  };

  if (getItem("auth")) {
    auth.value = getItem("auth");
  }

  return {
    auth,
    error,
    loading,
    status,
    login,
    logout,
    isAuthenticated,
  };
});
