<template>
    <v-dialog v-model="show" width="700">
        <template v-slot:activator="{on, attrs}">
            <v-btn v-on="on" v-bind="attrs" color="green">Modifier</v-btn>
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

import myaxios from "@/services/axios";
import {mapState} from "vuex";

export default {
    name: "ModifierProduit",
    data() {
        return {
            show: false,
            nom: "",
            description: "",
            prix: 0,
            quantite: 0,
            typeProduit:0,
            idStand:0
        };
    },
    props: [ "idProduit"],
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
            myaxios.put("/produits", {
                libelleProduit: this.nom,
                descriptionProduit: this.description,
                prix: this.prix,
                quantite: this.quantite,
                idTypeProduit: 1,
                id: this.idProduit
            }).then(() => {
                alert("produit bien mis a jour");
                this.$emit("refresh");
                this.show = false;
            }).catch(() => {
                alert("Erreur lors de la modification du produit");
            });
        }
    },
    watch: {
        async show(newVal){
            if (newVal){
                myaxios.get(`/produits/${this.idProduit}`)
                    .then(response => {
                        console.log(response.data);
                        this.nom = response.data.data.libelleProduit;
                        this.description = response.data.data.descriptionProduit;
                        this.prix = response.data.data.prix;
                        this.quantite = response.data.data.quantite;
                        this.typeProduit = response.data.data.idTypeProduit;
                        this.idStand=response.data.data.idStand;
                    })
            }
        }
    }
};
</script>


<style>
</style>