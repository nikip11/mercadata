import { http } from "@/plugins/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { httpStatus } from "@/shared/enum/http";

export const useTopProductsStore = defineStore("topProducts", () => {
  const topProductsData = ref([]);
  const errorData = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<httpStatus>(httpStatus.PENDING);

  const topProducts = computed(() => topProductsData.value);

  async function fetchTopProducts() {
    loading.value = true;
    errorData.value = null;
    status.value = httpStatus.PENDING;

    try {
      console.log("Fetching top products...");
      // const url = `/tickets/totals/${min}/${max}`;
      const url = `/products/top`;
      const { data } = await http.get(url);
      topProductsData.value = data.data;
      status.value = httpStatus.SUCCESS;
    } catch (err) {
      status.value = httpStatus.ERROR;
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
