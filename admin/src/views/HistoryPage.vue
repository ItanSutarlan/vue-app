<script>
  import Sidebar from '../components/Sidebar.vue';
  import HistoryTable from '../components/HistoryTable.vue';

  export default {
    components: {
      Sidebar,
      HistoryTable,
    },
    props: ['histories'],
  }
</script>

<template>
  <div class="drawer drawer-mobile pt-16">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content pt-8">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn drawer-button lg:hidden mb-4 ms-4">open menu</label>
  
      <!-- history page -->
      <div class="text-xs text-center lg:block px-5">
        <div class="flex justify-between mb-6">
          <h1 class="text-2xl font-bold">Logs</h1>
        </div>
        <HistoryTable
          :histories="histories" 
        />
      </div>
    </div> 
    <Sidebar
      @changePage="(page) => $emit('changePage', page)"
      @logout="() => $emit('logout')"
    />
  </div>
</template>