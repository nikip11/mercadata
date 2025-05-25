<template>
  <div class="file-list h-100">
    <h4 class="text-subtitle-1 mb-3">Archivos seleccionados</h4>
    <div class="file-grid">
      <v-row>
        <v-col
          v-for="(file, index) in files"
          :key="index"
          cols="6"
          sm="6"
          md="4"
          lg="4"
          xl="3"
        >
          <FileCard :file="file" @remove="$emit('remove-file', index)" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FileCard from "./FileCard.vue";

defineProps<{
  files: File[];
}>();

defineEmits<{
  (e: "remove-file", index: number): void;
}>();
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .file-grid {
    flex: 1;
    overflow-y: auto;
    padding-right: 8px;
    max-height: 350px;
  }
}
</style>
