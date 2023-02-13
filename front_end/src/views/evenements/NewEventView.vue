<template>
    <div style="margin: auto; max-width: 800px; padding: 10px">
        <h1 style="text-align: center">Nouvelle Evenement</h1>
        <v-form ref="form" v-model="valide" lazy-validation>
            <v-text-field
                v-model="EventName"
                :rules="nameRule"
                label="Nom de l'évenement"
                required>
            </v-text-field>
            <v-datetime-picker
                label="Date et heure de début"
                v-model="startDatetime"
                date-format="dd/MM/yyyy"
                :class="additionnalValidation() ? 'error--text' : ''"
                :text-field-props="{rules:datePikerRule, required: true}"
                :date-picker-props="{min:'2023-02-01', max: getMaxDate()}"
                :time-picker-props="{format:'24hr'}"
                required>
                <template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                </template>
            </v-datetime-picker>
            <v-datetime-picker
                label="Date et heure de Fin"
                v-model="endDatetime"
                date-format="dd/MM/yyyy"
                :text-field-props="{rules:datePikerRule, required: true}"
                :date-picker-props="{min: getMinDate(), max:'2023-02-03'}"
                :time-picker-props="{format:'24hr'}"
                required>
                <template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                </template>
                <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                </template>
            </v-datetime-picker>
            <v-select
                v-model="eventType"
                :items="listTypeEvenement"
                label="Type d'évenement"
                :rules="selectRule"
                required>
            </v-select>
            <v-text-field
                :value="idStand"
                label="numéro de stand"
                disabled
                required>
            </v-text-field>
            <v-btn @click="addEvent()">Valider</v-btn>
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
import {format, compareAsc} from "date-fns";
import {mapState} from "vuex";
import {log10} from "chart.js/helpers";
import axios from "axios";

export default {
    name: "NewEventView",
    data() {
        return {
            valide: false,
            EventName: "",
            nameRule: [
                nom => !!nom || 'Le nom de l\'évenement est requis',
            ],
            datePikerRule: [
                date => !!date || 'La date de début et de fin sont requises',
            ],
            selectRule: [
                select => !!select || 'Le type d\'évenement est requis',
            ],
            menu: false,
            menu2: false,
            startDatetime: null,
            endDatetime: null,
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
        compareAsc,
        format,
        log10,
        router() {
            return router
        },
        addEvent() {

            if (this.$refs.form.validate() && this.additionnalValidation())
                axios.post('http://127.0.0.1:3000/evenements', {
                    libelleEvenement: this.EventName,
                    heureDebut: this.startDatetime,
                    heureFin: this.endDatetime,
                    idTypeEvenement: this.listeTypeEvenement.find(typeEvenement => typeEvenement.libelleTypeEvenement === this.eventType).idTypeEvenement ,
                    idStand: this.idStand
                }).then( () => {
                    alert('Évènement ajouté avec succès')
                    this.$router.push({name: 'evenement'})
                }).catch(error => {
                    console.log(error)
                })

        },
        getMinDate(){
            if (this.startDatetime){
                return format(this.startDatetime, 'yyyy-MM-dd')
            }
            return '2023-02-01'
        },
        getMaxDate(){

            if (this.endDatetime){
                return format(this.endDatetime, 'yyyy-MM-dd')
            }
            return '2023-02-03'
        },
        additionnalValidation() {
            let isValid = this.compareAsc(this.startDatetime, this.endDatetime) === -1;
            if (!isValid) {
                alert('La date de début doit être inférieure à la date de fin')
            }
            return isValid
        },
    }
}
</script>

<style>

</style>
