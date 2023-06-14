<script>
  import { mapState, mapActions } from 'pinia'
  import { useCustomerStore } from '../stores/customer'

  export default{
    computed: {
      ...mapState(useCustomerStore, ['isLoggedin', 'email']),
    },
    methods: {
      ...mapActions(useCustomerStore, ['handleLogout']),
      logoutHandler() {
        this.$swal.fire({
          title: "Are you sure?",
          text: "You need to relogin!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, confirm!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.handleLogout()
            this.$swal.fire("Logout!", "Your already logout.", "success");
            this.$router.push('/')
          }
        });
      }
    }
  }
</script>

<template>
  <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- home   -->
      <RouterView />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-52 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li> 
        <li>
          <RouterLink v-if="isLoggedin" to="/wishlist">Wishlist</RouterLink>
        </li>
        <div class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
        <h3>Account</h3>
        <li>
          <span>
            Hei, {{ email ? email.split('@')[0] : 'name' }}
          </span>
        </li>
        <li>
          <RouterLink v-if="!isLoggedin" to="/login">Login</RouterLink>
          <a v-if="isLoggedin" @click="logoutHandler">Logout</a>
        </li>
      </ul>
    </div>
  </div> 
</template>