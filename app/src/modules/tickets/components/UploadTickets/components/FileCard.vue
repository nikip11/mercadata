<template>
  <v-card variant="outlined" class="file-card">
    <div class="file-icon-container">
      <v-icon :color="getFileIconColor(file.name)" size="small">{{
        getFileIcon(file.name)
      }}</v-icon>
      <div class="file-extension-badge ml-1">
        {{ getFileExtension(file.name) }}
      </div>
    </div>
    <v-card-item class="pa-2">
      <div class="d-flex flex-column align-center text-center">
        <div class="text-truncate file-name">{{ file.name }}</div>
        <div class="text-caption" style="font-size: 0.7rem">
          {{ formatFileSize(file.size) }}
        </div>
      </div>
    </v-card-item>
    <div class="d-flex justify-end px-1 py-0">
      <v-btn
        icon
        size="x-small"
        variant="text"
        color="error"
        density="compact"
        @click="$emit('remove')"
        class="remove-btn"
      >
        <v-icon size="small">mdi-delete</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import {
  getFileExtension,
  getFileIcon,
  getFileIconColor,
  formatFileSize,
} from "../utils";

defineProps<{
  file: File;
}>();

defineEmits<{
  (e: "remove"): void;
}>();
</script>

<style lang="scss" scoped>
.file-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
}

.file-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 8px;
  height: 50px;
}

.file-name {
  max-width: 100%;
  font-weight: 500;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.85rem;
}

.file-extension-badge {
  background-color: #f0f0f0;
  color: #555;
  font-size: 0.65rem;
  padding: 1px 6px;
  border-radius: 10px;
  margin-bottom: 6px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
}

.remove-btn {
  opacity: 0.8;
}
</style>
