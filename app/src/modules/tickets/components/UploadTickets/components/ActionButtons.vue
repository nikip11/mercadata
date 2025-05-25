<template>
  <div class="d-flex justify-end mt-4">
    <v-btn
      color="error"
      variant="text"
      @click="$emit('clear')"
      :disabled="!hasFiles || isLoading"
      class="me-2"
    >
      Limpiar
    </v-btn>
    <v-btn
      color="primary"
      @click="$emit('upload')"
      :loading="isLoading"
      :disabled="!hasFiles || isLoading"
    >
      Subir archivos
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  hasFiles: boolean;
  isLoading: boolean;
}>();

defineEmits<{
  (e: "clear"): void;
  (e: "upload"): void;
}>();
</script>
