<template>
    <div>
        <h1 style="text-align: center">Boutique du stand : {{ idStand }}</h1>
        <v-container>
            <v-row>
                <v-btn @click="retourStand" color="yellow">Retour au stand</v-btn>
                <AjouterProduit :idStand="idStand" v-if="currentRole===PRESTA"/>
            </v-row>
            <ListeDataView :filtreInfo="filtreInfo" :data="listProduit" @refresh="refresh">
                <template v-slot:default="{elem}">
                    <v-card style="height: 100%">
                        <v-card-title> {{elem.libelleProduit}}</v-card-title>
                        <v-card-subtitle>{{elem.type_produit.libelleTypeProduit}}</v-card-subtitle>
                        <v-card-text>{{elem.prix}} €</v-card-text>
                        <v-card-actions>
                            <span>Stock : {{elem.quantite}}</span>
                            <v-spacer></v-spacer>
<!--                            <v-btn :to="{ name: 'reservation', params: { idProduit: elem.idProduit, idStand: idStand } }">Afficher plus</v-btn>-->
                            <ModiferProduit :idProduit="elem.idProduit" v-if="currentRole===PRESTA" @refresh="refresh"/>
                            <DetailProduit :idProduit="elem.idProduit" :idStand="idStand" @refresh="refresh"/>
                        </v-card-actions>
                    </v-card>
                </template>
            </ListeDataView>
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
import ListeDataView from "@/components/ListeDataView";

export default {
    name: "BoutiqueView",
    components: {ListeDataView, DetailProduit,AjouterProduit,ModiferProduit},
    data() {
        return {
            listProduit: [],
            filtreInfo: [{type: "text", label: "Nom", attribut: "libelleProduit"},
                {type: "text", label: "Description", attribut: "descriptionProduit"},
                {type: "select", label: "Type de produit", attribut: "libelleTypeProduit",
                    items: ["Nourriture", "Boisson", "Vêtement", "Accessoire","Poster","Livre"]},
                {type: "text", label: "Prix", attribut: "prix"}],
            NONCONNECTE, PRESTA
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
                    this.listProduit = responce.data.data.map(elem => {return {
                        ...elem,
                        libelleTypeProduit:  elem.type_produit.libelleTypeProduit
                    }});
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