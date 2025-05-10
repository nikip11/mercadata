<template>
  <div class="container">
    <Navigation />
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import Navigation from "@/share/components/Navigation.vue";
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 1200px;
}

@media (prefers-color-scheme: dark) {
  .container {
    background-color: #242424;
  }
}
</style>
