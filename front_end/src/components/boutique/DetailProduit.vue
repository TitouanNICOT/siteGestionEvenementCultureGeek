<template>
    <v-dialog v-model="showDetail" width="700">
        <template v-slot:activator="{on, attrs}">
            <v-btn v-on="on" v-bind="attrs" color="blue">Detail</v-btn>
        </template>
        <v-card>
           <v-card-title>
                <h1 style="margin: auto">{{produit.libelleProduit}}</h1>
           </v-card-title>
           <v-card-text>
                <p>Type : {{produit.type_produit.libelleTypeProduit}}</p>
                <p>Description : {{produit.descriptionProduit}}</p>
                <p>Prix : {{produit.prix}} €</p>
                <p>Stock Restant : {{produit.quantite}}</p>
                <div style="border: black 1px solid">
                    <form class="form" @submit.prevent="makeReservation" v-if="currentRole!==NONCONNECTE">
                        <h2>Reserver le produit : </h2>
                        <label for="quantite">Quantité :
                            <v-text-field v-model.number="quantite" id="quantite" required class="mx-3"/>
                        </label>
                        <button type="submit">Réserver</button>
                    </form>
                    <h3 v-else style="text-align: center">Vous devez être connecté pour réserver un produit</h3>
                </div>
            </v-card-text>
           <v-card-actions>
               <v-spacer></v-spacer>
                <v-btn v-if="currentRole===PRESTA" color="red" @click="supprimer">Supprimer</v-btn>
               <v-btn @click="showDetail=false">Fermer</v-btn>
           </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE, PRESTA} from "@/services/roles";

export default {
    name: "DetailProduit",
    props: ["idProduit", "idStand"],
    data() {
        return {
            quantite: 0,
            produit:{type_produit:{}},
            NONCONNECTE,PRESTA,
            showDetail: false
        };
    },
    computed: {
        ...mapState(["currentUser"]),
        ...mapGetters(["currentRole"])
    },
    methods: {
        async makeReservation() {
            if (this.quantite<=0) {
                alert("La quantité doit être supérieure à 0")
                return;
            }
            if (this.quantite>this.produit.quantite) {
                alert("Pas de stock suffisant")
                return;
            }
            try {
                const response = await axios.post(`http://localhost:3000/reservations/`, {
                    quantite: this.quantite,
                    idUser: this.currentUser.idUser,
                    idProduit: this.idProduit
                });
                console.log(response);
                alert('Votre réservation a bien été enregistrée');
                this.showDetail = false;
                this.$emit("refresh");
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
            }
        },
        supprimer(){
            if (confirm("Etes-vous sur de supprimer le produit ?")) {
                axios.delete(`http://localhost:3000/produits/${this.idProduit}`)
                    .then(() => {
                        alert("Le produit a bien été supprimé");
                        this.showDetail = false;
                        this.$emit("refresh");
                    })
                    .catch(() => {
                        alert("Une erreur est survenue lors de la suppression du produit");
                    })
            }
        }
    },
    watch: {
        async showDetail(newVal){
            if (newVal){
                axios.get(`http://localhost:3000/produits/${this.idProduit}`)
                    .then(response => {
                        console.log(response.data);
                        this.produit = response.data.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
};
</script>


<style scoped>

.form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    /*border: 1px solid lightgrey;*/
    /*border-radius: 5px;*/
    padding: 20px;
}

.form label {
    display: block;
    margin-bottom: 10px;
}

.form label[for="quantite"] {
    font-weight: bold;
    margin: 15px;
}

.form button {
    background-color: #4caf50;
    color: white;
    font-size: 16px;
    margin: 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.form button:hover {
    background-color: #3e8e41;
}

</style>