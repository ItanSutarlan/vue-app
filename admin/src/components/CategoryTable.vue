<script>
  import CategoryRow from './CategoryRow.vue';

  export default {
    components: {
      CategoryRow,
    },
    props: ['categories'],
    emits: ['changePage', 'changeCategoryId', 'clickDelete']
  }
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-compact w-full text-center">
      <thead>
        <tr>
          <th>#</th> 
          <th>Name</th> 
          <th></th>
        </tr>
      </thead> 
      <tbody>
        <CategoryRow 
          v-for="(category, index) in categories"
          :key="category.id" :category="category"
          :index.number="index"
          @change-page="(page) => $emit('changePage', page)"
          @change-category-id="(categoryId) => $emit('changeCategoryId', categoryId)"
          @click-delete="(categoryId) => $emit('clickDelete', categoryId)"
        />
      </tbody> 
    </table>
    <p class="text-center text-lg" v-if="!categories.length">There is no category yet</p>
  </div>

</template>