<script>
  import Sidebar from '../components/Sidebar.vue';
  import Card from '../components/Card.vue';
  
  export default {
    props: ['totalProducts', 'totalCategories'],
    emits: ['changePage', 'logout'],
    components: {
      Sidebar,
      Card,
    },
  }
</script>

<template>
  <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- home   -->
      <div class="text-xs lg:block mx-4">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex gap-5 flex-col sm:flex-row text-center">
          <Card class="md:w-72" cardTitle="Total Product" :cardBody="totalProducts" />
          <Card class="md:w-72" cardTitle="Total Category" :cardBody="totalCategories" />
        </div>
      </div> 
    </div>
    <Sidebar
      @changePage="(page) => $emit('changePage', page)"
      @logout="() => $emit('logout')"
    />
  </div> 
</template>