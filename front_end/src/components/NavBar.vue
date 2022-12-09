<template>
  <div>
    <span v-for="(title, index) in titles" :key="index">
      <button @click="$emit('menu-clicked', index)"> {{ title.text }} </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array },
  emits: ['menu-clicked']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  padding: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
/* mettre le NavBar sur le coté gauche */

</style>