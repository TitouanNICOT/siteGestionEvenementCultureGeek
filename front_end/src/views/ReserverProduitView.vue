<template>
    <div>
        <v-container>
            <h1 style="text-align: center">{{produit.libelleProduit}}</h1>
            <p>Type : {{produit.type_produit.libelleTypeProduit}}</p>
            <p>Description : {{produit.descriptionProduit}}</p>
            <p>Prix : {{produit.prix}} €</p>
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
        </v-container>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import {NONCONNECTE} from "@/services/roles";

export default {
    name: "ReserverProduitView",
    props: ["idProduit", "idStand"],
    data() {
        return {
            quantite: 0,
            idProduct: this.$route.params.idProduit,
            produit:{type_produit:{}},
            NONCONNECTE
        };
    },
    computed: {
        ...mapState(["currentUser"]),
        ...mapGetters(["currentRole"])
    },
    methods: {
        async makeReservation() {
            await this.saveReservation(this.idProduct, this.quantite);

            console.log("quantite", this.quantite);
            console.log("idProduit", this.idProduct);
            console.log("idStand", this.$route.params.idStand);

            await this.$router.push({name: 'boutique', params: {idStand: this.$route.params.idStand}});
        },
        async saveReservation(idProduit, quantite) {
            try {
                const response = await axios.post(`http://localhost:3000/reservations/`, {
                    quantite: quantite,
                    idUser: this.currentUser.idUser,
                    idProduit: idProduit
                });
                console.log(response);
                alert('Votre réservation a bien été enregistrée');
            } catch (error) {
                console.error(error);
                alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
            }
        }
    },
    created() {
        axios.get(`http://localhost:3000/produits/${this.idProduct}`)
            .then(response => {
                console.log(response.data);
                this.produit = response.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
};
</script>


<style>

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