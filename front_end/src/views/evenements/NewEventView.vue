<template>
    <div style="margin: auto;width: 800px; padding: 10px">
        <h1 style="text-align: center">Nouvelle Evenement</h1>
        <v-form ref="form" v-model="valide">
            <v-text-field
                v-model="EventName"
                :rules="nameRule"
                :counter="10"
                label="Nom de l'évenement"
                required>
            </v-text-field>
            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                required
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="startTime"
                        label="heure de début"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        required
                    ></v-text-field>
                </template>
                <v-time-picker
                    v-model="startTime"
                    :max="endTime"
                    format="24hr"
                    @input="menu = false"
                    required
                ></v-time-picker>
            </v-menu>
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                required
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="endTime"
                        label="heure de Fin"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        required
                    ></v-text-field>
                </template>
                <v-time-picker
                    v-model="endTime"
                    :min="startTime"
                    format="24hr"
                    @input="menu2 = false"
                    required
                ></v-time-picker>
            </v-menu>
            <v-select
                v-model="eventType"
                :items="listTypeEvenement"
                label="Type d'évenement"
                required>
            </v-select>
            <v-text-field
                :value="idStand"
                label="numéro de stand"
                disabled
                required>
            </v-text-field>
            <v-btn @submit.prevent="">Valider</v-btn>
            <v-btn @click="$router.push({name: 'evenement'})"
                   color="var(--primary-color)"
                   style="color: white">
                Annuler
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import router from "@/router";
import {mapState} from "vuex";

export default {
    name: "NewEventView",
    data() {
        return {
            valide: false,
            EventName: "",
            nameRule: [
                nom => !!nom || 'Le nom de l\'évenement est requis',
            ],
            menu: false,
            menu2: false,
            startTime: null,
            endTime: null,
            eventType: null,
        }
    },
    computed: {
        ...mapState(["evenements", 'listeTypeEvenement']),
        idStand() {
            return this.$route.params.id
        },
        listTypeEvenement() {
            return this.listeTypeEvenement.map(typeEvenement => typeEvenement.libelleTypeEvenement)
        },
    },
    methods: {
        router() {
            return router
        }
    }
}
</script>

<style scoped>

</style>
