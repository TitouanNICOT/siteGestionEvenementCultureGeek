<template>
    <v-dialog v-model="show" width="700">
        <template v-slot:activator="{on, attrs}">
            <v-btn v-on="on" v-bind="attrs" color="green">Creer Produit</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <h1 style="margin: auto">Creer produit dans le stand {{idStand}}</h1>
            </v-card-title>
            <v-card-text>
                <v-text-field  label="NomProduit" v-model="nom"></v-text-field>
                <v-select label="Type Produit" :items="listeTypeProduit" item-text="libelleTypeProduit" item-value="idTypeProduit"
                          v-model="typeProduit"></v-select>
                <v-textarea label="Description" v-model="description"></v-textarea>
                <v-text-field label="Prix" v-model="prix" type="number"></v-text-field>
                <v-text-field label="Quantite" v-model="quantite" type="number"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="creer" color="green">Valider</v-btn>
                <v-btn @click="show=false" color="red">Annuler</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import axios from "axios";
import {mapState} from "vuex";

export default {
    name: "ReserverProduitView",
    data() {
        return {
            show: false,
            nom: "",
            description: "",
            prix: 0,
            quantite: 0,
            typeProduit:0
        };
    },
    props: [ "idStand"],
    computed:{
        ...mapState(["listeTypeProduit"])
    },
    methods: {
        creer(){
            if (this.nom === "" || this.description === "" || this.prix === 0 || this.quantite === 0) {
                alert("Veuillez remplir tous les champs"); return;
            }
            if(this.prix < 0 || this.quantite < 0){
                alert("Veuillez entrer des valeurs positives");return;
            }
            axios.post("http://localhost:3000/produits", {
                libelleProduit: this.nom,
                descriptionProduit: this.description,
                prix: this.prix,
                quantite: this.quantite,
                idStand: this.idStand,
                idTypeProduit: 1
            }).then(() => {
                alert("produit bien ajouté");
                this.$emit("refresh");
                this.show = false;
            }).catch(() => {
                alert("Erreur lors de la création du produit");
            });
        }
    }
};
</script>


<style>
</style>