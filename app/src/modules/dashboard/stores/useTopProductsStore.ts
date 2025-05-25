import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { TotalStatus } from "@/shared/enums";

export const useTopProductsStore = defineStore("topProducts", () => {
  const topProductsData = ref([]);
  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<TotalStatus>(TotalStatus.Pending);

  const topProducts = computed(() => topProductsData.value);

  async function fetchTopProducts() {
    loading.value = true;
    errorData.value = null;
    status.value = TotalStatus.Pending;

    try {
      console.log("Fetching top products...");
      // const url = `/tickets/totals/${min}/${max}`;
      const url = `/products/top`;
      const { data } = await http.get(url);
      topProductsData.value = data.data;
      status.value = TotalStatus.Success;
    } catch (err) {
      status.value = TotalStatus.Error;
      errorData.value = String(err);
    } finally {
      loading.value = false;
    }
  }

  return {
    topProductsData,
    errorData,
    loading,
    status,
    topProducts,
    fetchTopProducts,
  };
});
