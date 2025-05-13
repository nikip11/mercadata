<template>
  <MiniLayout>
    <h1>404 Not found</h1>
    <p>La página que buscas no existe</p>
    <p>¿Quieres volver a la página principal?</p>
    <router-link to="/dashboard">Volver</router-link>
  </MiniLayout>
</template>
<script lang="ts" setup>
import MiniLayout from "@/share/layouts/MiniLayout.vue";
</script>
