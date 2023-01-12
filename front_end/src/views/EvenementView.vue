<template>
    <div>
        <div style="text-align: center; margin: 10px;width: auto; padding: 10px">
            <h1 style="text-align: center">Liste Evenement</h1>
        </div>
        <div>
            <v-col class="d-flex" cols="12" sm="6">
                <v-text-field style="margin-right: 10px" label="libelle d'Evenement" outlined v-model="inputFilter"/>
                <v-select style="margin-right: 10px" label="Type d'Evenement" :items="listTypeEvenement" outlined
                          v-model="typeEvenement"></v-select>
                <v-btn style="margin-top: 10px" cols="4" sm="4" color="red" @click="typeEvenement = '' ">X</v-btn>
            </v-col>
        </div>
        <v-row class="mx-5">
            <v-col v-for="(elem,index) in evenementsfiltre" :key="index" cols="3">
                <v-card class="pa-3">
                    <h3 style="text-align: center;">{{ elem.libelleEvenement }}</h3>
                    <hr>
                    <span>Type d'événement : <strong>{{ elem.type_evenement.libelleTypeEvenement }}</strong></span>
                    <br>
                    <span>Numéro du stand : <strong>{{ elem.idStand }}</strong></span>
                    <br>
                    <span>Type de stand : <strong>{{
                            listeTypeStand[(elem.stand.idTypeStand) - 1].libelleTypeStand
                        }}</strong></span>
                    <br>
                    <span>Nom du stand : <strong>{{ elem.stand.nomStand }}</strong></span>
                    <br>
                    <span>Description stand : <strong>{{ elem.stand.descriptionStand }}</strong></span>
                    <br>
                    <br>
                    <v-btn @click="goToStand(elem.idStand)">Voir Stand</v-btn>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>

import {mapState} from "vuex";

export default {
    name: "EvenementView",
    data: () => {
        return {
            evenement: [],
            inputFilter: "",
            typeEvenement: '',
        }
    },
    computed: {
        ...mapState(["evenements"]),
        ...mapState(["listeTypeStand"]),
        evenementsfiltre() {
            return this.evenements.filter(elem => this.verifFiltre(elem))
        },
        listTypeEvenement() {
            return this.evenements.map(elem => elem.type_evenement.libelleTypeEvenement)
        }
    },
    methods: {
        goToStand(num) {
            this.$router.push({name: 'stand', params: {id: num}})
        },
        verifFiltre(elem) {
            if (this.inputFilter === "" && this.typeEvenement === '') {
                return true
            } else {
                let libelle = elem.libelleEvenement.toLowerCase().includes(this.inputFilter.toLowerCase())
                let type = elem.type_evenement.libelleTypeEvenement.toLowerCase().includes(this.typeEvenement.toLowerCase())
                return libelle && type;
            }
        }
    }
}

</script>

<style scoped>

</style>