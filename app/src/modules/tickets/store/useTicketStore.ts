import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { http } from "@/plugins/http";
import { Ticket } from "../types/Ticket";

enum TicketStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
}

interface PropFetchTickers {
  min?: string;
  max?: string;
}

export const useTicketStore = defineStore("ticketStore", () => {
  const tickets = ref<Ticket[] | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<TicketStatus>(TicketStatus.Pending);

  const fetchTickets = async (props: PropFetchTickers = {}) => {
    loading.value = true;
    error.value = null;
    const query =
      props?.min && props?.max ? `?min=${props.min}&max=${props.max}` : "";
    try {
      const { data } = await http.get(`/tickets/${query}`);
      tickets.value = data.data;
      status.value = TicketStatus.Success;
    } catch (err) {
      status.value = TicketStatus.Error;
      error.value = String(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    tickets: computed(() => tickets.value),
    error: computed(() => error.value),
    loading: computed(() => loading.value),
    status: computed(() => status.value),
    fetchTickets,
  };
});
