<template>
    <div style="margin: auto;width: 800px; padding: 10px" v-if="info">
        <h1 style="text-align: center">{{ isEditing ? "Editing " : ""}}Stand n°{{ info.id }}</h1>
        <div v-if="!isEditing">
            <p>Nom Stand = {{ info.nomStand }}</p>
            <p>Description = {{ info.descriptionStand }}</p>
            <p>Information prestataire = {{ info.libellePresta() }}</p>
            <p>Type stand : {{ info.libelleTypeStand() }}</p>
            <p v-if="[2, 3].includes(info.typeStand.idTypeStand)">nombre de places : {{ info.nbPlace }}</p>
        </div>
        <div v-else>
            <p>Nom Stand =
                <v-text-field
                    v-model="nomStand"
                    required
                >
                </v-text-field>
            </p>
            <p>Description =
                <v-text-field
                    v-model="descriptionStand">
                </v-text-field>
            </p>
            <p>Information prestataire = {{ info.libellePresta() }}</p>
            <p>Type stand :
                <v-select
                    v-model="typeStand"
                    :items="listTypeStand"
                    required>
                </v-select>
            </p>
            <p v-if="['tournois', 'temporaire'].includes(typeStand)">
                nombre de places :
                <v-text-field
                    v-model="nbPlace">
                </v-text-field>
            </p>
        </div>
        <div style="border: black 1px solid; padding: 10px">
            <h2>Livre d'or :</h2>
            <p>Liste des commentaires sur le stand</p>
            <div v-if="livreOr.length===0"> Pas de commentaire</div>
            <v-row v-else>
                <v-col v-for="(com,index) in livreOr" :key="index" cols="6">
                    <v-card class="pa-3">{{ com.commentaire }}</v-card>
                </v-col>
            </v-row>
        </div>
        <br>
        <v-row style="border: black 1px solid; margin: 1px; padding: 5px">
            <v-text-field v-model="commentaire" label="Commentaire"
                          v-on:keyup.enter="addCommentaireAction"></v-text-field>
            <v-btn @click="addCommentaireAction">Ajouter</v-btn>
        </v-row>
        <div style="border: black 1px solid; margin: 1px; padding: 5px">
            <h2>Liste des evenements sur le stand : </h2>
            <v-row v-if="info.listEvenement.length!==0">
                <v-col v-for="(event,index) in info.listEvenement" :key="index" cols="4">
                    <v-card class="pa-3" @click="goToEvent(event.idEvenement)">{{ event.libelleEvenement }}</v-card>
                </v-col>
            </v-row>
            <v-btn @click="$router.push({name: 'nouvelleEvenement', params: {idStand: idStand}})">Ajouter un evenement</v-btn>
        </div>
        <br>
        <div>
            <v-btn @click="retourCarte">Retour à la carte</v-btn>
            <v-btn v-if="info.libelleTypeStand()==='boutique'" @click="clickBoutique">Acceder a la boutique</v-btn>
            <v-btn @click="infoPresta(info.user.idUser)">Informations du Prestataires</v-btn>

            <v-btn v-if="currentRole===2 && currentUser.idUser===info.user.idUser"
                   @click="toggleEdition"
                   color="var(--primary-color)"
                   style="color: white">
                {{ isEditing ? "Valider" : "Editer"}}
            </v-btn>
            <v-btn v-if="isEditing && currentRole===2 && currentUser.idUser===info.user.idUser"
                   @click="cancelEdition"
                   color="var(--primary-color)"
                   style="color: white">
                Annuler
            </v-btn>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import myaxios from "@/services/axios";
import axios from "@/services/axios";
import router from "@/router";

export default {
    name: "StandDetailView",
    data: () => ({
        commentaire: "",
        livreOr: [],
        isEditing: false,
        nomStand: "",
        descriptionStand: "",
        typeStand: "",
        nbPlace: 0,
    }),
    computed: {
        ...mapState(["evenements", "stands", 'currentUser','listeTypeStand']),
        ...mapGetters(['currentRole']),
        idStand() {
            return this.$route.params.id
        },
        info() {
            return this.stands.find(stand => stand.id === parseInt(this.idStand))
        },
        listTypeStand(){
            return this.listeTypeStand.map(typeStand => typeStand.libelleTypeStand)
        },

    },
    methods: {
        retourCarte() {
            this.$router.push({name: "carte"})
        },
        clickBoutique() {
            this.$router.push({name: "boutique", params: {idStand: this.idStand}})
        },
        addCommentaireAction() {
            if (this.commentaire !== "") {
                myaxios.post(`/stands/${this.idStand}/commentaire`, {
                    commentaire: this.commentaire
                }).then((responce) => {
                    if (responce.data.success === 1) {
                        this.livreOr.push({commentaire: this.commentaire})
                        this.commentaire = ""
                    } else
                        alert("Erreur lors de l'ajout du commentaire")
                })
            }
        },
        infoPresta(id) {
            this.$router.push("/infosPresta/" + id)
        },
        goToEvent(id) {
            this.$router.push("/evenement/" + id)
        },
        toggleEdition() {
            if (!this.isEditing) {
                this.nomStand = this.info.nomStand
                this.descriptionStand = this.info.descriptionStand
                this.typeStand = this.info.libelleTypeStand()
                this.nbPlace = this.info.nbPlace
                this.isEditing = true;
            }
            else {
                if (this.checkForm()) {
                    this.isEditing = false;
                    let standType = this.listeTypeStand.find(typeStand => typeStand.libelleTypeStand === this.typeStand)
                    axios.patch(`/stands/${this.idStand}`, {
                        nomStand: this.nomStand,
                        descriptionStand: this.descriptionStand,
                        idTypeStand: standType.idTypeStand,
                        nbPlace: this.nbPlace
                    }).then((responce) => {
                        if (responce.data.success === 1) {
                            alert("as been modified")
                            router.push({name: "stands"})
                        } else
                            alert("Erreur lors de la modification du stand")
                    })
                }
            }
        },
        checkForm() {
            let validator = true

            if (this.typeStand !== "tournois" && this.typeStand !== "temporaire") {
                this.nbPlace = 0
            }

            if (this.nomStand === "") {
                alert("Le nom du stand ne peut pas être vide")
                validator = false
            }

            if (this.nbPlace === "") {
                alert("Le nombre de place ne peut pas être vide")
                validator = false
            }

            if(isNaN(this.nbPlace)){
                alert("Le nombre de place doit être un nombre")
                validator = false
            }

            if (this.nbPlace < 0) {
                alert("Le nombre de place ne peut pas être négatif")
                validator = false
            }

            return validator

        },
        cancelEdition() {
            this.isEditing = false
            this.nomStand = this.info.nomStand
            this.descriptionStand = this.info.descriptionStand
            this.typeStand = this.info.libelleTypeStand()
            this.nbPlace = this.info.nbPlace
        }
    },
    created() {
        myaxios.get(`/stands/${this.idStand}/commentaire`)
            .then((responce) => {
                this.livreOr = responce.data.data
            })
    }
}
</script>

<style scoped>

</style>
