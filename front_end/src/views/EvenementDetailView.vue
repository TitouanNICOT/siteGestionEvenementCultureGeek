<template>
  <div style="margin: auto;width: 800px; padding: 10px">
    <h1 style="text-align: center">Événement {{ info.idEvenement }}</h1>
    <br>
    <br>
    <p>Nom de l'événement = {{ info.libelleEvenement }}</p>
    <p>Type d'événement : {{ typeEvenement }}</p>
    <p>Lieu : {{ info.stand.nomStand }}</p>
    <p>Nombre de places total de l'événement : {{ info.stand.nbPlace }}</p>
    <p>Nombre de places restantes de l'événement : {{ info.stand.nbPlace - info["reservations"].length }}</p>
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
    info: {user: {}, type_evenement: {}},
    idEvenement: 0,
    NONCONNECTE,

  }),
  computed: {
    ...mapState(["evenements", "currentUser"]),
    ...mapGetters(["currentRole"]),
    typeEvenement() {
      return this.info.type_evenement.libelleTypeEvenement
    },
    dejaReserve() {
      return this.info["reservations"].filter(res => res.idUser === this.currentUser.idUser).length > 0
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
          console.log("info", this.info)
        })
        .catch(error => {
          console.log(error)
        })
    },
     async reservationEvent() {
      if(this.info.stand.nbPlace - this.info["reservations"].length <= 0){
        alert("Il n'y a plus de place disponible pour cet événement")
        return;
      }
      // Vérifiez si l'utilisateur a déjà réservé une place pour cet événement
      const response = await axios.get(`http://localhost:3000/reservationEvent?filter={"where":{"idUser":${this.currentUser.idUser},"idEvenement":${this.info.idEvenement}}}`)
      if (response.data.data.length > 0) {
        alert("Vous avez déjà réservé une place pour cet événement")
        return;
      }
      try {
        const response = await axios.post(`http://localhost:3000/reservationEvent/`, {
          idEvenement: this.idEvenement,
          idUser: this.currentUser.idUser
        });
        console.log(response);
        alert('Vous avez bien réservé votre place');
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
      }
    },
    async annulerReservationEvent() {
      const response = await axios.get(`http://localhost:3000/reservationEvent?filter={"where":{"idUser":${this.currentUser.idUser},"idEvenement":${this.info.idEvenement}}}`)
      if (response.data.data.length === 0) {
        alert("Vous n'avez pas réservé de place pour cet événement")
        return;
      }
      try {
        const response = await axios.delete(`http://localhost:3000/reservationEvent/${response.data.data[0].idReservation}`);
        console.log(response);
        alert('Vous avez bien annulé votre réservation');
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'annulation de votre réservation');
      }
    },
  },
  created() {
    console.log(this.info)
    this.idEvenement = this.$route.params.id
    this.fetchEventInfo(this.idEvenement)
  }
}
</script>

<style scoped>

</style>