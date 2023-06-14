<script>
  import FancyButton from './FancyButton.vue'

  export default {
    components: {
      FancyButton,
    },
    props: ['product', 'index'],
    emits: ['handleSelect', 'changePage', 'changeProductId'],
    data() {
      return {
       selected: this.product.status,
       role: localStorage.getItem('role'),
       username: localStorage.getItem('username')
      }
    },
    methods: {
      submitSelection() {
        this.$emit('handleSelect', this.product.id, { status: this.selected })
      }
    },
    watch: {
      selected(newSelected, oldSelected) {
        this.submitSelection()
      }
    }
  }
</script>

<template>
  <tr>
    <th>{{index+1}}</th> 
    <td>{{product.name}}</td> 
    <td>
      <img class="w-32 h-32" :src="product.imgUrl" :alt="product.name">
    </td> 
    <td class="align-middle"><span class="w-48 truncate inline-block align-middle">{{product.description}}</span></td> 
    <td>{{product.stock}}</td> 
    <td>{{product.price}}</td> 
    <td>{{product.User.username}}</td>
    <td v-if="role==='Admin'">
      <select class="select select-ghost w-full max-w-xs" v-model="selected">
        <option  value="Active">Active</option>
        <option  value="Inactive">Inactive</option>
        <option  value="Archived">Archived</option>
      </select>
    </td>
    <td>
      <FancyButton
        v-if="role==='Admin' || (role==='Staff' && product.User.username===username)"
        @click="() => {
          $emit('changeProductId', product.id)
          $emit('changePage', 'editProduct')
        }"
      >
        Edit
      </FancyButton>
    </td>
  </tr>
</template>