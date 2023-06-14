<script>
  import { mapActions } from 'pinia'
  import { useProductStore } from '../stores/product'

  export default{
    props: ['wish'],
    methods: {
      ...mapActions(useProductStore, ['deleteProductFromWishlist']),
      async handleDeleteProduct() {
        try {
          const response = await this.deleteProductFromWishlist(this.wish.productId);
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
        } catch ({ response: { data }}) {
          this.$swal.fire("Error!", `${data.message}`, "error");
        }
      }
    }
  }
</script>

<template>
  <div class="card card-side bg-base-100 shadow-xl w-full flex flex-col md:flex-row">
    <figure class="hover:cursor-pointer" @click="this.$router.push(`/${wish.productId}`)">
      <img class="w-52 h-52" :src="wish.Product.imgUrl" :alt="wish.Product.name"/>
    </figure>
    <div class="card-body">
      <div class="hover:cursor-pointer" @click="this.$router.push(`/${wish.productId}`)">
        <h2 class="card-title text-2xl">{{ wish.Product.name }}</h2>
        <p class="text-lg">{{ wish.Product.description }}</p>
        <p class="text-lg">{{ wish.Product.price }}</p>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-warning" @click="handleDeleteProduct">Delete</button>
      </div>
    </div>
  </div>
</template>