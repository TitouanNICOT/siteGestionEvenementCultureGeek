<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Stand</h1>
    </div>
    <div v-for="(elem,index) in stands" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined @click="goToStand(elem.id)">
          <h3 style="text-align: center;">{{elem.nomStand}}</h3>
          <hr>
          <span>Numéro du stand : <strong>{{elem.id}}</strong></span>
          <br>
          <span>Type de stand : <strong>{{elem.libelleTypeStand}}</strong></span>
          <br>
          <span>Nom Prestataire : <strong>{{elem.prestataire}}</strong></span>
          <br>
          <span>Pseudo Prestataire : <strong>{{elem.user.pseudo}}</strong></span>
          <br>
          <span>Role Prestataire : <strong>{{elem.user.idRole}}</strong></span>
          <br>
          <span>Description : <strong>{{elem.descriptionStand}}</strong></span>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
export default {
  name: "StandView",
  computed:{
    ...mapState(["stands"]),
  },
  methods: {
      goToStand(num){
        this.$router.push({name: 'stand', params: {id: num}})
      }
  },
}
</script>

<style scoped>

</style>