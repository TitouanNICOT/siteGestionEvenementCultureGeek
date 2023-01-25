<template>
    <div style="margin: auto;width: 800px; padding: 10px" v-if="info">
        <h1 style="text-align: center">Stand {{ info.idStand }}</h1>
        <p>Nom Stand = {{ info.nomStand }}</p>
        <p>Description = {{ info.descriptionStand }}</p>
        <p>Information prestataire = {{ info.libellePresta() }}</p>
        <p>Type stand : {{ info.libelleTypeStand() }}</p>
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
        <div style="border: black 1px solid; margin: 1px; padding: 5px" v-if="info.listEvenement.length!==0">
            <h2>Liste des evenements sur le stand : </h2>
            <v-row>
                <v-col v-for="(event,index) in info.listEvenement" :key="index" cols="4">
                    <v-card class="pa-3" @click="goToEvent(event.idEvenement)">{{ event.libelleEvenement }}</v-card>
                </v-col>
            </v-row>
        </div>
        <br>
        <div>
            <v-btn @click="retourCarte">Retour à la carte</v-btn>
            <v-btn v-if="info.libelleTypeStand()==='boutique'" @click="clickBoutique">Acceder a la boutique</v-btn>
            <v-btn @click="infoPresta(info.user.idUser)">Informations du Prestataires</v-btn>
        </div>
    </div>
</template>

<script>

import {addCommentaire} from "@/services/stands";
import {mapState} from "vuex";
import axios from "axios";

export default {
    name: "StandDetailView",
    data: () => ({
        commentaire: "",
        livreOr: []
    }),
    computed: {
        ...mapState(["evenements","stands"]),
        idStand(){return this.$route.params.id},
        info(){
            return this.stands.find(stand => stand.id === parseInt(this.idStand))
        }
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
                addCommentaire(this.idStand, this.commentaire)
                    .then((responce) => {
                        if (responce.data.success === 1) {
                            this.livreOr.push({commentaire: this.commentaire})
                            this.commentaire = ""
                        } else
                            alert("Erreur lors de l'ajout du commentaire")
                    })
            }
        },
      infoPresta(id){
          this.$router.push("/infosPresta/"+id)
      },
        goToEvent(id){
            this.$router.push("/evenement/"+id)
        }
    },
    created() {
        axios.get(`http://localhost:3000/stands/${this.idStand}/commentaire`)
            .then((responce) => {
                this.livreOr = responce.data.data
            })
    }
}
</script>

<style scoped>

</style>