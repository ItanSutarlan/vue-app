import { defineStore } from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    product: {},
    products: [],
    currentPage: 1,
    baseUrl: import.meta.env.VITE_BASE_URL,
    wishlist: [],
  }),
  actions: {
    async fetchProductById(productId) {
      try {
        const { data: response } = await axios.get(
          `${this.baseUrl}/products/${productId}`
        );
        this.product = response.data;
      } catch ({ response: { data } }) {
        console.error(data);
      }
    },
    async fetchProductsByPage(page) {
      try {
        this.currentPage = page;
        const { data: response } = await axios.get(
          `${this.baseUrl}/products?page[size]=8&page[number]=${this.currentPage}`
        );
        this.products = response.data;
      } catch ({ response: { data } }) {
        console.error(data);
      }
    },

    async fetchProductsFilterByCategory(categoryIds) {
      try {
        const { data: response } = await axios.get(
          `${this.baseUrl}/products?filter[category]=${categoryIds}`
        );
        this.products = response.data;
      } catch ({ response: { data } }) {
        console.error(data);
      }
    },

    async fetchWishlist() {
      try {
        const { data: response } = await axios.get(
          `${this.baseUrl}/mywishlist`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.wishlist = response.data;
      } catch ({ response: { data } }) {
        console.error(data);
      }
    },

    async addProductToWishlist(productId) {
      const { data: response } = await axios.post(
        `${this.baseUrl}/mywishlist`,
        { productId },
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      return response;
    },
    async deleteProductFromWishlist(productId) {
      const { data: response } = await axios.delete(
        `${this.baseUrl}/mywishlist/${productId}`,
        {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        }
      );
      await this.fetchWishlist();
      return response;
    },
  },
});
