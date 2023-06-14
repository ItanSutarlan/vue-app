<script>
  import Card from '../components/Card.vue'
  import Pagination from '../components/Pagination.vue'
  import FilterCategory from  '../components/FilterCategory.vue'
  import { mapState, mapActions } from 'pinia'
  import { useProductStore } from '../stores/product'

  export default {
    components: {
      Card,
      Pagination,
      FilterCategory
    },
    data() {
      return {
        loading: true,
      }
    },
    computed: {
      ...mapState(useProductStore, ['products']),
    },
    methods: {
      ...mapActions(useProductStore, ['fetchProductsByPage'])
    },
    async created() {
      await this.fetchProductsByPage(1)
      this.loading = false
    }
  }
</script>

<template>
  <p class="text-center text-lg font-bold" v-if="loading">Loading the page</p>
  <div v-if="!loading" class="text-xs lg:block pb-8">
    <h1 class="text-4xl font-bold text-center mb-8">Home</h1>
    <div class="flex justify-between">
      <FilterCategory />
      <Pagination />
    </div>
    <div class="text-center flex flex-col items-center justify-center">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5 pt-8 mb-16 mx-auto">
        <Card 
          v-for="product in products" 
          :key="product.id" 
          :product="product"
        />
        <p class="text-xl font-bold mt-8" v-if="products.length === 0">Product not available</p>
      </div>
    </div>
  </div>
</template>
