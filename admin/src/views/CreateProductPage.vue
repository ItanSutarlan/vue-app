<script>
  import Sidebar from '../components/Sidebar.vue';
  import ProductForm from '../components/ProductForm.vue';

  export default {
    components: {
      Sidebar,
      ProductForm
    },
    props: ['baseUrl', 'categories'],
    emits: ['handleSubmit'],
  }
</script>


<template>
  <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- create product page -->
      <div class="container mx-auto">
        <ProductForm
          :baseUrl="baseUrl"
          :categories="categories"
          @handle-submit="(obj) => $emit('handleSubmit', obj)" 
        />
      </div> 
    </div> 
    <Sidebar
      @changePage="(page) => $emit('changePage', page)"
      @logout="() => $emit('logout')"
    />
  </div>
</template>