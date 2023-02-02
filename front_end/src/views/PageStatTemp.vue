<template>
    <v-container>
        <h1> Page de stat</h1>
        <v-row>
            <v-col cols="6">
                <span>Nombre de produit vendu :</span>
                <PieChart :donnee="dataPie.data" :color="['#1e3d59','#f5f0e1','#ff6e40','#ffc13b']" :label="dataPie.label" height="90%"/>
            </v-col>
            <v-col cols="6">
                <BarChart :donnee="[{data:dataBar1.data,label:'Nombre de reservation par événements',backgroundColor:'#1e3d59' }]" :labels="dataBar1.label" height="300px"/>

                <BarChart :donnee="[{data:dataBar2.data,label:'Nombre de commentaire par stand',backgroundColor:'#ffc13b' }]" :labels="dataBar2.label" height="300px"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from "vuex";
import PieChart from "@/components/graph/PieChart";
import BarChart from "@/components/graph/BarChart";
import {Chart as ChartJS, registerables} from 'chart.js'
import myaxios from "@/services/axios";

ChartJS.register(...registerables)

export default {
    name: "PageStatTemp",
    components: {PieChart,BarChart},
    data: () => ({
      produitsReserves: [],
      reservationEvenement: [],
      commantaires: [],
    }),
    computed: {
        ...mapState(['stands','listeTypeStand','currentUser','evenements']),
        dataPie(){
            let data = [];
            let label = [];
            console.log(this.produitsReserves)
            console.log(this.currentUser.idUser)
            this.produitsReserves.forEach(produit => {
                if (label.includes(produit.libelleProduit)){
                    data[label.indexOf(produit.libelleProduit)] += produit.quantite;
                }else {
                  data.push(produit.quantite);
                  label.push(produit.libelleProduit);
                }
            });
            return {data,label};
        },
        dataBar1(){
            let data = [];
            let label = []
            this.mesEvenements.forEach(event => {
                data.push(this.reservationEvenement.filter(r=>r.idEvenement===event.idEvenement).length);
                label.push(event.libelleEvenement);
            });
            return {data,label};
        },
        dataBar2(){
            let data = [];
            let label = []
            this.commantaires.forEach(comm => {
              if (label.includes(comm.idStand)){
                data[label.indexOf(comm.idStand)] += 1;
              }
              else {
                data.push(1);
                label.push(comm.idStand);
              }
            });
            return {data,label};
        },
        mesEvenements() {
          return this.evenements.filter(event => this.mesStands.map(s => parseInt(s.id)).includes(event.idStand))
        },
      mesStands() {
        return this.stands.filter(stand => stand.idPresta() === this.currentUser.idUser)
      },
    },
    mounted() {
      myaxios.get("/users/" + this.currentUser.idUser + "/commentaire")
          .then(res => {
            this.commantaires = res.data.data
          })
      myaxios.get("/reservations/prestataire/" + this.currentUser.idUser)
          .then(res => {
            this.produitsReserves = res.data.data
          })
      myaxios.get("/evenements/reservation")
          .then(res => {
            this.reservationEvenement = res.data.data
          })
    }
}
</script>

<style scoped>

</style>