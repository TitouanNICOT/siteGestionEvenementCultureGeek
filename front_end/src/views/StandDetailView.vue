<template>
    <div style="margin: auto;width: 800px; padding: 10px">
        <h1 style="text-align: center">Stand {{info.idStand}}</h1>
        <p>Nom Stand = {{info.nomStand}}</p>
        <p>Description = {{info.descriptionStand}}</p>
        <p>Information prestataire = {{info.user.nom}} {{info.user.prenom}}</p>
        <div>
            <h3>Livre d'or :</h3>
            <p>Liste des commentaires sur le stand</p>
            <div v-if="info.livreOr.length===0">Pas de commantaire</div>
            <v-card v-for="(com,index) in info.livreOr" :key="index" width="50%">{{com.commentaire}}</v-card>
        </div>
        <br>
        <div>
            <v-btn @click="retourCarte" >Retour à la carte</v-btn>
            <v-btn>Acceder a la boutique</v-btn>
            <v-btn>Acceder au(x) événement(s)</v-btn>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "StandDetailView",
    data:()=>({
        info:{user:{},livreOr:[]}
    }),
    methods:{
        retourCarte(){
            this.$router.push({name:"carte"})
        }
    },
    created() {
        axios.get("http://localhost:3000/stands/" + this.$route.params.id)
            .then(responce => {
                console.log(responce.data.data)
                this.info=responce.data.data
            })
    }
}
</script>

<style scoped>

</style>