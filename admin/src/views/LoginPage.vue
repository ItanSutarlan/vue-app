<script>
  import LabeledInput from '../components/LabeledInput.vue';
  import FancyButton from '../components/FancyButton.vue';
  import GoogleLogin from '../components/GoogleLogin.vue'

  export default {
    components: {
      LabeledInput,
      FancyButton,
      GoogleLogin,
    },
    emits: ['changePage', 'handleSubmit', 'googleLogin'],
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      submitForm() {
        this.$emit('handleSubmit', {
          email: this.email,
          password: this.password,
        })

        this.email = ''
        this.password = ''
      }
    }
  }
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-4 md:w-1/2 md:mx-auto h-screen flex flex-col justify-center">
      <h1 class="font-bold text-3xl text-center mb-8">Login</h1>
      <form class="form-control" @submit.prevent="submitForm">
        <LabeledInput label="Email" input-type="email" v-model="email" />
        <LabeledInput label="Password" input-type="password" v-model="password" />
          <FancyButton class="my-5">Login</FancyButton>
          <div class="md:flex flex-row-reverse justify-between">
            <GoogleLogin class="w-full md:w-48" @google-login="(response) => $emit('googleLogin', response)"/>
              <p class="mb-5">
                Don't have an account? 
                <a class="underline hover:link-accent hover:cursor-pointer hover:#1FB2A5 hover:bg-black" @click="$emit('changePage', 'register')">Register</a>
              </p>
          </div>
      </form>
    </div>
  </div>
</template>