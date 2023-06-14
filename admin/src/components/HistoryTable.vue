<script>
  import HistoryRow from './HistoryRow.vue';

  export default {
    components: {
      HistoryRow,
    },
    props: ['histories'],
  }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-compact w-full text-center">
      <thead>
        <tr>
          <th>#</th> 
          <th>Product Name</th> 
          <th>Description</th> 
          <th>Created At</th> 
          <th>Updated By</th> 
        </tr>
      </thead> 
      <tbody>
        <HistoryRow 
          v-for="(history, index) in histories"
          :key="history.id"
          :history="history"
          :index.number="index"
        />
      </tbody> 
    </table>
    <p class="text-center text-lg" v-if="!histories.length">There is no log history yet</p>
  </div>

</template>