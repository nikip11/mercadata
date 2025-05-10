<template>
  <!-- <v-data-table
    v-if="tickets"
    :items="tickets || []"
    :headers="headers"
    item-key="invoiceId"
    :expand-on-click="true"
    width="100%"
    theme="dark"
    density="compact"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
    </template>
    <template v-slot:expanded-row="{ item }">
      <v-data-table :items="item.products"></v-data-table>
    </template>
  </v-data-table> -->
  <GridWithSpinner
    :items="tickets || []"
    :headers="headers"
    item-key="invoiceId"
    :expand-on-click="true"
    width="100%"
    theme="dark"
    density="compact"
    :loading="loading"
  />
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { Ticket } from "../types/Ticket";
import GridWithSpinner from "@/share/components/GridWithSpinner.vue";
// import Grid from "@/share/components/Grid.vue";

// DEFINE PROPS  ======================================================================================================
defineProps({
  loading: Boolean,
  status: String,
  error: String,
  tickets: Array<Ticket>,
});

// COMPUTEDS ==========================================================================================================
const headers = computed(() => [
  {
    title: "id",
    sortable: false,
    value: "invoiceId",
  },
  {
    title: "fecha",
    sortable: true,
    value: "ticket_date",
  },
  {
    title: "total",
    sortable: true,
    value: "total",
  },
]);
</script>
