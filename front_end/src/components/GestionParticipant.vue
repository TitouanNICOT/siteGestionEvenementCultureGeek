<template>
  <div class="GestionParticipant">
    <v-btn @click="goToEvent">Revenir sur le Tournoi</v-btn>
    <div>
      <v-select
          :items="listUser"
          item-text="pseudo"
          item-value="idUser"
          label="pseudo"
          v-model="idUser"
          style="width: 300px"
      ></v-select>
      <v-btn @click="addParticipant(idUser,participants[0].idTournoi)">Ajouter un participant</v-btn>
    </div>
    <ListeDataView :data="participants" :filtreInfo="filtreInfo" nomPage="Gestion des participants">
      <template v-slot:default="{elem}">
        <span>{{elem.pseudo}}</span>
        <v-btn @click="remove(elem.idUser,elem.idTournoi)">remove</v-btn>
        <br>
      </template>
    </ListeDataView>
  </div>
</template>

<script>

import myaxios from "@/services/axios";
import ListeDataView from "@/components/ListeDataView.vue";
export default {
  name: "GestionParticipant",
  components: {ListeDataView},
  data: () => ({
    participants: [],
    listUser: [],
    filtreInfo: [{type: "text", label: "Pseudo" ,attribut: "pseudo"}]
  }),
  methods: {
    addParticipant(idUser, idTournoi) {
      if(idUser === undefined || idTournoi === undefined) return
      myaxios.post("/gestionParticipant/addParticipant", {
        idUser: idUser,
        idTournoi: idTournoi
      }).then(res => {
        res.data.data.pseudo=this.getPseudo(res.data.data.idUser)
        this.participants.push(res.data.data)
      })
    },
    remove(idJoueur, idTournoi) {
      myaxios.delete("/gestionParticipant/deleteParticipant/" + idJoueur + "/" + idTournoi).then(() => {
        this.participants = this.participants.filter(p => p.idUser !== idJoueur)
      })
    },
    getPseudo(idUser) {
      return this.listUser.find(u => u.idUser === idUser).pseudo
    },
    goToEvent(){
      this.$router.push("/evenement/" + this.participants[0].idTournoi)
    }
  },
  created(){
    myaxios.get("/users/").then(res => {
      this.listUser = res.data.data

      myaxios.get("/gestionParticipant/allParticipant").then(res => {
        res.data.data.forEach(p => {
          p.pseudo = this.getPseudo(p.idUser)
        })
        this.participants = res.data.data
      })
    })

  }

}
</script>

<style scoped>

</style>