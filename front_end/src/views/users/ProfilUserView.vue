<template>
    <v-container>
        <h1 style="text-align: center">Bienvenue {{currentUser.pseudo}}</h1>
        <h2 style="text-align: center">Mon Profil</h2>
        <h3>Mes Informations Personnelles</h3>
        <div class="border">
            <p>Nom : {{currentUser.nom}}</p>
            <p>Prénom : {{currentUser.prenom}}</p>
            <p>Mail : {{currentUser.email}}</p>
        </div>
        <ModifierUser/>
        <br>
        <h3>Mes Reservations</h3>
        <div v-if="produitsReserves.length !== 0" style="text-align: center">
            <v-data-table :headers="header" :items="produitsReserves" />
        </div>
        <p v-else style="text-align: center">Vous n'avez reservé aucun produit.</p>
    </v-container>
</template>

<script>
import myaxios from 'axios';
import {mapState} from "vuex";
import ModifierUser from "@/components/ModifierUser.vue";

export default {
    name: 'ProfilUserView',
  components: {ModifierUser},
    computed: {
        ...mapState(['currentUser'])
    },
    data:()=>({
        produitsReserves:[],
        header:[
          {text:'Nom du produit',value:'libelleProduit'},
          {text:'Quantité',value:'quantite'}
        ]
    }),
    mounted() {
        myaxios.get("/reservations/user/" + this.currentUser.idUser)
            .then(res => {
                this.produitsReserves = res.data.data;
                console.log(this.produitsReserves);
            })
    }
}
</script>

<style scoped>

h1, h2 {
  text-align: center;
  margin: 10px 0;
}

.border {
  border: 1px solid gray;
  padding: 20px;
  margin: 20px 0;
  border-radius: 5px;
  background-color: #f2f2f2;
}

h3{
  text-align:left;
  margin: 20px 0;
}

</style>
