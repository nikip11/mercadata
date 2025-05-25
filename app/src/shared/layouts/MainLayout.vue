<template>
  <div
    class="wrapper"
    :class="{ 'menu-open': isAsideOpen }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="sidebar-overlay" v-if="isAsideOpen" @click="toggleAside"></div>
    <Aside :class="{ 'mobile-open': isAsideOpen }" />
    <Header @toggle-menu="toggleAside" />
    <main>
      <slot></slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import Aside from "./components/Aside.vue";
import Header from "./components/Header.vue";
import { ref } from "vue";

const isAsideOpen = ref(false);
const touchStartX = ref(0);
const touchEndX = ref(0);
const swipeThreshold = 70; // Umbral en píxeles para considerar un swipe

const toggleAside = () => {
  isAsideOpen.value = !isAsideOpen.value;
};

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  // Swipe derecha (para abrir menú)
  if (
    touchEndX.value - touchStartX.value > swipeThreshold &&
    touchStartX.value < 30
  ) {
    isAsideOpen.value = true;
  }

  // Swipe izquierda (para cerrar menú)
  if (
    touchStartX.value - touchEndX.value > swipeThreshold &&
    isAsideOpen.value
  ) {
    isAsideOpen.value = false;
  }

  // Reiniciar valores
  touchStartX.value = 0;
  touchEndX.value = 0;
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 300px 1fr 1fr;
  grid-template-rows: 100px 1.7fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "aside header header"
    "aside main main"
    "aside main main";

  /* Media queries para hacer el diseño responsive */
  @media (max-width: 1024px) {
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "aside header"
      "aside main"
      "aside main";
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header"
      "main";

    /* Para crear una zona sensible a swipe en el borde izquierdo */
    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 20px;
      height: 100%;
      z-index: 5;
    }
  }

  @media (max-width: 480px) {
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "header"
      "main";
  }
}

main {
  grid-area: main;
  background-color: #f6f7f9;
  padding: 40px;
  color: #333;
  min-height: calc(100vh - 90px);
  height: 100%;

  /* Ajustar el padding en pantallas pequeñas */
  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
}

.sidebar-overlay {
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 90;
  }
}
</style>
