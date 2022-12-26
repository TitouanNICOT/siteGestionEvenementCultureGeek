<template>
    <div>
        <h1 style="text-align: center">Boutique du stand : {{idStand}}</h1>
        <v-container>
            <v-btn @click="retourStand">Retour au stand</v-btn>
            <v-row>
                <v-col v-for="(produit,index) in listProduit" :key="index" cols="3">
                    <v-card style="height: 100%">
                        <v-card-title>{{produit.libelleProduit}}</v-card-title>
                        <v-card-subtitle>{{produit.type_produit.libelleTypeProduit}}</v-card-subtitle>
                        <v-card-text>{{produit.descriptionProduit}}</v-card-text>
                        <v-card-text>{{produit.prix}} €</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
    name: "BoutiqueView",
    data() {
        return {
            listProduit: [],
        }
    },
    props:{
        idStand:Number
    },
    computed:{
        ...mapState(["stands"])
    },
    created() {
        if (this.stands.find(s=>s.id===this.idStand)===undefined)
            alert("Le stand n'existe pas")
        else
            axios.get("http://localhost:3000/boutique/"+this.idStand)
                .then(responce => {
                    this.listProduit = responce.data.data
                })
    },
    methods:{
        retourStand(){
            this.$router.push({name:"stand",params:{id:this.idStand}})
        }
    }
}
</script>

<style scoped>

</style>