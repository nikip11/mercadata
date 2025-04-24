<template>
  <MainLayout>
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
      <div>total: {{ total }}</div>
      <GridTickets
        :error="error"
        :loading="loading"
        :status="status"
        :tickets="normalizedTickets"
      />
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useTicketStore } from "../store/useTicketStore";
import { storeToRefs } from "pinia";
import GridTickets from "../components/GridTickets.vue";
import DatePicker from "../components/DatePicker.vue";
import SearchProduct from "../components/SearchProduct.vue";
import dayjs from "dayjs";
import MainLayout from "@/share/layouts/MainLayout.vue";

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
const { loading, error: rawError, status, tickets } = storeToRefs(ticketStore);

const error = computed(() => rawError.value || undefined);

const normalizedTickets = computed(() => tickets.value || undefined);

const total = computed(() => {
  return ticketStore.tickets
    ? ticketStore.tickets.reduce(
        (sum, ticket) => sum + (Number(ticket.total) || 0),
        0
      )
    : 0;
});

// EVENTS =============================================================================================================
const onChange = (args: any) => {
  console.log({ args });
  dateRange.value = args;
  ticketStore.fetchTickets(dateRange.value || undefined);
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================
onMounted(() => {
  ticketStore.fetchTickets(nowDateRange.value);
});
</script>
