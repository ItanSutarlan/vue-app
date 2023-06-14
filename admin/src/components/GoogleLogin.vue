<script>
  import FancyButton from './FancyButton.vue';
  export default {
    components: {
      FancyButton,
    },
    setup(props, { emit, expose }) {
      const callback = (response) => {
        emit('googleLogin', { token: response.access_token })
      }
      // make the instance "closed" -
      // i.e. do not expose anything to the parent
      expose()
      return {
        callback
      }
    },
  }
</script>

<template>
  <GoogleLogin :callback="callback" popup-type="TOKEN">
    <FancyButton class="w-full">
      Login Using Google
    </FancyButton>
  </GoogleLogin>
</template>
