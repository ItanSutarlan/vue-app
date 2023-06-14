<script>
  import LabeledInput from './LabeledInput.vue';
  import FancyButton from './FancyButton.vue'

  export default {
    components: {
      LabeledInput,
      FancyButton,
    },
    props: {
      id: {
        type: Number,
        default: null,
      },
      baseUrl: String,
      categories: Array,
    },
    emits: ['handleSubmit'],
    data() {
      return {
        name: '',
      }
    },
    created() {
      if (this.id) {
        const category = this.categories.find(category => category.id === this.id)
        this.name = category.name
      }
    },
    methods: {
      submitForm() {
        if (this.id) {
          this.$emit('handleSubmit', this.id, {
            name: this.name,
          });
        } else {
          this.$emit('handleSubmit', {
            name: this.name,
          });
        }

        this.name = ''
      },
    },
  }
</script>

<template>
  <div class="mx-4 md:w-1/2 md:mx-auto py-10">
    <h1 class="font-bold text-3xl text-center">{{ id ? 'Update Category' : 'Create Category' }}</h1>
    <form class="form-control" @submit.prevent="submitForm">
      <LabeledInput label="Name" input-type="text" v-model="name" />
        <FancyButton class="my-5">{{ id ? 'Update' : 'Create' }}</FancyButton>
    </form>
  </div>
</template>