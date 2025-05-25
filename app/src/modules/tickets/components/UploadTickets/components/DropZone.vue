<template>
  <div
    class="upload-zone"
    :class="{ 'drag-over': isDragging }"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
    @drop.prevent="handleDrop"
    @click="triggerFileInput"
  >
    <v-icon v-if="!isLoading" size="60" color="primary" class="mb-4"
      >mdi-cloud-upload-outline</v-icon
    >
    <v-progress-circular
      v-else
      indeterminate
      color="primary"
      size="60"
      class="mb-4"
    ></v-progress-circular>

    <p v-if="!hasFiles">
      {{
        isDragging
          ? "Suelta los archivos aquí"
          : "Arrastra y suelta los archivos aquí o haz clic para seleccionarlos"
      }}
    </p>
    <p v-else>{{ fileInfoText }}</p>

    <input
      ref="fileInput"
      type="file"
      :accept="acceptedFiles"
      multiple
      @change="handleFileSelect"
      style="display: none"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { isFileTypeAccepted, formatFileSize } from "../utils";

const props = defineProps({
  acceptedFiles: {
    type: String,
    default: ".csv, .xlsx, .xls, .pdf",
  },
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024, // 10MB por defecto
  },
  files: {
    type: Array as () => File[],
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: "files-added", files: File[]): void;
}>();

// REFS
const isDragging = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// COMPUTEDS
const hasFiles = computed(() => props.files.length > 0);

const fileInfoText = computed(() => {
  const count = props.files.length;
  return count === 1
    ? `1 archivo seleccionado`
    : `${count} archivos seleccionados`;
});

// METHODS
const handleDragEnter = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  const droppedFiles = e.dataTransfer?.files;
  if (droppedFiles) {
    addFiles(droppedFiles);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    addFiles(target.files);
    // Limpia el input para que se puedan seleccionar los mismos archivos nuevamente
    target.value = "";
  }
};

const addFiles = (fileList: FileList) => {
  const newFiles: File[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    // Verificar tamaño máximo
    if (file.size > props.maxFileSize) {
      alert(
        `El archivo ${
          file.name
        } excede el tamaño máximo permitido (${formatFileSize(
          props.maxFileSize
        )}).`
      );
      continue;
    }

    // Verificar si el tipo de archivo es aceptado (si hay restricción)
    if (props.acceptedFiles && !isFileTypeAccepted(file, props.acceptedFiles)) {
      alert(`El tipo de archivo ${file.name} no está permitido.`);
      continue;
    }

    // Verificar si el archivo ya existe
    const exists = props.files.some(
      (f) => f.name === file.name && f.size === file.size
    );
    if (!exists) {
      newFiles.push(file);
    }
  }

  if (newFiles.length > 0) {
    emit("files-added", newFiles);
  }
};
</script>

<style lang="scss" scoped>
.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 250px;
  height: 100%;

  &:hover {
    border-color: #2196f3;
    background-color: #f0f7ff;
  }

  &.drag-over {
    border-color: #2196f3;
    background-color: #e3f2fd;
  }

  p {
    margin: 10px 0;
    color: #666;
  }
}
</style>
