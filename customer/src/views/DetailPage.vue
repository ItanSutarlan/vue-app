<script>
  import { mapState, mapActions } from 'pinia'
  import { useCustomerStore } from '../stores/customer'
  import { useProductStore } from '../stores/product'

  import FancyButton from '../components/FancyButton.vue'

  export default {
    data() {
      return { loading: true }
    },
    components: {
      FancyButton,
    },
    computed: {
      ...mapState(useCustomerStore, ['isLoggedin']),
      ...mapState(useProductStore, ['product']),
    },
    methods: {
      ...mapActions(useProductStore, ['fetchProductById', 'addProductToWishlist']),
      async handleAddProductToWishlist() {
        try {
          const response = await this.addProductToWishlist(this.product.id);
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
        } catch ({ response: { data }}) {
          this.$swal.fire("Error!", "You have added this product to your wishlist before", "error");
        }
      }
    },
    async created() {
      await this.fetchProductById(this.$route.params.productId)
      this.loading = false 
    }
  }
</script>

<template>
  <p class="text-center text-lg font-bold" v-if="loading">Loading the page</p>
  <div class="text-xs lg:block mx-4 pt-8 pb-16" v-if="!loading">
    <div class="flex gap-16 flex-col sm:flex-row justify-center text-center">
      <div>
        <img class="w-96 h-96" :src="product.imgUrl" alt="">
      </div>
      <div class="flex gap-5 flex-col justify-center items-center text-center md:w-64 mb-8">
        <h1 class="text-4xl font-bold">{{ product.name }}</h1>
        <p class="text-lg">{{ product.description }}</p>
        <p class="text-lg">{{ product.price }}</p>
        <FancyButton v-if="isLoggedin" @click="handleAddProductToWishlist">Add To Wishlist</FancyButton>
        <svg class="w-52" v-html="product.barcode"></svg>
      </div>
    </div>
  </div> 
</template>