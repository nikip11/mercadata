<template>
  <MainLayout>
    <Container>
      <!-- <SearchProduct /> -->
      <!-- <DatePicker @change="onChange" format="YYYY/MM/DD"></DatePicker> -->
      <!-- selector de meses por botones 12 botones -->
      <div class="wrapper_date">
        <DateSelector :minYear="2024" @change="onChange" />
        <Total :total="total" />
      </div>

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
import { useTicketStore } from "../store/useTicketStore";
import GridTickets from "../components/GridTickets.vue";
// import SearchProduct from "../components/SearchProduct.vue";
import MainLayout from "@/share/layouts/MainLayout.vue";
import Container from "@/share/components/Container.vue";
import DateSelector from "../components/DateSelector.vue";
import Total from "../components/Total.vue";
import { createMonthDateRange } from "@/helpers/date";
// DEFINE PROPS  ======================================================================================================

const nowDateRange = ref(createMonthDateRange());

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
const onChange = (args: { year: number; month: number }) => {
  // dateRange.value = args;
  const dateRange = createMonthDateRange(args.month, args.year);
  // dateRange.value = args;
  ticketStore.fetchTickets(dateRange);
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================
onMounted(() => {
  ticketStore.fetchTickets(nowDateRange.value);
});
</script>
<style lang="scss" scoped>
.wrapper_date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
