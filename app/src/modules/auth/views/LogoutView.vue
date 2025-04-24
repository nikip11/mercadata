<template>
  <h1>Bye bye</h1>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { URL_ROUTES } from "@/plugins/router/routerType";
import { useAuthStore } from "@/modules/auth/store/useAuthStore";

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push({ name: URL_ROUTES.LOGIN });
}

logout();
</script>
