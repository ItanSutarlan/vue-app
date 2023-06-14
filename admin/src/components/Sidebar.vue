<script>
  export default {
    emits: ['changePage', 'logout'],
    data() {
      return {
        username: 'username',
      }
    },
    created() {
      this.username = localStorage.getItem('username')
    }
  }
</script>

<template>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-52 bg-base-100 text-base-content">
        <!-- Sidebar content here -->
        <li>
          <a @click.prevent="$emit('changePage', 'home')">Dashboard</a>
        </li> 
        <li>
          <a @click.prevent="$emit('changePage', 'products')">Products</a>
        </li>
        <li>
          <a @click.prevent="$emit('changePage', 'categories')">Categories</a>
        </li>
        <li>
          <a @click.prevent="$emit('changePage', 'histories')">Logs</a>
        </li>
        <div class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></div>
        <h3>Account</h3>
        <li>
          <button class="btn-disabled">
            {{ `Hei, ${username}` }}
          </button>
        </li>
        <li>
          <a @click.prevent="$emit('logout')">Logout</a>
        </li>
      </ul>
    </div>
</template>