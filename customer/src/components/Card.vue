<script>
  import { mapState, mapActions } from 'pinia'
  import { useCustomerStore } from '../stores/customer'
  import { useProductStore } from '../stores/product'

  export default{
    props: ['product'],
    computed: {
      ...mapState(useCustomerStore, ['isLoggedin']),
    },
    methods: {
      ...mapActions(useProductStore, ['addProductToWishlist']),
      async handleAddProductToWishlist() {
        try {
          const response = await this.addProductToWishlist(this.product.id);
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
        } catch ({ response: { data }}) {
          this.$swal.fire("Error!", "You have added this product to your wishlist before", "error");
        }
      }
    }
  }
</script>

<template>
  <div class="card card-compact w-52 bg-base-100 shadow-xl">
    <figure class="hover:cursor-pointer" @click="this.$router.push(`/${product.id}`)">
      <img class="h-48" :src="product.imgUrl" :alt="product.name" />
    </figure>
    <div class="card-body text-center flex flex-col justify-between">
      <div class="hover:cursor-pointer" @click="$router.push(`/${product.id}`)">
        <h2 class="card-title">{{ product.name }}</h2>
        <p class="truncate">{{ product.description }}</p>
        <p class="text-xl">{{ product.price }}</p>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary" v-if="isLoggedin" @click="handleAddProductToWishlist">Add to wishlist</button>
      </div>
    </div>
  </div>
</template>