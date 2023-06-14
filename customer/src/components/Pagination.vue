<script>
  import { mapState, mapActions } from 'pinia';
  import { useProductStore } from '../stores/product'
  export default{
    computed: {
      ...mapState(useProductStore, ['currentPage', 'products'])
    },
    methods: {
      ...mapActions(useProductStore, ['fetchProductsByPage'])
    }
  }
</script>

<template>
  <div class="btn-group">
    <button class="btn" v-if="currentPage !== 1" @click="fetchProductsByPage(currentPage - 1)">«</button>
    <button class="btn">Page {{ currentPage }}</button>
    <button class="btn" v-if="products.length === 8" @click="fetchProductsByPage(currentPage + 1)">»</button>
  </div>
</template>