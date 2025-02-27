<template>
  <v-text-field
    append-inner-icon="mdi-magnify"
    label="Buscar último precio"
    v-model="searchValue"
    hide-details
    single-line
    theme="dark"
    @click:append-inner="onChange"
  ></v-text-field>
  <ul>
    <li v-for="(product, index) in productsStore.products" key="index">
      {{ product.product }}: {{ product.last_price }}
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "../store/useProductStore";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({});

const headers = [];
// COMPOSABLES   ======================================================================================================

const productsStore = useProductStore();
const searchValue = ref("");
// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================
const onChange = (value: any) => {
  console.log("search", { searchValue, value });
  productsStore.fetchProducts(searchValue.value);
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================

console.log("SearchProduct", { props });
</script>
