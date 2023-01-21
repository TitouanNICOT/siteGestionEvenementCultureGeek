<template>
    <v-container>
        <h1 style="text-align: center">Tableau de Bord Prestataire</h1>
        <h2 style="text-align: center">Bienvenue {{ currentUser.pseudo }}</h2>
        <div class="border">
            <p>Nom : {{ currentUser.nom }}</p>
            <p>Prenom : {{ currentUser.prenom }}</p>
            <p>Mail : {{ currentUser.email }}</p>
        </div>
        <div class="border">
            <h3>Liste commantaires :</h3>
            <v-btn @click="changeVue">Afficher/cacher</v-btn>
            <p v-if="commantaires.length === 0" style="text-align: center">Vous n'avez pas de commantaires</p>
            <div v-else-if="afficheCom">
                <div v-for="(stand,index) in mesStands" :key="index">
                    <h4 style="font-size: 20px">{{ stand.nomStand }}</h4>
                    <v-row v-if="commantaires.filter(c=>c.idStand===stand.id).length>0">
                        <v-col v-for="(com,index2) in commantaires.filter(c=>c.idStand===stand.id)" :key="index2"
                               cols="4">
                            <v-card class="pa-1" @click="supprimerCom(com)">{{ com.commentaire }}</v-card>
                        </v-col>
                    </v-row>
                    <p v-else>Pas de commentaire pour ce stand</p>
                    <br>
                </div>
            </div>
        </div>
        <div class="border">
            <h3>Liste des produits reservés dans boutique :</h3>
            <v-btn @click="changeVue2">Afficher/cacher</v-btn>
            <p v-if="produitsReserves.length === 0" style="text-align: center">Vous n'avez pas de produits reservés</p>
            <v-data-table v-else-if="afficheReserve" :headers="header" :items="produitsReserves"/>
        </div>
        <div class="border">
            <h3>Mes stands</h3>
            <p v-if="stands.length === 0" style="text-align: center">Vous n'avez pas de stands</p>
            <v-row v-else>
                <v-col v-for="(stand,index) in mesStands" :key="index" cols="4">
                    <v-card class="pa-3" @click="goStand(stand.id)">{{ stand.nomStand }}</v-card>
                </v-col>
            </v-row>
        </div>
        <div class="border">
            <h3>Mes Evenements</h3>
            <v-btn @click="changeVue3">Afficher/cacher</v-btn>
            <p v-if="mesEvenements.length === 0" style="text-align: center">Vous n'avez pas d'evenement</p>
            <v-data-table v-else-if="afficheEvenement" :headers="headerEvenements" :items="getAllEvenementsData()"/>
        </div>
      <div class="border">
        <p v-if="mesEvenements.length === 0" style="text-align: center">Vous n'avez pas pas d'evenement</p>
        <v-row v-else>
          <v-col v-for="(event,index) in mesEvenements" :key="index" cols="4">
            <v-card class="pa-3">{{ event.libelleEvenement }}</v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
    name: "HomePrestaView",
    computed: {
        ...mapState(['currentUser', 'stands', 'evenements', 'users']),
        mesStands() {
            return this.stands.filter(stand => stand.idPresta() === this.currentUser.idUser)
        },
        mesEvenements() {
            return this.evenements.filter(event => this.mesStands.map(s => parseInt(s.id)).includes(event.idStand))
        }
    },
    data: () => ({
        commantaires: [],
        produitsReserves: [],
        header: [
            {text: 'Nom du produit', value: 'libelleProduit'},
            {text: 'Utilisateur', value: 'idUser'},
            {text: 'Quantite', value: 'quantite'}
        ],
        afficheCom: true,
        afficheReserve: true,
        afficheEvenement: true,

      headerEvenements:[
        {text: 'Nom de l\'évenement ', value: 'libelleEvenement'},
        {text: 'Nombre de participants', value: 'nbUser'},
        {text:'Capacité maximale',value:'nbPlace'},
        {text:'Stand',value:'stand'},
        {text:'Début',value:'heureDebut'},
        {text:'Fin',value:'heureFin'}
      ]
    }),
    methods: {

        getAllEvenementsData(){
          let tab = []

          for(let i = 0; i < this.mesEvenements.length;i++){
            tab.push(this.getEvenementData(this.mesEvenements[i]))
          }

          return tab
        },

        getEvenementData(event){
          return {
            "libelleEvenement": event.libelleEvenement,
            "nbUser":event["reservations"].length,
            "stand":event.stand.nomStand,
            "nbPlace":event.stand.nbPlace,
            "heureDebut":event.heureDebut,
            "heureFin":event.heureFin
          };
        },


        goStand(idStand) {
            console.log(idStand)
            this.$router.push({name: "stand", params: {id: idStand}})
        },
        supprimerCom(com) {
            if (confirm("Voulez vous supprimer ce commentaire ? :\n"+com.commentaire)) {
                axios.delete("http://localhost:3000/stands/commentaire/" + com.idLivreOr)
                    .then(() => {
                        this.commantaires = this.commantaires.filter(c => c.idLivreOr !== com.idLivreOr)
                    })
            }
        },
        changeVue() {this.afficheCom = !this.afficheCom},
        changeVue2() {this.afficheReserve = !this.afficheReserve}
        changeVue3(){
          this.afficheEvenement = !this.afficheEvenement
        }

    },
    mounted() {
        axios.get("http://localhost:3000/users/" + this.currentUser.idUser + "/commentaire")
            .then(res => {
                this.commantaires = res.data.data
            })
        axios.get("http://localhost:3000/reservations/prestataire/" + this.currentUser.idUser)
            .then(res => {
                this.produitsReserves = res.data.data
            })
    }
}
</script>
<style scoped>
.border {
    border: 1px solid black;
    padding: 10px;
}
</style>