<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { URL_ROUTES } from "@/plugins/router/routerType";
import { useAuthStore } from "../store/useAuthStore";

const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  console.log("Logging in with:", {
    email: email.value,
    password: password.value,
  });

  await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (authStore.isAuthenticated()) {
    console.log("Login successful");
    router.push({ name: URL_ROUTES.DASHBOARD });
  } else {
    console.error("Login failed", authStore.isAuthenticated());
  }
};
</script>

<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

@media (prefers-color-scheme: dark) {
  .login-wrapper {
    background-color: #242424;
  }
}

.login-container {
  max-width: 100%;
  width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-container h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.login-container form div {
  margin-bottom: 1rem;
}

.login-container label {
  display: block;
  margin-bottom: 0.5rem;
}

.login-container input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container button:hover {
  background-color: #0056b3;
}
</style>
