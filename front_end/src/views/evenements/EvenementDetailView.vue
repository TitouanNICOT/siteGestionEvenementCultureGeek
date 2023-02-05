<template>
    <div style="margin: auto; max-width: 800px; padding: 10px" v-if="info">
        <h1 style="text-align: center">Évènement {{ info.idEvenement }}</h1>
        <br>
        <br>
        <div v-if="!isEditing">
            <p>Nom de l'événement : {{ info.libelleEvenement }}</p>
            <p>Type d'événement : {{ info.getLibelleTypeEvenement() }}</p>
            <p>Date de début : {{ format(new Date(info.heureDebut), 'yyyy/MM/dd HH:mm') }}</p>
            <p>Date de fin : {{ format(new Date(info.heureFin), 'yyyy/MM/dd HH:mm') }}</p>
            <p>Lieu : {{ info.stand.nomStand }}</p>
        </div>
        <div v-else>
            <v-form ref="form" lazy-validation>
                <p>Nom de l'événement :
                    <v-text-field
                        v-model="nomEvenement"
                        :rules="nameRule"
                        aria-required="true"
                        required>
                    </v-text-field>
                </p>
                <p>Type d'événement :
                    <v-select
                        v-model="eventType"
                        :items="listTypeEvenement"
                        :rules="selectRule"
                        required>
                    </v-select>
                </p>
                <p>Date de début :
                    <v-datetime-picker
                        v-model="eventHeureDebut"
                        date-format="dd/MM/yyyy"
                        :class="additionnalValidation() ? 'error--text' : ''"
                        :text-field-props="{rules:datePikerRule, required: true}"
                        :date-picker-props="{min:'2023-02-01', max: getMaxDate()}"
                        :time-picker-props="{format:'24hr'}"
                        required>
                        <template slot="dateIcon">
                            <v-icon>mdi-calendar</v-icon>
                        </template>
                        <template slot="timeIcon">
                            <v-icon>mdi-clock</v-icon>
                        </template>
                    </v-datetime-picker>
                </p>
                <p>Date de fin :
                    <v-datetime-picker
                        v-model="eventHeureFin"
                        date-format="dd/MM/yyyy"
                        :text-field-props="{rules:datePikerRule, required: true}"
                        :date-picker-props="{min: getMinDate(), max:'2023-02-03'}"
                        :time-picker-props="{format:'24hr'}"
                        required>
                        <template slot="dateIcon">
                            <v-icon>mdi-calendar</v-icon>
                        </template>
                        <template slot="timeIcon">
                            <v-icon>mdi-clock</v-icon>
                        </template>
                    </v-datetime-picker>
                </p>
                <p>Lieu :
                    <v-select
                        v-model="eventNomStand"
                        :items="listStand"
                        :rules="selectRule"
                        required>
                    </v-select>
                </p>
            </v-form>
        </div>
        <div v-if="info.stand">
            <p>Nombre de place de l'événement :</p>
            <div style="margin-left: 50px">
                <p>Total : {{ info.stand.nbPlace }}</p>
                <p>Deja prise : {{ reservations.length }}</p>
                <p>Restant : {{ info.stand.nbPlace - reservations.length }}</p>
            </div>
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
            <v-btn v-if="currentRole===2 && currentUser.idUser===info.stand.user.idUser"
                   @click="toggleEdition"
                   color="var(--primary-color)"
                   style="color: white">
                {{ isEditing ? "Valider" : "Editer"}}
            </v-btn>
            <v-btn v-if="isEditing && currentRole===2 && currentUser.idUser===info.stand.user.idUser"
                   @click="cancelEdition"
                   color="var(--primary-color)"
                   style="color: white">
                Annuler
            </v-btn>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="450"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-if="!isEditing && currentRole === 2 && currentUser.idUser === info.stand.user.idUser"
                           color="var(--primary-color)"
                           dark
                           v-bind="attrs"
                           v-on="on"
                    >
                        Supprimer l'événement
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5" style="hyphens: none; word-break: normal;">
                        voulez-vous vraiment supprimer l'événement {{ info.idEvenement }} : {{ info.libelleEvenement }}
                        ?
                    </v-card-title>
                    <v-card-text>
                        Vous-êtes sur le point d'Annuler un évènement.
                        Cela veut dire que celui-ci sera perdu définitivement sans possibilité de le récupérer.
                        Cela affectera aussi les réservations de l'événement.
                        Êtes-vous sûr de vouloir continuer ?
                        <v-checkbox v-model="notifUsers">
                            <template v-slot:label>
                                Notifier les utilisateurs
                            </template>
                        </v-checkbox>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="darken-1"
                            text
                            @click="dialog = false"
                        >
                            Annuler
                        </v-btn>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false; deleteEvent();"
                        >
                            Confirmer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE} from "@/services/roles";
