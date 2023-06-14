<script>
  import { mapState, mapActions } from 'pinia'
  import { useProductStore } from '../stores/product'

  import WishlistCard from '../components/WishlistCard.vue'
  export default {
    components: {
      WishlistCard,
    },
    computed: {
      ...mapState(useProductStore, ['wishlist']),
    },
    methods: {
      ...mapActions(useProductStore, ['fetchWishlist'])
    },
    created() {
      this.fetchWishlist()
    }
  }
</script>

<template>
  <div class="text-xs lg:block pb-16">
    <h1 class="text-4xl font-bold text-center">Wishlist</h1>
    <div class="px-8 py-8 flex justify-center flex-wrap gap-5">
      <WishlistCard v-for="wish in wishlist" :key="wish.id" :wish="wish" />
      <p v-if="wishlist.length < 1" class="text-center text-xl font-bold">Wishlist is not available yet!</p>
    </div>
  </div> 
</template>
