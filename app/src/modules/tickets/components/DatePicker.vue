<template>
  <div class="d-flex justify-center">
    <v-date-input
      v-model="inputValue"
      label="Selecciona rango de fecha"
      max-width="100%"
      multiple="range"
      theme="dark"
      @update:modelValue="onUpdate"
    ></v-date-input>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";

const emits = defineEmits(["change"]);
// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  format: {
    type: String,
    default: "DD-MM-YYYY",
  },
});
const inputValue = ref(null);
// COMPOSABLES   ======================================================================================================

// COMPUTEDS ==========================================================================================================

// EVENTS =============================================================================================================
const onUpdate = (value: any) => {
  const min = dayjs(value[0]).format(props.format);
  const max = dayjs(value[value.length - 1]).format(props.format);
  emits("change", { min, max });
};
// METHODS ============================================================================================================

// HOOKS =============================================================================================================

console.log("DatePicker", { props });
</script>
