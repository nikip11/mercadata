<template>
  <div v-if="items.length === 0">No items found</div>
  <v-data-table
    v-else
    :items="items"
    :headers="headers"
    item-key="invoiceId"
    :expand-on-click="true"
    width="100%"
    :loading="loading"
    density="compact"
  >
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
    </template>

    <template v-slot:expanded-row="{ item }">
      <v-data-table :items="item.products"></v-data-table>
    </template>
  </v-data-table>
</template>
<script lang="ts" setup>
import { PropType } from "vue";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: true,
  },
  headers: {
    type: Array as PropType<
      readonly {
        key?:
          | "data-table-group"
          | "data-table-select"
          | "data-table-expand"
          | string;
        value?: string | ((item: any) => any);
        title?: string;
        align?: "start" | "center" | "end";
        sortable?: boolean;
        width?: string | number;
        filterable?: boolean;
        divider?: boolean;
        class?: string | string[];
        children?: readonly any[];
      }[]
    >,
    required: true,
  },
  itemKey: {
    type: String,
    default: "id",
  },
  expandOnClick: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "100%",
  },
  theme: {
    type: String,
    default: "dark",
  },
  density: {
    type: String,
    default: "compact",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
// COMPOSABLES   ======================================================================================================

// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================

// METHODS ============================================================================================================

// HOOKS =============================================================================================================

console.log("Grid", { props });
</script>
