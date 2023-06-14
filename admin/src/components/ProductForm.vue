<script>
  import axios from 'axios';

  import reverseFormatter from '../utils/reverseFormatter.js'

  import LabeledInput from './LabeledInput.vue';
  import LabeledSelect from './LabeledSelect.vue';
  import FancyButton from './FancyButton.vue'

  export default {
    components: {
      LabeledInput,
      LabeledSelect,
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
        description: '',
        price: null,
        stock: null,
        imgUrl: '',
        categoryId: null,
      }
    },
    created() {
      if (this.id) {
        axios.get(`${this.baseUrl}/products/${this.id}`, {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
        .then(({ data: response }) => {
          const product = response.data
          this.name = product.name
          this.description = product.description
          this.price = this.moneyFormatter(product.price)
          this.stock = product.stock
          this.imgUrl = product.imgUrl
          this.categoryId = product.categoryId
        })
        .catch(({ response: { data }}) => {
          Swal.fire("Error!", `${data.message}`, "error");
        });      
      }
    },
    methods: {
      submitForm() {
        if (this.id) {
          this.$emit('handleSubmit', this.id, {
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
            imgUrl: this.imgUrl,
            categoryId: this.categoryId,
          });
        } else {
          this.$emit('handleSubmit', {
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
            imgUrl: this.imgUrl,
            categoryId: this.categoryId,
          });
        }

        this.name = ''
        this.description = ''
        this.price = null
        this.stock = null
        this.imgUrl = ''
        this.categoryId = null
      },
      moneyFormatter(money) {
        return reverseFormatter('de-DE', 'EUR', money)
      }
    },
  }
</script>

<template>
  <div class="mx-4 md:w-1/2 md:mx-auto py-16 md:py-8">
    <h1 class="font-bold text-3xl text-center">{{ id ? 'Update Product' : 'Create Product' }}</h1>
    <form class="form-control" @submit.prevent="submitForm">
      <LabeledInput label="Name" input-type="text" v-model="name" />
      <LabeledSelect label="Category" :categories="categories" v-model="categoryId" />
      <LabeledInput label="Description" input-type="text" v-model="description" />
      <LabeledInput label="Price" input-type="number" v-model="price" />
      <LabeledInput label="Stock" input-type="number" v-model="stock" />
      <LabeledInput label="Image" input-type="text" v-model="imgUrl" />
        <FancyButton class="my-8">{{ id ? 'Update' : 'Create' }}</FancyButton>
    </form>
  </div>
</template>