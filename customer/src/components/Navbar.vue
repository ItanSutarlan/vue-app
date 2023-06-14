<script>
  import { mapState } from 'pinia'
  import { useCustomerStore } from '../stores/customer'
  import FancyButton from './FancyButton.vue'

  export default {
    components: {
      FancyButton,
    },
    computed: {
      ...mapState(useCustomerStore, ['isLoggedin']),
    },
  }
</script>

<template>
  <div
    class="navbar fixed top-0 bg-neutral text-neutral-content"
  >
    <div class="navbar-start">
      <RouterLink to="/">
        <FancyButton
          class="btn normal-case text-xl"
        >
        Branded List
        </FancyButton>
      </RouterLink>
    </div>
    <div
      class="navbar-end"
    >
      <RouterLink v-if="isLoggedin" to="/wishlist">
        <FancyButton>
          Wishlist
        </FancyButton>
      </RouterLink>
    </div>
  </div>
</template>