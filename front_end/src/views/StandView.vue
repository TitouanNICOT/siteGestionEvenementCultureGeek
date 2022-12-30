<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Stand</h1>
    </div>
    <div v-for="(elem,index) in stands" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined>
          <h3 style="text-align: center;">{{elem.nomStand}}</h3>
          <hr>
          <span>Description : <strong>{{elem.description}}</strong></span>
          <br>
          <span>Numéro du stand : <strong>{{elem.numStand}}</strong></span>
          <br>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvenementView",
  data:()=>({
    stands:[{description: "Tournois Minecraft", nomStand: "oui", numStand: 256},
        {description: "Norman nous explique tout", nomStand: "non", numStand: 103}]
  }),
}
</script>

<style scoped>

</style>