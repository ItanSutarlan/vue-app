import { defineStore } from "pinia";
import axios from "axios";

export const useCategoryStore = defineStore("category", {
  state: () => ({ categories: [], baseUrl: import.meta.env.VITE_BASE_URL }),
  actions: {
    async fetchCategories() {
      try {
        const { data: response } = await axios.get(
          `${this.baseUrl}/categories`
        );
        this.categories = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
