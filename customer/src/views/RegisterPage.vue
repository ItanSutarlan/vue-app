<script>
  import { mapActions } from 'pinia'
  import { useCustomerStore } from '../stores/customer'


  import LabeledInput from '../components/LabeledInput.vue';
  import FancyButton from '../components/FancyButton.vue';

  export default {
    components: {
      LabeledInput,
      FancyButton,
    },
    // emits: ['changePage', 'handleSubmit'],
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      ...mapActions(useCustomerStore, ['handleRegister']),
      async submitForm() {
        try {
          const response = await this.handleRegister({ email: this.email, password: this.password })
          this.$swal.fire(`${response.message}`, "success");
          this.$router.push('/login')
          this.email = ''
          this.password = ''
        } catch ({ response: { data }}) {
          this.$swal.fire("Error!", `${data.message}`, "error");
        }
      }
    }
  }
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-4 my-8 md:w-1/2 md:mx-auto h-screen flex flex-col justify-center">
      <h1 class="font-bold text-3xl text-center">Register</h1>
      <form class="form-control" @submit.prevent="submitForm">
        <LabeledInput label="Email" input-type="email" v-model="email" />
        <LabeledInput label="Password" input-type="password" v-model="password" />
          <FancyButton class="my-5">Register</FancyButton>
          <span>Already have account? <RouterLink to="/login" class="underline hover:link-accent hover:cursor-pointer hover:#1FB2A5 hover:bg-black">Login</RouterLink></span>
      </form>
    </div>
  </div>
</template>