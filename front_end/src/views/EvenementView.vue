<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Evenement</h1>
    </div>
    <div v-for="(elem,index) in evenements" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined>
          <h3 style="text-align: center;">{{elem.libelleEvenement}}</h3>
          <hr>
          <span>Type d'événement : <strong>{{elem.type_evenement.libelleTypeEvenement}}</strong></span>
          <br>
          <span>Numéro du stand : <strong>{{elem.idStand}}</strong></span>
          <br>
          <span>Type de stand : <strong>{{listeTypeStand[(elem.stand.idTypeStand)-1].libelleTypeStand}}</strong></span>
          <br>
          <span>Nom du stand : <strong>{{elem.stand.nomStand}}</strong></span>
          <br>
          <span>Description stand : <strong>{{elem.stand.descriptionStand}}</strong></span>
          <br>
          <br>
          <v-btn @click="goToStand(elem.idStand)">Voir Stand</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
export default {
  name: "EvenementView",
  data: () => {
    return {
      evenement: []
    }
  },
  computed: {
    ...mapState(["evenements"]),
    ...mapState(["listeTypeStand"]),
  },
  methods: {
    goToStand(num){
      this.$router.push({name: 'stand', params: {id: num}})
    }
  }
}

</script>

<style scoped>

</style>