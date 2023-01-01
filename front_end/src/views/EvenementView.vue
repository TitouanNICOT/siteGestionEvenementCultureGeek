<template>
  <div>
    <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
      <h1 style="text-align: center">Liste Evenement</h1>
    </div>
    <div v-for="(elem,index) in evenement" :key="index">
      <div style="margin: 10px; float: left;">
        <v-card class="mx-3" max-width="344" outlined>
          <h3 style="text-align: center;">{{elem.libelle}}</h3>
          <hr>
          <span>Type d'événement : <strong>{{elem.typeEve}}</strong></span>
          <br>
          <span>Numéro du stand : <strong>{{elem.numStand}}</strong></span>
          <br>
          <span>Type de stand : <strong>{{elem.idTypeStand}}</strong></span>
          <br>
          <span>Nom du stand : <strong>{{elem.nomStand}}</strong></span>
          <br>
          <span>Description stand : <strong>{{elem.description}}</strong></span>
          <br>
          <br>
          <v-btn @click="voirStand(elem.numStand)">Voir Stand</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations, mapState} from "vuex";
import evenementS from "@/services/evenements";
export default {
  name: "EvenementView",
  data: () => {
    return {
      evenement: []
    }
  },
  computed:{
    ...mapState(["evenements"]),
    ...mapState(["listeTypeStand"]),
    ...mapGetters(["listePresta"])
  },
  methods: {
    ...mapMutations(["getEvenements"]),
    voirStand(idStand){
      this.$router.push({name:"stand",params:{id:idStand}})
    }
  },
  created() {
    console.log("created")
    evenementS.getAllEvenement().then(responce => {
      console.log(responce.data.data)
      for (let i = 0; i < responce.data.data.length; i++) {
        this.evenement.push({
          libelle: responce.data.data[i].libelleEvenement,
          //heureFin: responce.data.data[i].heureFin,
          //heureDebut: responce.data.data[i].heureDebut,
          //idEvenement: responce.data.data[i].idEvenement,
          typeEve: responce.data.data[i].type_evenement.libelleTypeEvenement,
          idTypeStand: this.listeTypeStand[(responce.data.data[i].stand.idTypeStand)-1].libelleTypeStand,
          nomStand: responce.data.data[i].stand.nomStand,
          description: responce.data.data[i].stand.descriptionStand,
          numStand: responce.data.data[i].idStand,
        })
      }
    })
  }
}

</script>

<style scoped>

</style>