<template>
  <ol>
    <li v-for="(product, index) in topProductsStore.topProducts" :key="index">
      <LinePtoduct :product="product" />
    </li>
  </ol>
</template>
<script lang="ts" setup>
import LinePtoduct from "./LinePtoduct.vue";
import { useTopProductsStore } from "../stores/useTopProductsStore";
import { onMounted } from "vue";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({});

const topProductsStore = useTopProductsStore();

// COMPOSABLES   ======================================================================================================

// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================

// METHODS ============================================================================================================

// HOOKS =============================================================================================================

onMounted(() => {
  topProductsStore.fetchTopProducts();
});
console.log("TopProducts", { props });
</script>
<style lang="scss" scoped>
ol {
  list-style: none;
  counter-reset: my-counter;

  li {
    counter-increment: my-counter;
    position: relative;
    padding-left: 40px;
    margin-bottom: 1rem;

    &::before {
      content: counter(my-counter);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-weight: bold;
      font-size: 1.8rem;
    }
  }
}
</style>
