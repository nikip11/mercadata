<template>
  <h1>Bye bye</h1>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/useAuthStore";
import { URL_ROUTES } from "@/plugins/router/routerType";

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push({ name: URL_ROUTES.LOGIN });
}

logout();
</script>
