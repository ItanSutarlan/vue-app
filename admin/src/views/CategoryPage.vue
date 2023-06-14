<script>
  import Sidebar from '../components/Sidebar.vue';
  import CategoryTable from '../components/CategoryTable.vue';
  import FancyButton from '../components/FancyButton.vue';

  export default {
    components: {
      Sidebar,
      CategoryTable,
      FancyButton,
    },
    props: ['categories'],
    emits: ['changePage', 'changeCategoryId', 'clickDelete'],
  }
</script>

<template>
    <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- category page -->
      <div class="text-xs text-center lg:block px-5">
        <div class="flex justify-between mb-6">
          <h1 class="text-2xl font-bold">Categories</h1>
          <FancyButton @click="$emit('changePage', 'createCategory')">New Categories</FancyButton>
        </div>
        <CategoryTable
          :categories="categories" 
          @change-page="(page) => $emit('changePage', page)" 
          @change-category-id="(categoryId) => $emit('changeCategoryId', categoryId)"
          @click-delete="(categoryId) => $emit('clickDelete', categoryId)"
        />    
      </div>
    </div> 
    <Sidebar
      @changePage="(page) => $emit('changePage', page)"
      @logout="() => $emit('logout')"
    />
  </div>
</template>