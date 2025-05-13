<template>
  <div class="date-selector_wrapper">
    <div class="month_wrapper">
      <button
        v-for="monthItem in monthNames"
        :key="monthItem.id"
        @click="onChangeMonth(monthItem)"
        :class="{ selected: selectedMonth === monthItem.id }"
      >
        {{ monthItem.name }}
      </button>
    </div>
    <div class="year_wrapper">
      <button
        v-for="yearItem in years"
        :key="yearItem.id"
        @click="onChangeYear(yearItem)"
        :class="{ selected: selectedYear === yearItem.id }"
      >
        {{ yearItem.name }}
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";

// DEFINE PROPS  ======================================================================================================
const emit = defineEmits(["change"]);
const props = defineProps({
  minYear: {
    type: Number,
    default: 1930,
  },
  maxYear: {
    type: Number,
    default: 2025,
  },
});

const currentMonth = dayjs().month() + 1; // dayjs months are 0-indexed, adding 1 for display
const currentYear = dayjs().year();

const month = ref(currentMonth);
const year = ref(currentYear);
const selectedMonth = ref(currentMonth);
const selectedYear = ref(currentYear);

// COMPOSABLES   ======================================================================================================

// STORE ACTIONS ======================================================================================================

// STORE GETTERS ======================================================================================================

// COMPUTEDS ==========================================================================================================
// crea una computada con un array de objetos donde una propiedad sea el id con el numero del mes y otra el nombre de meses acortados
const monthNames = computed(() => {
  return Array.from({ length: 12 }, (_v, i) => ({
    id: i + 1,
    name: dayjs().month(i).format("MMM"),
  }));
});

const years = computed(() => {
  return Array.from({ length: props.maxYear - props.minYear + 1 }, (_v, i) => ({
    id: props.minYear + i,
    name: String(props.minYear + i),
  }));
});
// EVENTS =============================================================================================================
const onChangeMonth = (item: { id: number; name: string }) => {
  console.log("onChangeMonth", item);
  selectedMonth.value = item.id;
  month.value = item.id;
  emit("change", {
    month: item.id,
    year: year.value,
  });
};

const onChangeYear = (item: { id: number; name: string }) => {
  console.log("onChangeYear", item);
  selectedYear.value = item.id;
  year.value = item.id;
  emit("change", {
    month: month.value,
    year: item.id,
  });
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================
</script>
<style lang="scss" scoped>
.date-selector_wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.month_wrapper {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  width: 100%;
}
.year_wrapper {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}
button {
  background-color: white;
  color: black;
  border: 1px solid lightgray;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
button:hover {
  background-color: lightgray;
  color: #333;
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(69, 69, 69, 0.5);
}
button:active {
  background-color: #004085;
}
button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
button.selected {
  background-color: #333;
  color: white;
  border-color: #333;
}
</style>
