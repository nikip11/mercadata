<template>
  <header>
    <button class="menu-toggle" @click="$emit('toggle-menu')">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <input type="text" placeholder="Search..." class="search-input" />
    <div class="user-info">
      <CircleUser />
      Usuario
    </div>
  </header>
</template>
<script lang="ts" setup>
import CircleUser from "@/assets/icons/circle-user.svg";
defineEmits(["toggle-menu"]);
</script>
<style lang="scss" scoped>
header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  /* Estilos responsive */
  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 10px 15px;
  }
}

.search-input {
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f6f7f9;

  /* Hacer que el input se ajuste al ancho disponible en pantallas pequeñas */
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 80%;
  }
}

.menu-toggle {
  display: none;
  border: none;
  background: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #333;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
}

.user-info {
  text-decoration: none;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
}
</style>
