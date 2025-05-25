import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { httpStatus } from "@/shared/enum/http";

export const useTotalStore = defineStore("total", () => {
  const totalData = ref([]);

  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<httpStatus>(httpStatus.PENDING);

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
    status.value = httpStatus.PENDING;

    try {
      console.log("Fetching total...", { min, max });
      // const url = `/tickets/totals/${min}/${max}`;
      const url = `/tickets/totals/2025`;
      const { data } = await http.get(url);
      totalData.value = data.data;
      status.value = httpStatus.SUCCESS;
    } catch (err) {
      status.value = httpStatus.ERROR;
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
