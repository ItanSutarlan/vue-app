<script>
  import { mapActions, mapState } from 'pinia'
  import FancyButton from './FancyButton.vue';
  import { useCategoryStore } from '../stores/category'
  import { useProductStore } from '../stores/product'
  export default {
    data() {
      return {
        categoryInputs: []
      }
    },
    computed: {
      ...mapState(useCategoryStore, ['categories'])
    },
    methods: {
      ...mapActions(useCategoryStore, ['fetchCategories']),
      ...mapActions(useProductStore, ['fetchProductsFilterByCategory']),

      submitForm() {
        if (this.categoryInputs.length) {
          this.fetchProductsFilterByCategory(this.categoryInputs)          
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select atleast one category!',
          })
        }
      }
    },
    created() {
      this.fetchCategories()
    },
    components: {
      FancyButton,
    },
  }
</script>

<template>
    <div class="dropdown">
      <label tabindex="0" class="btn m-1">Category</label>
      <form tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box  h-56 w-52 overflow-y-scroll" @submit.prevent="submitForm">
        <div>
          <label v-for="category in categories" :key="category.id">
            <span class="label text-lg">{{ category.name }}</span> 
            <input type="checkbox"  class="checkbox  checkbox-sm" :value="category.id" v-model="categoryInputs"/>
          </label>
          <FancyButton class="block mt-5 w-full">Apply</FancyButton>
        </div>
      </form>
    </div>
</template>