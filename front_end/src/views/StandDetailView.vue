<template>
    <div style="margin: auto;width: 800px; padding: 10px">
        <h1 style="text-align: center">Stand {{info.idStand}}</h1>
        <p>Nom Stand = {{info.nomStand}}</p>
        <p>Description = {{info.descriptionStand}}</p>
        <p>Information prestataire = {{info.user.nom}} {{info.user.prenom}}</p>
        <div style="border: black 1px solid">
            <h3>Livre d'or :</h3>
            <p>Liste des commentaires sur le stand</p>
            <div v-if="info.livreOr.length===0">Pas de commantaire</div>
            <v-card v-for="(com,index) in info.livreOr" :key="index" width="45%">{{com.commentaire}}</v-card>
        </div>
        <br>
        <v-row style="border: black 1px solid">
            <v-text-field v-model="commentaire" label="Commentaire"></v-text-field>
            <v-btn @click="addCommentaire">Ajouter un commentaire</v-btn>
        </v-row>
        <br>
        <div>
            <v-btn @click="retourCarte" >Retour à la carte</v-btn>
            <v-btn>Acceder a la boutique</v-btn>
            <v-btn>Acceder au(x) événement(s)</v-btn>
        </div>
    </div>
</template>

<script>
import standsS from "../services/stands";

export default {
    name: "StandDetailView",
    data:()=>({
        info:{user:{},livreOr:[]},
        commentaire:"",
        idStand:0
    }),
    methods:{
        retourCarte(){
            this.$router.push({name:"carte"})
        },
        addCommentaire(){
            if (this.commentaire!=="") {
                standsS.addCommentaire(this.idStand, this.commentaire)
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
        standsS.getStand(this.idStand)
            .then(responce => {
                this.info=responce.data.data
            })
    }
}
</script>

<style scoped>

</style>