<template>
  <div>
    <div
      class="ticket"
      v-for="ticket in lastTicketStore.lastTickets"
      :key="ticket._id"
    >
      <p>Fecha: {{ ticket.ticket_date }}</p>
      <p>Total: ${{ ticket.totalCalc.toFixed(2) }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import useLastTicketsStore from "../stores/useLastTicketsStore";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({});
// COMPOSABLES   ======================================================================================================
const lastTicketStore = useLastTicketsStore();
// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================

// METHODS ============================================================================================================

// HOOKS =============================================================================================================
onMounted(() => {
  lastTicketStore.fetchLastTickets();
});
console.log("LastTickets", { props });
</script>
