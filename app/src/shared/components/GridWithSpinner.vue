<template>
  <Grid v-bind="gridProps" />
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";
import Grid from "./Grid.vue";

// DEFINE PROPS ===============================================================================================
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
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
});

// COMPUTED PROPERTIES =======================================================================================
const gridProps = computed(() => ({
  items: props.items,
  headers: props.headers,
  itemKey: props.itemKey,
  expandOnClick: props.expandOnClick,
  width: props.width,
  theme: props.theme,
  density: props.density,
}));
</script>

<style scoped>
.d-flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
</style>
