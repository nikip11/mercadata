import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { ref } from "vue";
import { httpStatus } from "@/shared/enum/http";
import type { Ticket } from "@/modules/tickets/types/Ticket";

const useLastTicketsStore = defineStore("lastTickets", () => {
  const lastTickets = ref<Ticket[]>([]);
  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<httpStatus>(httpStatus.PENDING);

  async function fetchLastTickets() {
    loading.value = true;
    errorData.value = null;
    status.value = httpStatus.PENDING;
    console.log("Fetching last tickets...");
    try {
      lastTickets.value = await http.get("/tickets/last");
      status.value = httpStatus.SUCCESS;
    } catch (error) {
      errorData.value = "Error fetching last tickets";
      status.value = httpStatus.ERROR;
    } finally {
      loading.value = false;
    }
  }

  return {
    lastTickets,
    errorData,
    loading,
    status,
    fetchLastTickets,
  };
});

export default useLastTicketsStore;
