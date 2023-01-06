<!--<template>-->
<!--  <form>-->
<!--    <label>Quantité de produits à réserver :</label>-->
<!--    <input v-model="quantite" type="number" min="1" required />-->
<!--    <br />-->
<!--    <label>Identifiant du produit à réserver :</label>-->
<!--    <input v-model="idProduit" type="text" required />-->
<!--    <br />-->
<!--    <button @click.prevent="makeReservation">Réserver</button>-->
<!--  </form>-->
<!--</template>-->
<template>
  <form class="form" @submit.prevent="makeReservation">
    <label for="quantite">Quantité de produits à réserver :</label>
    <input type="number" v-model.number="quantite" id="quantite" required />
    <button type="submit">Réserver</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "ReserverProduitView",
  props: ["idProduit", "idStand"],
  data() {
    return {
      quantite: 0,
      idProduct: this.$route.params.idProduit
    };
  },
  methods: {
    async makeReservation() {
      // Vérifier si la quantité de produits est disponible
      // const available = await checkAvailability(this.idProduit, this.quantite);
      // if (!available) {
      //   Afficher un message d'erreur si la quantité de produits n'est pas disponible
      //   this.showError('La quantité de produits demandée n\'est pas disponible');
        // return;
      // }

      // Enregistrer la réservation en mettant à jour la base de données
      await this.saveReservation(this.idProduct, this.quantite);

      // Afficher un message de confirmation
      // this.showConfirmation('Votre réservation a bien été enregistrée');

      console.log("quantite", this.quantite);
      console.log("idProduit", this.idProduct);
      console.log("idStand", this.$route.params.idStand);

      // Rediriger vers la boutique
      await this.$router.push({name: 'boutique', params: {idStand: this.$route.params.idStand}});
    },
    async saveReservation(idProduit, quantite) {
      try {
        const response = await axios.post(`http://localhost:3000/reservations/`, {
          quantite: quantite,
          idUser: "1",
          idProduit: idProduit
        });
        console.log(response);
        this.showConfirmation('Votre réservation a bien été enregistrée');
      } catch (error) {
        console.error(error);
        this.showError('Une erreur est survenue lors de l\'enregistrement de votre réservation');
      }
    },
    showError(message) {
      // Afficher le message d'erreur à l'utilisateur
      alert(message);
    },
    showConfirmation(message) {
      // Afficher le message de confirmation à l'utilisateur
      alert(message);
    },
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