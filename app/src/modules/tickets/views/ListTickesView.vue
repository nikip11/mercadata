<template>
  <MainLayout>
    <Container>
      <SearchProduct />
      <DatePicker @change="onChange" format="YYYY/MM/DD"></DatePicker>
      <!-- selector de meses por botones 12 botones -->
      <div>
        <button
          v-for="month in monthNames"
          :key="month.id"
          @click="onChange(month)"
        >
          {{ month.name }}
        </button>
      </div>
      <div>
        <button v-for="year in years" :key="year.id" @click="onChange(year)">
          {{ year.name }}
        </button>
      </div>
      <div>total: {{ total }}</div>
      <GridTickets
        :error="error"
        :loading="loading"
        :status="status"
        :tickets="normalizedTickets"
      />
    </Container>
  </MainLayout>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useTicketStore } from "../store/useTicketStore";
import GridTickets from "../components/GridTickets.vue";
import DatePicker from "../components/DatePicker.vue";
import SearchProduct from "../components/SearchProduct.vue";
import MainLayout from "@/share/layouts/MainLayout.vue";
import Container from "@/share/components/Container.vue";
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

// crea una computada con un array de objetos donde una propiedad sea el id con el numero del mes y otra el nombre de meses acortados
const monthNames = computed(() => {
  return Array.from({ length: 12 }, (_v, i) => ({
    id: i + 1,
    name: dayjs().month(i).format("MMM"),
  }));
});

const years = computed(() => {
  return Array.from({ length: 2 }, (_v, i) => ({
    id: i + 1,
    name: dayjs().subtract(i, "year").format("YYYY"),
  }));
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
