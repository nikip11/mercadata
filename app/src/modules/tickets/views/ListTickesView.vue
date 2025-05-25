<template>
  <MainLayout>
    <div class="header-container mb-4">
      <v-btn
        :color="isUploadVisible ? 'error' : 'primary'"
        @click="toggleUploadVisibility"
        variant="outlined"
        class="toggle-btn"
      >
        <v-icon class="me-1">{{
          isUploadVisible ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
        {{ isUploadVisible ? "Ocultar formulario" : "Subir tickets" }}
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-show="isUploadVisible">
        <UploadTickets @files-uploaded="handleFilesUploaded" />
      </div>
    </v-expand-transition>

    <Container>
      <!-- <SearchProduct /> -->
      <!-- <DatePicker @change="onChange" format="YYYY/MM/DD"></DatePicker> -->
      <!-- selector de meses por botones 12 botones -->
      <div class="wrapper_date">
        <DateSelector :minYear="2024" @change="onChange" />
        <Total :total="total" />
      </div>

      <GridTickets
        :error="error"
        :loading="loading"
        :status="status"
        :tickets="normalizedTickets"
      />
    </Container>
  </MainLayout>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTicketStore } from "../store/useTicketStore";
import GridTickets from "../components/GridTickets.vue";
// import SearchProduct from "../components/SearchProduct.vue";
import MainLayout from "@/shared/layouts/MainLayout.vue";
import Container from "@/shared/components/Container.vue";
import DateSelector from "../components/DateSelector.vue";
import Total from "../components/Total.vue";
import { createMonthDateRange } from "@/helpers/date";
import UploadTickets from "../components/UploadTickets/UploadTickets.vue";
// DEFINE PROPS  ======================================================================================================

// Estado para controlar la visibilidad del componente UploadTickets
const isUploadVisible = ref(false);

const nowDateRange = ref(createMonthDateRange());

// COMPOSABLES   ======================================================================================================
const ticketStore = useTicketStore();
const { loading, error: rawError, status, tickets } = storeToRefs(ticketStore);

const error = computed(() => rawError.value || undefined);

const normalizedTickets = computed(() => tickets.value || undefined);

const total = computed(() => {
  return ticketStore.tickets
    ? ticketStore.tickets.reduce(
        (sum, ticket) => sum + (Number(ticket.total) || 0),
        0
      )
    : 0;
});

// EVENTS =============================================================================================================
const onChange = (args: { year: number; month: number }) => {
  // dateRange.value = args;
  const dateRange = createMonthDateRange(args.month, args.year);
  // dateRange.value = args;
  ticketStore.fetchTickets(dateRange);
};

// Método para alternar la visibilidad del componente UploadTickets
const toggleUploadVisibility = () => {
  isUploadVisible.value = !isUploadVisible.value;
};

// Método para manejar cuando se suben archivos
const handleFilesUploaded = (files: File[]) => {
  console.log("Archivos subidos:", files);
  // Aquí podrías implementar lógica adicional después de subir los archivos
  // Por ejemplo, actualizar la lista de tickets
  ticketStore.fetchTickets(nowDateRange.value);
  // Opcionalmente, ocultar el componente después de subir
  // isUploadVisible.value = false;
};

// HOOKS =============================================================================================================
onMounted(() => {
  ticketStore.fetchTickets(nowDateRange.value);
});
</script>
<style lang="scss" scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
}

.toggle-btn {
  transition: all 0.3s ease;
}

.wrapper_date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
