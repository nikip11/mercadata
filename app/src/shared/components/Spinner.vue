<template>
  <div class="wrapper-spinner">
    <div class="spinner" :style="spinnerStyle">
      <div class="spinner__circle"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.wrapper-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 350px;
}
.spinner {
  display: inline-block;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
  width: 100px;
  height: 100px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
