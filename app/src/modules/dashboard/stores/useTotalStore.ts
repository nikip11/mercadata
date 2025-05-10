import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

enum TotalStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
}

export const useTotalStore = defineStore("total", () => {
  const totalData = ref([]);

  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<TotalStatus>(TotalStatus.Pending);

  const getTotal = computed(() => {
    const keys = totalData.value.map(({ month }) => getMonthName(month));
    const values = totalData.value.map(({ total }) => total);

    return {
      keys,
      values,
    };
  });

  async function fetchTotal(min: string, max: string) {
    loading.value = true;
    errorData.value = null;
    status.value = TotalStatus.Pending;

    try {
      console.log("Fetching total...", { min, max });
      // const url = `/tickets/totals/${min}/${max}`;
      const url = `/tickets/totals/2025`;
      const { data } = await http.get(url);
      totalData.value = data.data;
      status.value = TotalStatus.Success;
    } catch (err) {
      status.value = TotalStatus.Error;
      errorData.value = String(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    totalData,
    errorData,
    loading,
    status,
    getTotal,
    fetchTotal,
  };
});

// convert "2025-01" to "January 2025"
function getMonthName(month: string) {
  const date = new Date(month);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
