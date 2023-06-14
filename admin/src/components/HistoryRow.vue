<script>
  export default {
    props: ['history', 'index'],
  }
</script>

<template>
  <tr>
    <th>{{index+1}}</th> 
    <td>{{history.name}}</td> 
    <td>{{history.description}}</td> 
    <td>{{history.createdAt}}</td> 
    <td>{{history.updatedBy}}</td> 
  </tr>
</template>