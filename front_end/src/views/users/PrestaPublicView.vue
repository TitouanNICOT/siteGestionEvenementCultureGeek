<template>
  <v-container>
    <h1 style="text-align: center">Profil du Prestataire</h1>
    <div class="border">
      <p>Nom : {{ presta.nom }}</p>
      <p>Prenom : {{ presta.prenom }}</p>
      <p>Mail : {{ presta.email }}</p>
    </div>
    <div class="border">
      <h3>Ses stands</h3>
      <p v-if="stands.length === 0" style="text-align: center">Ce prestataire n'a, pour l'instant, ancun stand.</p>
      <v-row v-else>
        <v-col v-for="(stand,index) in listeStands" :key="index" cols="4">
          <v-card class="pa-3" @click="goStand(stand.id)">{{ stand.nomStand }}</v-card>
        </v-col>
      </v-row>
    </div>
    <div class="border">
      <h3>Ses Evenements</h3>
      <p v-if="listeEvenements.length === 0" style="text-align: center">Ce prestataire n'a, pour l'instant, ancun evenement.</p>
      <v-row v-else>
        <v-col v-for="(event,index) in listeEvenements" :key="index" cols="4">
          <v-card class="pa-3">{{ event.libelleEvenement }}</v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
// import myaxios from "@/services/axios";

export default {
  name: "HomePrestaView",
  props:{
    idUser:String
  },
  computed: {
    ...mapState(['stands', 'evenements','users']),
    presta(){
      const res = this.users.find(user => user.idUser === parseInt(this.idUser));
      if (res)
        return res
      return {}
    },
    listeStands() {
      console.log( this.stands.filter(stand => stand.idPresta() === this.presta.idUser))
      return this.stands.filter(stand => stand.idPresta() === this.presta.idUser)
    },
    listeEvenements() {
      return this.evenements.filter(event => this.listeStands.map(s => parseInt(s.id)).includes(event.idStand))
    }
  },
  data: () => ({
  }),
  methods: {
    goStand(idStand) {
      console.log(idStand)
      this.$router.push({name: "stand", params: {id: idStand}})
    }
  }
}
</script>
<style scoped>
.border {
  border: 1px solid black;
  padding: 10px;
}
</style>