import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("token") || null);
  const error = ref("");
  const loading = ref(false);
  const status = ref(""); // "pending", "success", "error"

  // Método para iniciar sesión
  const login = async (credentials: any) => {
    loading.value = true;
    status.value = "pending";
    error.value = "";

    try {
      const response = await http.post("/login", credentials);
      token.value = response.data.token;
      user.value = response.data.user;

      // Guardar el token en localStorage
      localStorage.setItem("token", token.value as string);

      status.value = "success";
    } catch (err) {
      error.value = "Credenciales incorrectas";
      status.value = "error";
    } finally {
      loading.value = false;
    }
  };

  // Método para cerrar sesión
  const logout = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    status.value = "complete"; // Podría representar que la sesión se ha cerrado
  };

  return { user, token, error, loading, status, login, logout };
});
