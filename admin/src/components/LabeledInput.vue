<script>
  export default {
    props: ['label', 'inputType', 'modelValue'],
    emits: ['update:modelValue'],
    computed: {
      value: {
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
  <div>
    <label class="label" :for="label">{{label}}</label>
    <input :id="label" :type="inputType"  class="input input-sm input-bordered input-accent w-full" v-model="value" required/>
  </div>
</template>