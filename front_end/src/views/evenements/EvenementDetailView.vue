<template>
    <div style="margin: auto;width: 800px; padding: 10px" v-if="info">
        <h1 style="text-align: center">Événement {{ info.idEvenement }}</h1>
        <br>
        <br>
        <p>Nom de l'événement = {{ info.libelleEvenement }}</p>
        <p>Type d'événement : {{ info.getLibelleTypeEvenement() }}</p>
        <p v-if="info.stand">Lieu : {{ info.stand.nomStand }}</p>
        <p>Nombre de place de l'événement :</p>
        <div v-if="info.stand" style="margin-left: 50px">
            <p>Total : {{ info.stand.nbPlace }}</p>
            <p>Deja prise : {{reservations.length}}</p>
            <p>Restant : {{info.stand.nbPlace - reservations.length }}</p>
        </div>
        <br>
        <br>
        <div>
            <v-btn v-if="currentRole!==NONCONNECTE && !dejaReserve" @click="reservationEvent">Réserver sa place</v-btn>
            <v-btn v-else-if="currentRole!==NONCONNECTE && dejaReserve" @click="annulerReservationEvent">Annuler sa
                réservation
            </v-btn>
            <p v-else>Vous devez être connecté pour réserver une place.</p>
            <v-btn @click="goToStand(info.stand.id)">Voir Stand</v-btn>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE} from "@/services/roles";
import myaxios from "@/services/axios";

export default {
    name: "EvenementDetailView",
    data: () => ({
        // info: {users: [], type_evenement: {},stand:{}},
        idEvenement: 0,
        NONCONNECTE,
        dejaReserve: false,
        reservations: [],

    }),
    computed: {
        ...mapState(["evenements", "currentUser"]),
        ...mapGetters(["currentRole"]),
        typeEvenement() {
            return this.info.type_evenement.libelleTypeEvenement
        },
        info() {
            return this.evenements.find(elem => elem.idEvenement === parseInt(this.$route.params.id))
        }
    },
    methods: {
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        },
        // fetchEventInfo(id) {
        //     console.log(id)
        //   myaxios.get("/evenements/" + id)
        //     .then(response => {
        //       this.info = response.data.data
        //         this.dejaReserve=this.info.users.filter(res => res.idUser === this.currentUser.idUser).length > 0
        //     })
        //     .catch(error => {
        //         console.log("aa")
        //       console.log(error)
        //     })
        // },
        async reservationEvent() {
            if (this.info.stand.nbPlace - this.reservations.length <= 0) {
                alert("Il n'y a plus de place disponible pour cet événement")
                return;
            }
            try {
                await myaxios.post(`/evenements/reservation/${this.idEvenement}`, {
                    idUser: this.currentUser.idUser
                });
                this.reservations.push({idUser: this.currentUser.idUser, idEvenement: this.idEvenement})
                alert('Vous avez bien réservé votre place');
                this.dejaReserve = true
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
            }
        },
        async annulerReservationEvent() {
            try {
                await myaxios.delete(`/evenements/reservation/${this.idEvenement}`,
                    {data: {idUser: this.currentUser.idUser}}
                );
                this.reservations.splice(this.reservations.findIndex(res => res.idUser === this.currentUser.idUser), 1)
                this.dejaReserve = false
                alert('Vous avez bien annulé votre réservation');
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'annulation de votre réservation');
            }
        },
    },
    created() {
        this.idEvenement = this.$route.params.id
        myaxios.get(`/evenements/${this.idEvenement}/reservation`)
            .then(response => {
                this.reservations = response.data.data
                if (this.currentUser) {
                    this.dejaReserve = this.reservations.filter(res => res.idUser === this.currentUser.idUser).length > 0
                }
            })
        // this.fetchEventInfo(this.idEvenement)
    }
}
</script>

<style scoped>

</style>