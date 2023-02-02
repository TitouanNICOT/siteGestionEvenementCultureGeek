<template>
    <ListeDataView :data="evenements" :filtreInfo="filtreInfo" nomPage="Liste des evenements">
        <template v-slot:default="{elem}">
                <v-card class="pa-3" outlined @click="goToEvent(elem.idEvenement)" v-if="elem.stand">
                    <h3 style="text-align: center;">{{ elem.libelleEvenement }}</h3>
                    <hr>
                    <span>Type d'événement : <strong>{{ elem.getLibelleTypeEvenement() }}</strong></span>
                    <br>
                    <span>Numéro du stand : <strong>{{ elem.idStand }}</strong></span>
                    <br>
                    <span>Type de stand : <strong>{{ elem.stand.libelleTypeStand() }}</strong></span>
                    <br>
                    <span>Nom du stand : <strong>{{ elem.getNomStand() }}</strong></span>
                    <br>
                    <span>Description stand : <strong>{{ elem.stand.descriptionStand }}</strong></span>
                    <br>
                    <br>
                    <v-btn @click="goToStand(elem.idStand)">Voir Stand</v-btn>
                </v-card>
        </template>
    </ListeDataView>
</template>

<script>

import {mapState} from "vuex";
import ListeDataView from "@/components/ListeDataView";

export default {
    name: "EvenementView",
    components: {ListeDataView},
    data: () => {
        return {
            filtreInfo: [{type: "text", label: "Nom", attribut: "libelleEvenement"},
                {type: "select", label: "Type", attribut: "getLibelleTypeEvenement",
                    items: ["tournois", "conférence", "spectacle"]},
                {type: "text", label: "Stand", attribut: "getNomStand"}]
        }
    },
    computed: {
        ...mapState(["evenements"]),
        ...mapState(["listeTypeStand"]),
    },
    methods: {
        goToEvent(num) {
            this.$router.push({name: "evenementById", params: {id: num}})
        },
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        }
    }
}

</script>

<style scoped>

</style>