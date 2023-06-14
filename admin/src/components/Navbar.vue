<script>
  import FancyButton from './FancyButton.vue'
  export default {
    components: {
      FancyButton,
    },
    data() {
      return {
        theme: 'light'
      }
    },
    emits: ['changePage'],
    created() {
      if (localStorage.getItem('theme')) {
        this.theme = localStorage.getItem('theme')
      }
    },
    computed: {
      navbarClasses() {
        if (this.theme === 'dark') {
          return ['bg-neutral', 'text-neutral-content']
        }
        return []
      }
    },
    methods: {
      changeTheme() {
        let theme = 'light'
        if (this.theme === 'light') {
          theme = 'dark'
        }
        this.theme = theme

        this.setThemeSetting()
      },
      setThemeSetting() {
        localStorage.setItem('theme', this.theme)
      },
      getThemeSetting() {
        localStorage.getItem('theme')
      }
    }
  }
</script>

<template>
  <div
    class="navbar bg-base-100 fixed top-0"
    :class="navbarClasses"
  >
    <div class="navbar-start">
      <FancyButton
        class="btn normal-case text-xl"
        @click="$emit('changePage', 'home')"
      >
      Branded List
      </FancyButton>
    </div>
    <div
      class="navbar-end"
    >
      <FancyButton @click="changeTheme">
        Toggle
      </FancyButton>
    </div>
  </div>
</template>