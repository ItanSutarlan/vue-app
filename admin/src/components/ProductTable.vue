<script>
  import ProductRow from './ProductRow.vue';

  export default {
    components: {
      ProductRow,
    },
    data() {
      return {
        role: localStorage.getItem('role')
      }
    },
    props: ['products'],
    emits: ['handleSelect', 'changePage', 'changeProductId']
  }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th>#</th> 
          <th>Name</th> 
          <th>Image</th> 
          <th>Description</th> 
          <th>Stock</th> 
          <th>Price</th> 
          <th>Author</th>
          <th v-if="role==='Admin'">Status</th>
          <th></th>
        </tr>
      </thead> 
      <tbody>
        <ProductRow 
          v-for="(product, index) in products"
          :key="product.id" :product="product"
          :index.number="index"
          @handle-select="(id, obj) => $emit('handleSelect', id, obj)"
          @change-page="(page) => $emit('changePage', page)"
          @change-product-id="(productId) => $emit('changeProductId', productId)"
        />
      </tbody> 
    </table>
    <p class="text-center text-lg" v-if="!products.length">There is no product yet</p>
  </div>

</template>