<template>
  <div>
    <SearchProduct />
    <!--
      <div>- [x] seleccionar mes</div>
      <div>- [X] api query con fecha inicio fecha fin</div>
      <div>- [ ] grafico</div>
      <div>- [x] buscador del ultimo precio del un producto</div>
      <div>- [x] Mostrar el ultimo mes</div>
      -->
    <DatePicker @change="onChange" format="YYYY/MM/DD"></DatePicker>
    <GridTickets
      :error="error"
      :loading="loading"
      :status="status"
      :tickets="tickets"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useTicketStore } from "../store/useTicketStore";
import { storeToRefs } from "pinia";
import GridTickets from "../components/GridTickets.vue";
import DatePicker from "../components/DatePicker.vue";
import SearchProduct from "../components/SearchProduct.vue";
import dayjs from "dayjs";

// DEFINE PROPS  ======================================================================================================

const dateRange = ref(null);

const nowDateRange = computed(() => {
  // Primer día del mes
  const min = dayjs().startOf("month").format("YYYY/MM/DD");

  // Último día del mes
  const max = dayjs().endOf("month").format("YYYY/MM/DD");
  return {
    min,
    max,
  };
});

// COMPUTEDS ==========================================================================================================

// COMPOSABLES   ======================================================================================================
const ticketStore = useTicketStore();
const { loading, error, status, tickets } = storeToRefs(ticketStore);

// EVENTS =============================================================================================================
const onChange = (args: any) => {
  console.log({ args });
  dateRange.value = args;
  ticketStore.fetchTickets(dateRange.value);
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================
onMounted(() => {
  ticketStore.fetchTickets(nowDateRange.value);
});
</script>
