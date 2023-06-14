<script>
  import Sidebar from '../components/Sidebar.vue';
  import CategoryForm from '../components/CategoryForm.vue';

  export default {
    components: {
      Sidebar,
      CategoryForm
    },
    props: ['baseUrl'],
    emits: ['handleSubmit'],
  }
</script>

<template>
    <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- create category page -->
      <div class="container mx-auto">
        <CategoryForm
          :baseUrl="baseUrl"
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