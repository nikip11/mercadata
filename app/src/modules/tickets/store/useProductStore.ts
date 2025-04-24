import { defineStore } from "pinia";
import { ref } from "vue";
import { SearchProduct } from "../types/Ticket";
import { http } from "@/plugins/http";

enum ProductStatus {
  Pending = "pending",
  Success = "success",
  Error = "error",
}

export const useProductStore = defineStore("productStore", () => {
  const products = ref<SearchProduct[] | null>(null);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const status = ref<ProductStatus>(ProductStatus.Pending);

  const fetchProducts = async (productName: string) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await http.get(`/product/${productName}`);
      products.value = data.data;
      status.value = ProductStatus.Success;
    } catch (err) {
      status.value = ProductStatus.Error;
      error.value = String(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    fetchProducts,
    products,
    loading,
    error,
    status,
  };
});
