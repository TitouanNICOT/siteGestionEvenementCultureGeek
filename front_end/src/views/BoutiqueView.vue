<template>
    <div>
        <h1 style="text-align: center">Boutique du stand : {{ idStand }}</h1>
        <v-container>
            <v-row>
                <v-btn @click="retourStand" color="yellow">Retour au stand</v-btn>
                <AjouterProduit :idStand="idStand" v-if="currentRole===PRESTA" @refresh="refresh"/>
            </v-row>
            <v-row>
                <v-col v-for="(produit,index) in listProduit" :key="index" cols="3">
                    <v-card style="height: 100%">
                        <v-card-title> {{produit.libelleProduit}}</v-card-title>
                        <v-card-subtitle>{{produit.type_produit.libelleTypeProduit}}</v-card-subtitle>
                        <v-card-text>{{produit.prix}} €</v-card-text>
                        <v-card-actions>
                            <span>Stock : {{produit.quantite}}</span>
                            <v-spacer></v-spacer>
<!--                            <v-btn :to="{ name: 'reservation', params: { idProduit: produit.idProduit, idStand: idStand } }">Afficher plus</v-btn>-->
                            <ModiferProduit :idProduit="produit.idProduit" v-if="currentRole===PRESTA" @refresh="refresh"/>
                            <DetailProduit :idProduit="produit.idProduit" :idStand="idStand" @refresh="refresh"/>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>

<script>
import myaxios from "@/services/axios";
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE, PRESTA} from "@/services/roles";
import DetailProduit from "@/components/boutique/DetailProduit";
import AjouterProduit from "@/components/boutique/AjouterProduit";
import ModiferProduit from "@/components/boutique/ModiferProduit";

export default {
    name: "BoutiqueView",
    components: {DetailProduit,AjouterProduit,ModiferProduit},
    data() {
        return {
            listProduit: [],
            NONCONNECTE,
            PRESTA
        }
    },
    computed: {
        ...mapState(["stands"]),
        ...mapGetters(["currentRole"]),
        idStand() {
            return this.$route.params.idStand;
        }
    },
    methods: {
        retourStand() {
            this.$router.push({name: "stand", params: {id: this.idStand}})
        },
        refresh(){
            myaxios.get("/boutique/" + this.idStand)
                .then(responce => {
                    this.listProduit = responce.data.data
                }).catch(() => {
                this.$router.push({name: 'stands'})
                alert("Le stand n'existe pas")
            })
        }
    },
    created() {
        this.refresh()
    }
}
</script>

<style scoped>

</style>