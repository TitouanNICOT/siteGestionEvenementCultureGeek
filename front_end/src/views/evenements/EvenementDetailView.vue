<template>
    <div style="margin: auto; max-width: 800px; padding: 10px" v-if="info">
        <h1 style="text-align: center">{{ info.libelleEvenement }}</h1>
        <br>
        <br>
        <div class="border" style="max-width:596px" v-if="!isEditing">
            <p>Type d'événement : {{ info.getLibelleTypeEvenement() }}</p>
            <p>Date : {{ format(new Date(info.heureDebut), 'yyyy/MM/dd HH:mm') }} -
                {{ format(new Date(info.heureFin), 'yyyy/MM/dd HH:mm') }}</p>
            <p>Lieu : {{ info.stand ? info.stand.nomStand : " " }}</p>
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
                <div v-if="currentlyEditingTournoi">
                    <p>Nom du tournoi :
                        <v-text-field
                            v-model="tournoiNomJeu"
                            :rules="jeuRule"
                            aria-required="true"
                            required>
                        </v-text-field>
                    </p>
                    <p>Nombre de tours :
                        <v-text-field
                            v-model="tournoiNbTour"
                            :rules="nbTourRule"
                            aria-required="true"
                            required>
                        </v-text-field>
                    </p>
                </div>
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
        <div style="display:flex;">
            <div class="border" v-if="info.stand">
                <p>Nombre de place (Visiteurs) :</p>
                <div style="margin-left: 50px">
                    <p>Total : {{ info.stand.nbPlace }}</p>
                    <p>Deja prise : {{ reservations.length }}</p>
                    <p>Restant : {{ info.stand.nbPlace - reservations.length }}</p>
                </div>
                <div v-if="currentRole!==NONCONNECTE && !dejaReserve">
                    <v-btn @click="reservationEvent" v-if="!dejaParticipe">Réserver sa place</v-btn>
                    <span v-else>Vous etes deja inscrit comme joueur</span>
                </div>
                <v-btn v-else-if="currentRole!==NONCONNECTE && dejaReserve" @click="annulerReservationEvent">Annuler sa
                    réservation
                </v-btn>
                <p v-else>Vous devez être connecté pour réserver une place.</p>
            </div>
            <div class="border" v-if="info.tournoi">
                <p>Nombre de place (Participants) :</p>
                <div style="margin-left: 50px">
                    <p>Total : {{ info.tournoi.nbJoueur }}</p>
                    <p>Deja prise : {{ nbParticipants }}</p>
                    <p>Restant : {{ info.tournoi.nbJoueur - nbParticipants }}</p>
                </div>
                <div v-if="currentRole!==NONCONNECTE && !dejaParticipe && info.tournoi.status === 1">
                    <v-btn @click="participerEvent" v-if="!dejaReserve">Réserver sa place</v-btn>
                    <span v-else>Vous etes deja inscrit comme spectateur</span>
                </div>
                <v-btn v-else-if="currentRole!==NONCONNECTE && dejaParticipe" @click="annulerParticipationEvent">Annuler
                    sa
                    réservation
                </v-btn>
                <p v-else-if="info.tournoi.status !== 1">Le tournoi n'accepte plus les inscriptions.</p>
                <p v-else>Vous devez être connecté pour réserver une place.</p>
            </div>
        </div>
        <br>
        <br>
        <div>
            <v-btn @click="goToStand(info.stand.id)">Voir Stand</v-btn>
            <v-btn v-if="currentRole===2 && isOwner && (!info.tournoi ||info.tournoi.status === 0)"
                   @click="toggleEdition"
                   color="var(--primary-color)"
                   style="color: white">
                {{ isEditing ? "Valider" : "Editer" }}
            </v-btn>
            <v-btn v-if="isEditing && currentRole===2 && isOwner"
                   @click="cancelEdition"
                   color="var(--primary-color)"
                   style="color: white">
                Annuler
            </v-btn>

            <v-btn v-if="!isEditing && currentRole===2 && isOwner && info.tournoi && info.tournoi.status === 0"
                   @click="setStatusTo(1)"
                   color="var(--primary-color)"
                   style="color: white">
                Lancer les inscriptions
            </v-btn>

            <v-btn v-if="!isEditing && currentRole===2 && isOwner && info.tournoi && info.tournoi.status === 1"
                   @click="setStatusTo(2)"
                   color="var(--primary-color)"
                   style="color: white">
                Démarer le tournoi
            </v-btn>

            <v-btn v-if="!isEditing && currentRole===2 && isOwner && info.tournoi && info.tournoi.status === 2"
                   @click="setStatusTo(3)"
                   color="var(--primary-color)"
                   style="color: white">
                Finir le tournoi
            </v-btn>

            <v-btn v-if="!isEditing && info.tournoi && (info.tournoi.status === 2 || info.tournoi.status === 3)"
                   :to="pathToGraph"
                   color="var(--primary-color)"
                   style="color: white">
                Voir le graphique
            </v-btn>
          <v-btn
                   @click="goToGestionParticipants()"
                   color="var(--primary-color)"
                   style="color: white">
                Gestion des Participants
          </v-btn>

            <v-dialog
                v-model="dialog"
                persistent
                max-width="450"
                v-if="!isEditing && currentRole === 2 && isOwner"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
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
        dejaParticipe: false,

        participations: [],

        // Edition temp variables
        isEditing: false,
        nomEvenement: String,
        eventType: String,
        eventHeureDebut: Date,
        eventHeureFin: Date,
        eventNomStand: String,
        tournoiNomJeu: String,
        tournoiNbTour: Number,
        nameRule: [
            nom => !!nom || 'Le nom de l\'évenement est requis',
        ],
        datePikerRule: [
            date => !!date || 'La date de début et de fin sont requises',
        ],
        selectRule: [
            select => !!select || 'Le type d\'évenement est requis',
        ],
        jeuRule: [
            nom => !!nom || 'Le nom du jeu est requis',
        ],
        nbTourRule: [
            nom => !!nom || 'Le nombre de tours est requis',
        ],


    }),
    computed: {
        ...mapState(["evenements", "currentUser", "listeTypeEvenement", "stands"]),
        ...mapGetters(["currentRole"]),

        pathToGraph() {
            if (this.info.tournoi) {
                return "/tournoi/" + this.info.tournoi.idTournoi;
            }
            return "/tournoi/1";
        },

        currentlyEditingTournoi() {
            return this.eventType === "Tournoi";
        },
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
        isOwner() {
            return this.info.stand ? this.currentUser.idUser === this.info.stand.user.idUser : false
        },
        nbParticipants() {
            return this.participations.length;
        }
    },
    methods: {
        format,
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        },

        async setStatusTo(status) {
            //let info = this.evenements.find(elem => elem.idEvenement === parseInt(this.$route.params.id))
            if (this.info === undefined)
                return
            let res = await myaxios.patch(`/gestionTournoi/${this.info.tournoi.idTournoi}/status`, {
                status: status
            });

            if (res.status === 200) {
                this.info.tournoi.status = status;

                if (status === 2) {
                    try {
                        let res = await myaxios.post(`/gestionTournoi/${this.info.tournoi.idTournoi}`);
                        if (res.status === 200) {
                            alert("Tournoi bien initialisé");
                        }
                    } catch (e) {
                        this.setStatusTo(1);
                        if (e.response.status === 500)
                            alert("Pas le bon nombre de personne pour commencer tournoi")
                    }
                }
            }
        },

        async participationEvent() {
            //let info = this.evenements.find(elem => elem.idEvenement === parseInt(this.$route.params.id))
            if (this.info === undefined)
                return
            let res = await myaxios.get(`/gestionTournoi/getById/${this.info.tournoi.idTournoi}`);

            if (res.status === 200) {
                this.participations = res.data.data;
                if (this.currentUser)
                    this.dejaParticipe = this.participations.filter(res => res.idUser === this.currentUser.idUser).length > 0
            }
        },

        async participerEvent() {
            if (this.info.tournoi.nbJoueur - this.nbParticipants <= 0) {
                alert("Il n'y a plus de place disponible pour cet événement")
                return;
            }
            try {
                await myaxios.post(`/gestionTournoi/`, {
                    idTournoi: this.info.tournoi.idTournoi,
                    idUser: this.currentUser.idUser
                });
                this.participations.push({idUser: this.currentUser.idUser, idTournoi: this.info.tournoi.idTournoi})
                alert('Vous avez bien réservé votre place');
                this.dejaParticipe = true
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
            }
        },
        async annulerParticipationEvent() {
            try {
                await myaxios.delete(`/gestionTournoi/${this.info.tournoi.idTournoi}/${this.currentUser.idUser}`);
                this.participations.splice(this.participations.findIndex(res => res.idUser === this.currentUser.idUser && res.idTournoi === this.info.tournoi.idTournoi), 1)
                this.dejaParticipe = false
                alert('Vous avez bien annulé votre réservation');
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'annulation de votre réservation');
            }
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

            if (this.info.tournoi) {
                myaxios.delete(`/gestionTournoi/${this.info.tournoi.idTournoi}`);
            }


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
                this.tournoiNomJeu = this.info.tournoi ? this.info.tournoi.nomTournoi : "";
                this.tournoiNbTour = this.info.tournoi ? this.info.tournoi.nbTour : 0;
            } else {
                if (this.$refs.form.validate() && this.additionnalValidation()) {
                    this.isEditing = false;
                    let typeDEvenement = this.listeTypeEvenement.find(typeEvent => typeEvent.libelleTypeEvenement === this.eventType)
                    let nomDuStand = this.stands.find(stand => stand.nomStand === this.eventNomStand)
                    myaxios.put(`/evenements`, {
                        id: this.idEvenement,
                        libelleEvenement: this.nomEvenement,
                        heureDebut: this.eventHeureDebut,
                        heureFin: this.eventHeureFin,
                        idTypeEvenement: typeDEvenement.idTypeEvenement,
                        idStand: nomDuStand.id
                    }).then((responce) => {
                        if (responce.data.success === 1) {
                            alert("has been modified")

                            if (typeDEvenement.idTypeEvenement === 1) {
                                if (this.info.tournoi) {
                                    // Edit tournoi
                                    myaxios.patch(`/gestionTournoi/${this.info.tournoi.idTournoi}`, {
                                        nbTour: this.tournoiNbTour,
                                        nomTournoi: this.tournoiNomJeu,
                                    }).then(() => {
                                        myaxios.post('/mail/notification', {
                                            eventId: this.idEvenement,
                                            eventStatus: 'Modified'
                                        }).then(() => {
                                            alert("All users has been notified")
                                        }).catch(error => {
                                            console.log(error)
                                        })
                                        router.push({name: "evenement"})
                                    })
                                } else {
                                    // Create tournoi
                                    myaxios.post(`/gestionTournoi/tournoi/create`, {
                                        nbTour: this.tournoiNbTour,
                                        nomTournoi: this.tournoiNomJeu,
                                        status: 0,
                                        idEvenement: this.info.idEvenement
                                    }).then(() => {
                                        myaxios.post('/mail/notification', {
                                            eventId: this.idEvenement,
                                                        eventStatus: 'Modified'    }).then(() => {
                                            alert("All users has been notified")
                                        }).catch(error => {
                                            console.log(error)
                                        })
                                        router.push({name: "evenement"})
                                    })
                                }
                            } else if (this.info.tournoi) {
                                // Delete tournoi
                                myaxios.delete(`/gestionTournoi/${this.info.tournoi.idTournoi}`).then(() => {
                                    myaxios.post('/mail/notification', {
                                        eventId: this.idEvenement,
                                        eventStatus: 'Modified'
                                    }).then(() => {
                                        alert("All users has been notified")
                                    }).catch(error => {
                                        console.log(error)
                                    })
                                    router.push({name: "evenement"})
                                })

                            } else {
                                myaxios.post('/mail/notification', {
                                    eventId: this.idEvenement,
                                    eventStatus: 'Modified'
                                }).then(() => {
                                    alert("All users has been notified")
                                }).catch(error => {
                                    console.log(error)
                                })
                                router.push({name: "evenement"})
                            }
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
        getMinDate() {
            if (this.eventHeureDebut) {
                return format(this.eventHeureDebut, 'yyyy-MM-dd')
            }
            return '2023-02-01'
        },
        getMaxDate() {
            if (this.eventHeureFin) {
                return format(this.eventHeureFin, 'yyyy-MM-dd')
            }
            return '2023-02-03'
        },
        goToGestionParticipants() {
            router.push({name: "gestionParticipant"})
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
                // this.participationEvent();
            })
        // this.fetchEventInfo(this.idEvenement)
        this.notifUsers = compareAsc(this.currentDate, new Date('2023-02-01 00:00:00')) === compareDesc(this.currentDate, new Date('2023-02-03 23:59:59'))

        if (this.info && this.info.tournoi) {
            this.participationEvent();
        }


        // pour tester pendant le Geeky Event
        // this.notifUsers = compareAsc(new Date('2023-02-02 00:00:00'), new Date('2023-02-01 00:00:00')) === compareDesc(new Date('2023-02-02 00:00:00'), new Date('2023-02-03 23:59:59'))
    },
    watch: {
        info() {
            this.participationEvent();
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