import myaxios from "@/services/axios";
import {compareAsc, compareDesc, format} from "date-fns";
import axios from "@/services/axios";
import router from "@/router";

export default {
    name: "EvenementDetailView",
    data: () => ({
        // info: {users: [], type_evenement: {},stand:{}},
        idEvenement: 0,
        NONCONNECTE,
        dejaReserve: false,
        reservations: [],
        dialog: false,
        notifUsers: false,
        currentDate: new Date(),

        // Edition temp variables
        isEditing: false,
        nomEvenement: String,
        eventType: String,
        eventHeureDebut: Date,
        eventHeureFin: Date,
        eventNomStand: String,
        nameRule: [
            nom => !!nom || 'Le nom de l\'évenement est requis',
        ],
        datePikerRule: [
            date => !!date || 'La date de début et de fin sont requises',
        ],
        selectRule: [
            select => !!select || 'Le type d\'évenement est requis',
        ],


    }),
    computed: {
        ...mapState(["evenements", "currentUser", "listeTypeEvenement", "stands"]),
        ...mapGetters(["currentRole"]),
        info() {
            return this.evenements.find(elem => elem.idEvenement === parseInt(this.$route.params.id))
        },
        listTypeEvenement() {
            return this.listeTypeEvenement.map(event => event.libelleTypeEvenement)
        },
        listStand() {
            let stands = this.stands.filter(stand => stand.idPresta() === this.currentUser.idUser)
            return stands.map(stand => stand.nomStand)
        },
    },
    methods: {
        format,
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        },
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
        deleteEvent() {
            myaxios.delete(`/evenements/reservation/${this.idEvenement}/all`).then(() => {
                if (this.notifUsers) {
                    console.log("All users has been notified")
                }
                myaxios.delete(`/evenements/${this.idEvenement}`).then(() => {
                    this.$router.push({name: 'evenement'})
                }).catch(error => {
                    console.log(error)
                })
            }).catch(error => {
                console.log(error)
            })
        },
        toggleEdition() {
            if (!this.isEditing) {
                this.nomEvenement = this.info.libelleEvenement
                this.eventType = this.info.getLibelleTypeEvenement()
                this.eventHeureDebut = new Date(this.info.heureDebut)
                this.eventHeureFin = new Date(this.info.heureFin)
                this.eventNomStand = this.info.stand.nomStand
                this.isEditing = true;
            } else {
                if (this.$refs.form.validate() && this.additionnalValidation()) {
                    this.isEditing = false;
                    let typeDEvenement = this.listeTypeEvenement.find(typeEvent => typeEvent.libelleTypeEvenement === this.eventType)
                    let nomDuStand = this.stands.find(stand => stand.nomStand === this.eventNomStand)
                    axios.put(`/evenements`, {
                        id:this.idEvenement,
                        libelleEvenement: this.nomEvenement,
                        heureDebut: this.eventHeureDebut,
                        heureFin: this.eventHeureFin,
                        idTypeEvenement: typeDEvenement.idTypeEvenement,
                        idStand: nomDuStand.id
                    }).then((responce) => {
                        if (responce.data.success === 1) {
                            alert("as been modified")
                            router.push({name: "evenement"})
                        } else
                            alert("Erreur lors de la modification du stand")
                    })
                }
            }
        },
        cancelEdition() {
            this.nomEvenement = this.info.libelleEvenement
            this.eventType = this.info.getLibelleTypeEvenement()
            this.eventHeureDebut = new Date(this.info.heureDebut)
            this.eventHeureFin = new Date(this.info.heureFin)
            this.eventNomStand = this.info.stand.nomStand
            this.isEditing = false;
        },
        additionnalValidation() {
            let isValid = compareAsc(this.eventHeureDebut, this.eventHeureFin) === -1;
            if (!isValid) {
                alert('La date de début doit être inférieure à la date de fin')
            }
            return isValid
        },
        getMinDate(){
            if (this.eventHeureDebut){
                return format(this.eventHeureDebut, 'yyyy-MM-dd')
            }
            return '2023-02-01'
        },
        getMaxDate(){
            if (this.eventHeureFin){
                return format(this.eventHeureFin, 'yyyy-MM-dd')
            }
            return '2023-02-03'
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
        this.notifUsers = compareAsc(this.currentDate, new Date('2023-02-01 00:00:00')) === compareDesc(this.currentDate, new Date('2023-02-03 23:59:59'))

        // pour tester pendant le Geeky Event
        // this.notifUsers = compareAsc(new Date('2023-02-02 00:00:00'), new Date('2023-02-01 00:00:00')) === compareDesc(new Date('2023-02-02 00:00:00'), new Date('2023-02-03 23:59:59'))
    },
}
</script>

<style scoped>

</style>
