<template>
    <div style="margin: auto;width: 800px; padding: 10px">
        <h1 style="text-align: center">Stand {{info.idStand}}</h1>
        <p>Nom Stand = {{info.nomStand}}</p>
        <p>Description = {{info.descriptionStand}}</p>
        <p>Information prestataire = {{info.user.nom}} {{info.user.prenom}}</p>
        <p>Type stand : {{typeStand}}</p>
        <div style="border: black 1px solid; padding: 10px">
            <h2>Livre d'or :</h2>
            <p>Liste des commentaires sur le stand</p>
            <div v-if="info.livreOr.length===0">Pas de commantaire</div>
            <v-row>
                <v-col v-for="(com,index) in info.livreOr" :key="index" cols="6">
                    <v-card class="pa-3">{{com.commentaire}}</v-card>
                </v-col>
            </v-row>
        </div>
        <br>
        <v-row style="border: black 1px solid; margin: 1px; padding: 5px">
            <v-text-field v-model="commentaire" label="Commentaire" v-on:keyup.enter="addCommentaireAction"></v-text-field>
            <v-btn @click="addCommentaireAction">Ajouter</v-btn>
        </v-row>
        <br>
        <div>
            <v-btn @click="retourCarte" >Retour à la carte</v-btn>
            <v-btn v-if="typeStand==='boutique'" @click="clickBoutique">Acceder a la boutique</v-btn>
            <v-btn v-if="typeStand==='temporaire'">Acceder au(x) événement(s)</v-btn>
        </div>
    </div>
</template>

<script>

import {addCommentaire, getStand} from "@/services/stands";

export default {
    name: "StandDetailView",
    data:()=>({
        info:{user:{},livreOr:[],type_stand:{}},
        commentaire:"",
        idStand:0
    }),
    computed:{
        typeStand(){
            return this.info.type_stand.libelleTypeStand
        }
    },
    methods:{
        retourCarte(){
            this.$router.push({name:"carte"})
        },
        clickBoutique(){
            this.$router.push({name:"boutique",params:{idStand:this.idStand}})
        },
        addCommentaireAction(){
            if (this.commentaire!=="") {
                addCommentaire(this.idStand, this.commentaire)
                    .then((responce) => {
                        if (responce.data.success === 1) {
                            this.info.livreOr.push({commentaire: this.commentaire})
                            this.commentaire = ""
                        } else
                            alert("Erreur lors de l'ajout du commentaire")
                    })
            }
        },
    },
    created() {
        this.idStand=this.$route.params.id
        getStand(this.idStand)
            .then(responce => {
                this.info=responce.data.data
            })
    }
}
</script>

<style scoped>

</style>