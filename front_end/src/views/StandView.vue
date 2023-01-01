<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Stand</h1>
    </div>
    <div v-for="(elem,index) in stand" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined>
          <h3 style="text-align: center;">{{elem.nomStand}}</h3>
          <hr>
          <span>Numéro du stand : <strong>{{elem.numStand}}</strong></span>
          <br>
          <span>Type de stand : <strong>{{elem.idTypeStand}}</strong></span>
          <br>
          <span>Nom Prestataire : <strong>{{elem.user}}</strong></span>
          <br>
          <span>Pseudo Prestataire : <strong>{{elem.pseudoUser}}</strong></span>
          <br>
          <span>Role Prestataire : <strong>{{elem.role}}</strong></span>
          <br>
          <span>Description : <strong>{{elem.description}}</strong></span>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations, mapState} from "vuex";
import standsS from "@/services/stands";
export default {
  name: "StandView",
  data: () => {
    return {
      stand: []
    }
  },
  computed:{
    ...mapState(["stands"]),
    ...mapState(["listeTypeStand"]),
    ...mapGetters(["listePresta"])
  },
  methods: {
    ...mapMutations(["getStands"]),
  },
  created() {
    console.log("created")
    standsS.getAllStand().then(responce => {
      for (let i = 0; i < responce.data.data.length; i++) {
        this.stand.push({
          nomStand: responce.data.data[i].nomStand,
          description: responce.data.data[i].descriptionStand,
          numStand: responce.data.data[i].idStand,
          idTypeStand: this.listeTypeStand[(responce.data.data[i].idTypeStand)-1].libelleTypeStand,
          user: responce.data.data[i].user.prenom+" "+responce.data.data[i].user.nom,
          pseudoUser: responce.data.data[i].user.pseudo,
          role: responce.data.data[i].user.idRole
        })
      }
    })
  }
}
</script>

<style scoped>

</style>