<script>
  import { mapActions } from 'pinia'
  import { useCustomerStore } from '../stores/customer'

  export default {
    methods: {
      ...mapActions(useCustomerStore, ['handleGoogleLogin']),
      async callback(obj) {
        try {
          const response = await this.handleGoogleLogin(obj)
          this.$swal.fire(`${response.message}`, "success");
          this.$router.push('/')
        } catch ({ response: {data }}) {
          this.$swal.fire("Error!", `${data.message}`, "error");
        }
      }
    }
  }
</script>

<template>
  <GoogleLogin :callback="callback" />
</template>
