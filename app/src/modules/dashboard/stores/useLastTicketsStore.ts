import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { ref } from "vue";
import { TotalStatus } from "@/shared/enums";

const useLastTicketsStore = defineStore("lastTickets", () => {
  const lastTickets = ref([]);
  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<TotalStatus>(TotalStatus.Pending);

  async function fetchLastTickets() {
    loading.value = true;
    errorData.value = null;
    status.value = TotalStatus.Pending;
    console.log("Fetching last tickets...");
    try {
      lastTickets.value = await http.get("/tickets/last");
      status.value = TotalStatus.Success;
    } catch (error) {
      errorData.value = "Error fetching last tickets";
      status.value = TotalStatus.Error;
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
