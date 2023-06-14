<script>
  export default {
    props: {
      cardTitle: {
        type: String,
        required: true,
      },
      cardBody: {
        type: Number,
        required: true,
      }
    },
  }
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title mx-auto">{{ cardTitle }}</h2>
      <p class="text-xl">{{ cardBody }}</p>
    </div>
  </div>
</template>