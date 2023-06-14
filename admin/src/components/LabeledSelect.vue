<script>
  export default {
    props: ['categories', 'label', 'modelValue'],
    emits: ['update:modelValue'],
    computed: {
      selected: {
        get() {
          return this.modelValue
        },
        
        set(value) {
          this.$emit('update:modelValue', value)
        }
      }
    }
  }
</script>

<template>
  <label class="label" :for="label">{{label}}</label>
  <select :id="label" class="select select-accent w-full max-w-xs" v-model="selected">
    <option disabled :value="null">Choose category</option>
    <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
  </select>
</template>