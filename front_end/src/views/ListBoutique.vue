<template>
    <ListeDataView :data="boutiques" :filtreInfo="filtreInfo" nomPage="Liste des boutiques">
        <template v-slot="{elem}">
            <v-card class="pa-3" style="height: 100%" outlined @click="goToBoutique(elem.id)">
                <h3 style="text-align: center;">{{ elem.nomStand }}</h3>
                <hr>
                <span>Numéro de la boutique : <strong>{{ elem.id }}</strong></span>
                <br>
                <span>Nom Prestataire : <strong>{{ elem.libellePresta() }}</strong></span>
                <br>
                <span>Pseudo Prestataire : <strong>{{ elem.user.pseudo }}</strong></span>
                <br>
                <span>Description : <strong>{{ elem.descriptionStand }}</strong></span>
                <br>
               <v-btn color="primary" @click="goToStand(elem.id)">Voir le stands</v-btn>
            </v-card>
        </template>
    </ListeDataView>
</template>

<script>
import ListeDataView from "@/components/ListeDataView";
import {mapState} from "vuex";
export default {
    name: "ListBoutique",
    components: {ListeDataView},
    data: ()=>{
        return {
            filtreInfo: [{type: "text", label: "Nom",attribut: "nomStand"},
                {type: "text", label: "Description",attribut: "descriptionStand"},
                {type:"text",label:"Prestataire",attribut:"libellePresta"}]
        }
    },
    computed:{
        ...mapState(["stands"]),
        boutiques(){
            return this.stands.filter(stand => stand.typeStand.idTypeStand === 1);//=boutique
        }
    },
    methods: {
        goToBoutique(num) {
            this.$router.push({name: 'boutique', params: {idStand: num}})
        },
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        }
    },
}
</script>

<style scoped>

</style>