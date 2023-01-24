<template>
  <div style="margin: auto;width: 800px; padding: 10px">
    <h1 style="text-align: center">Événement {{ info.idEvenement }}</h1>
    <br>
    <br>
    <p>Nom de l'événement = {{ info.libelleEvenement }}</p>
    <p>Type d'événement : {{ typeEvenement }}</p>
    <p>Lieu : {{ info.stand.nomStand }}</p>
    <p>Nombre de places total de l'événement : {{ info.stand.nbPlace }}</p>
<!--    <p>Nombre de places restantes de l'événement : {{ info.stand.nbPlace - info["reservations"].length }}</p>-->
    <br>
    <br>
    <div>
      <v-btn v-if="currentRole!==NONCONNECTE && !dejaReserve" @click="reservationEvent">Réserver sa place</v-btn>
      <v-btn v-else-if="currentRole!==NONCONNECTE && dejaReserve" @click="annulerReservationEvent">Annuler sa réservation</v-btn>
      <p v-else>Vous devez être connecté pour réserver une place.</p>
      <v-btn @click="goToStand(info.stand.idStand)">Voir Stand</v-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE} from "@/services/roles";
import axios from "axios";

export default {
  name: "EvenementDetailView",
  data: () => ({
    info: {users: [], type_evenement: {},stand:{}},
    idEvenement: 0,
    NONCONNECTE,
      dejaReserve: false

  }),
  computed: {
    ...mapState(["evenements", "currentUser"]),
    ...mapGetters(["currentRole"]),
    typeEvenement() {
      return this.info.type_evenement.libelleTypeEvenement
    }
  },
  methods: {
    goToStand(num) {
      console.log("goToStand", num)
      this.$router.push({name: 'stand', params: {id: num}})
    },
    fetchEventInfo(id) {
      axios.get("http://localhost:3000/evenements/" + id)
        .then(response => {
          this.info = response.data.data
            this.dejaReserve=this.info.users.filter(res => res.idUser === this.currentUser.idUser).length > 0
        })
        .catch(error => {
          console.log(error)
        })
    },
     async reservationEvent() {
      if(this.info.stand.nbPlace - this.info["users"].length <= 0){
        alert("Il n'y a plus de place disponible pour cet événement")
        return;
      }
      try {
        await axios.post(`http://localhost:3000/evenements/reservation/${this.idEvenement}`, {
          idUser: this.currentUser.idUser
        });
        alert('Vous avez bien réservé votre place');
        this.dejaReserve=true
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
      }
    },
    async annulerReservationEvent() {
      try {
        await axios.delete(`http://localhost:3000/evenements/reservation/${this.idEvenement}`,
            {data: {idUser: this.currentUser.idUser}}
        );
        this.dejaReserve=false
        alert('Vous avez bien annulé votre réservation');
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'annulation de votre réservation');
      }
    },
  },
  created() {
    this.idEvenement = this.$route.params.id
    this.fetchEventInfo(this.idEvenement)
  }
}
</script>

<style scoped>

</style>