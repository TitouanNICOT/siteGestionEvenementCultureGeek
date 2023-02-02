<template>
    <ListeDataView :data="listePresta" :filtreInfo="filtreInfo" nomPage="Liste des prestataires">
        <template v-slot:default="{elem}">
            <v-card class="pa-3" style="height: 100%" outlined @click="goToPresta(elem.id)">
                <h3 style="text-align: center">{{ elem.nom }} {{elem.prenom}}</h3>
                <hr>
                <span>Pseudo : <strong>{{ elem.pseudo }}</strong></span>
                <br>
                <span>Id : <strong>{{elem.idUser}}</strong></span>
                <br>
                <span>Nb stands : {{stands.filter(s=>s.idPresta()===elem.idUser).length}}</span>
            </v-card>
        </template>
    </ListeDataView>
</template>

<script>
import ListeDataView from "@/components/ListeDataView";
import {mapGetters, mapState} from "vuex";
export default {
    name: "ListPresta",
    components: {ListeDataView},
    data: ()=>{
        return {
            filtreInfo: [{type:"text",label:"Nom Presta",attribut:"nom"},
                {type:"text",label:"Prenom Presta",attribut:"prenom"},
                {type:"number",label:"Identifiant Presta",attribut:"idUser"},
                {type:"text",label:"Pseudo Prestataire",attribut:"pseudo"}]
        }
    },
    computed:{
        ...mapGetters(["listePresta"]),
            ...mapState(["stands"])
    }
}
</script>

<style scoped>

</style>