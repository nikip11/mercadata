<template>
  <div :class="props.class">
    <div class="wrapper">
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
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  // height: 100%;
}
</style>
