<template>
  <div :class="props.class">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
