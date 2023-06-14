<script>
  import LabeledInput from '../components/LabeledInput.vue';
  import FancyButton from '../components/FancyButton.vue';

  export default {
    components: {
      LabeledInput,
      FancyButton,
    },
    emits: ['changePage', 'handleSubmit'],
    data() {
      return {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
      }
    },
    methods: {
      submitForm() {
        this.$emit('handleSubmit', {
          username: this.username,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
          address: this.address,
        });

        this.username = ''
        this.email = ''
        this.password = ''
        this.phoneNumber = ''
        this.address = ''
      }
    }
  }
</script>

<template>
  <div class="container mx-auto">
    <div class="mx-4 my-8 md:w-1/2 md:mx-auto h-screen flex flex-col justify-center">
      <h1 class="font-bold text-3xl text-center">Register</h1>
      <form class="form-control" @submit.prevent="submitForm">
        <LabeledInput label="Username" input-type="text" v-model="username" />
        <LabeledInput label="Email" input-type="email" v-model="email" />
        <LabeledInput label="Password" input-type="password" v-model="password" />
        <LabeledInput label="Phone Number" input-type="number" v-model="phoneNumber" />
        <LabeledInput label="Address" input-type="text" v-model="address" />
          <FancyButton class="my-5">Register</FancyButton>
          <span>Already have account? <a class="underline hover:link-accent hover:cursor-pointer hover:#1FB2A5 hover:bg-black" @click="$emit('changePage', 'login')">Login</a></span>
      </form>
    </div>
  </div>
</template>