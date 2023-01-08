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
          idUser: "1",
          idProduit: idProduit
        });
        console.log(response);
        alert('Votre réservation a bien été enregistrée');
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'enregistrement de votre réservation');
      }
    }
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