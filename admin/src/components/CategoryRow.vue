<script>
  import FancyButton from './FancyButton.vue'

  export default {
    components: {
      FancyButton,
    },
    props: ['category', 'index'],
    emits: ['changePage', 'changeCategoryId', 'clickDelete'],
  }
</script>

<template>
  <tr>
    <th>{{index+1}}</th> 
    <td>{{category.name}}</td> 
    <td class="flex justify-end">
      <FancyButton
        class="mx-4"
        @click="() => {
          $emit('changeCategoryId', category.id)
          $emit('changePage', 'editCategory')
        }"
      >
        Edit
      </FancyButton>
      <FancyButton
        class="mx-4"
        @click="() => {
          $emit('clickDelete', category.id)
          $emit('changePage', 'categories')
        }"
      >
        Delete
      </FancyButton>
    </td>
  </tr>
</template>