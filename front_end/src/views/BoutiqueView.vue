<template>
    <div>
        <h1 style="text-align: center">Boutique du stand : {{ idStand }}</h1>
        <v-container>
            <v-btn @click="retourStand">Retour au stand</v-btn>
            <v-row>
                <v-col v-for="(produit,index) in listProduit" :key="index" cols="3">
                    <v-card style="height: 100%">
                        <v-card-title>{{ produit.libelleProduit }}</v-card-title>
                        <v-card-subtitle>{{ produit.type_produit.libelleTypeProduit }}</v-card-subtitle>
                        <v-card-text>{{ produit.descriptionProduit }}<br>
                            {{ produit.prix }} €
                        </v-card-text>
                        <v-card-actions>
                            <v-btn v-if="currentRole!==NONCONNECTE"
                                   :to="{ name: 'reservation', params: { idProduit: produit.idProduit, idStand: idStand } }">
                                Réserver
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE} from "@/services/roles";

export default {
    name: "BoutiqueView",
    data() {
        return {
            listProduit: [],
            NONCONNECTE
        }
    },
    computed: {
        ...mapState(["stands"]),
        ...mapGetters(["currentRole"]),
        idStand() {
            return this.$route.params.idStand;
        }
    },
    created() {
        axios.get("http://localhost:3000/boutique/" + this.idStand)
            .then(responce => {
                this.listProduit = responce.data.data
            }).catch(() => {
            this.$router.push({name: 'stands'})
            alert("Le stand n'existe pas")
        })
    },
    methods: {
        retourStand() {
            this.$router.push({name: "stand", params: {id: this.idStand}})
        }
    }
}
</script>

<style scoped>

</style>