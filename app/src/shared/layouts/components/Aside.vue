<template>
  <aside>
    <Logo />
    <Navigation />
  </aside>
</template>
<script lang="ts" setup>
import Navigation from "@/share/components/Navigation.vue";
import Logo from "@/share/components/Logo.vue";
</script>
<style lang="scss" scoped>
aside {
  grid-area: aside;
  background-color: white;
  height: 100vh;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;

  /* Estilos responsive */
  @media (max-width: 768px) {
    position: fixed;
    left: -265px; /* Inicialmente oculto fuera de la pantalla solo en móvil */
    top: 0;
    width: 265px;
    height: 100%;
    transition: transform 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);

    &.mobile-open {
      transform: translateX(265px); /* Desplaza el menú a la vista */
    }
  }

  @media (max-width: 480px) {
    padding: 15px 10px;
    width: 250px;
    left: -250px;

    &.mobile-open {
      transform: translateX(250px);
    }
  }
}
</style>
