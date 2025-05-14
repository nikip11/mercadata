<template>
  <div class="line-product_container">
    <div class="product-name">{{ product.product }}</div>
    <div class="quantity">{{ product.count }}</div>
    <div class="price">{{ price }}</div>
    <div class="last-date">{{ lastDate }}</div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// COMPUTEDS ==========================================================================================================
const price = computed(() => {
  return props.product.last_price.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
});

const lastDate = computed(() => {
  return new Date(props.product.last_date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
});
</script>
<style lang="scss" scoped>
.line-product_container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 0.2fr 0.2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "product-name product-name quantity"
    "price price quantity"
    "last-date last-date quantity";
  border-bottom: dotted 1px #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;

  .product-name {
    grid-area: product-name;
    font-weight: 900;
    font-size: 1.1rem;
    margin: 0;
  }

  .last-date {
    grid-area: last-date;
    font-weight: 500;
    text-align: left;
  }

  .price {
    grid-area: price;
    font-weight: 500;
    text-align: left;
  }

  .quantity {
    grid-area: quantity;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
