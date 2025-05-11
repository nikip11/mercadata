<template>
  <div>
    <button
      v-for="month in monthNames"
      :key="month.id"
      @click="onChangeMonth(month)"
    >
      {{ month.name }}
    </button>
  </div>
  <div>
    <button v-for="year in years" :key="year.id" @click="onChangeYear(year)">
      {{ year.name }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";

// DEFINE PROPS  ======================================================================================================
const emit = defineEmits(["change"]);
defineProps({
  autoSelect: {
    type: Boolean,
    default: false,
  },
});

const month = ref(1);
const year = ref(2025);
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
  return Array.from({ length: 2 }, (_v, i) => ({
    id: i + 1,
    name: dayjs().subtract(i, "year").format("YYYY"),
  }));
});
// EVENTS =============================================================================================================
const onChangeMonth = (item: { id: number; name: string }) => {
  console.log("onChangeMonth", item);
  emit("change", {
    month: item.id,
    year: year.value,
  });
};

const onChangeYear = (item: { id: number; name: string }) => {
  console.log("onChangeYear", item);
  emit("change", {
    month: month.value,
    year: item.id,
  });
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================
</script>
