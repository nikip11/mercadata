<template>
  <div>
    <BarChart :chartData="data"></BarChart>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useTotalStore } from "../stores/useTotalStore";

Chart.register(...registerables);

// COMPOSABLES   ======================================================================================================
// primer dia del año
const min = dayjs().startOf("year").format("YYYY/MM/DD");
const max = dayjs().endOf("month").format("YYYY/MM/DD");

const totalStore = useTotalStore();
const data = computed(() => {
  return {
    labels: totalStore.getTotal.keys,
    datasets: [
      {
        data: totalStore.getTotal.values as (
          | number
          | [number, number]
          | null
        )[],
        backgroundColor: [
          "#77CEFF",
          "#0079AF",
          "#123E6B",
          "#97B0C4",
          "#A5C8ED",
        ],
      },
    ],
  };
});
// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================

// METHODS ============================================================================================================

// HOOKS =============================================================================================================
onMounted(async () => {
  await totalStore.fetchTotal(min, max);
});
</script>
