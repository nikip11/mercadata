<template>
  <button
    :type="type"
    @click="handleClick"
    :disabled="disabled || isLoading"
    :class="buttonClasses"
    :style="{
      width: width,
      height: height,
      fontSize: fontSize,
      backgroundColor: backgroundColor,
      color: color,
    }"
  >
    <span v-if="isLoading" class="spinner"></span>
    <slot v-else />
  </button>
</template>
<script lang="ts" setup>
import { computed, toRefs } from "vue";

// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  variant: {
    type: String as () =>
      | "primary"
      | "secondary"
      | "danger"
      | "success"
      | "warning"
      | "info"
      | "light"
      | "dark",
    default: "primary",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "auto",
  },
  height: {
    type: String,
    default: "auto",
  },
  fontSize: {
    type: String,
    default: "1rem",
  },
  backgroundColor: {
    type: String,
    default: "#007bff",
  },
  color: {
    type: String,
    default: "#fff",
  },
});
const {
  type,
  variant,
  disabled,
  isLoading,
  width,
  height,
  fontSize,
  backgroundColor,
  color,
} = toRefs(props);
const emit = defineEmits(["click"]);

const handleClick = async (_event: Event) => {
  if (isLoading.value) return;
  if (type.value === "submit") {
    // Allow form submission
    return;
  }
  emit("click");
};

const buttonClasses = computed(() => {
  return [
    "btn",
    `btn-${variant.value}`,
    {
      disabled: disabled.value || isLoading.value,
    },
  ];
});
</script>
<style scoped>
/* Existing styles */

/* Disabled button styles */
.btn[disabled] {
  cursor: not-allowed;
  opacity: 0.65;
  background-color: #6c757d !important;
  border-color: #6c757d !important;
  color: #fff !important;
}
.spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
