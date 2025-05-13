<template>
  <div class="total_wrapper">
    <h1>{{ total }}</h1>
    <span>Total</span>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
});

// convert number to currency format
const total = computed(() => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(props.total);
});
</script>
<style scoped>
.total_wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  h1 {
    text-align: right;
  }
}
</style>
