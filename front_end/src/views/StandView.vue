<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Stand</h1>
    </div>
    <div>
      <v-col class="d-flex" cols="12" sm="11">
        <v-text-field style="margin-right: 10px" label="Nom du Stand" outlined v-model="inputFilter" />
        <v-select style="margin-right: 10px" label="Type du Stand" :items="listTypeStand" outlined  v-model="typeStand"></v-select>
        <v-btn style="margin-top: 10px; margin-right: 30px" cols="4" sm="4" color="red" @click="typeStand = '' ">X</v-btn>
        <v-select style="margin-right: 10px" label="Type du Stand" :items="listPresta" outlined  v-model="presta"></v-select>
        <v-btn style="margin-top: 10px" cols="4" sm="4" color="red" @click="presta = '' ">X</v-btn>
      </v-col>
    </div>
    <v-row class="mx-5">
      <v-col v-for="(elem,index) in standsfiltre" :key="index" cols="3">
        <v-card class="pa-3" style="height: 100%" outlined @click="goToStand(elem.id)">
          <h3 style="text-align: center;">{{elem.nomStand}}</h3>
          <hr>
          <span>Numéro du stand : <strong>{{elem.id}}</strong></span>
          <br>
          <span>Type de stand : <strong>{{elem.libelleTypeStand()}}</strong></span>
          <br>
          <span>Nom Prestataire : <strong>{{elem.libellePresta()}}</strong></span>
          <br>
          <span>Pseudo Prestataire : <strong>{{elem.user.pseudo}}</strong></span>
          <br>
          <span>Role Prestataire : <strong>{{elem.user.idRole}}</strong></span>
          <br>
          <span>Description : <strong>{{elem.descriptionStand}}</strong></span>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapState} from "vuex";


export default {
  name: "StandView",
  data: () => {
    return {
      inputFilter: "",
      typeStand: '',
      presta: ''
    }
  },
  computed:{
    ...mapState(["stands"]),
    standsfiltre(){
      return this.stands.filter(elem => this.verifFiltre(elem))
    },
    listTypeStand(){
      return this.stands.map(elem => elem.libelleTypeStand())
    },
    listPresta(){
      return this.stands.map(elem => elem.libellePresta())
    }
  },
  methods: {
      goToStand(num){
        this.$router.push({name: 'stand', params: {id: num}})
      },
    verifFiltre(elem){
      if(this.inputFilter === "" && this.typeStand === '' && this.presta === ''){
        return true
      }
      else{
        let libelle = elem.nomStand.toLowerCase().includes(this.inputFilter.toLowerCase())
        let type = elem.libelleTypeStand().toLowerCase().includes(this.typeStand.toLowerCase())
        let presta = elem.libellePresta().toLowerCase().includes(this.presta.toLowerCase())
        return libelle && type && presta;
      }
    }
  },
  created() {
    console.log("created")
  }
}
</script>

<style scoped>

</style>