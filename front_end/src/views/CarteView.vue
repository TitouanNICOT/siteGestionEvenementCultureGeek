<template>
    <div style="display: flex">
        <CarteSVG @standSelected="selectionStand" @deselection="deselection" :tab-couleur="stands"
                  :selection="modifSelection"
                  style="border: black 1px solid; width: 210mm; margin: 20px"/>

        <div style="width: 100%; min-width: 300px">
            <h1 style="text-align: center">Carte</h1>
            <p v-if="idSelected===-1" style="margin: 20px; font-size: 30px">
                Cliquez sur une salle puis sur un stand pour voir les informations
            </p>
            <div v-else style="border: black 1px solid; margin: 20px; padding: 10px">
                <h2 style="text-align: center">Stand : {{ idSelected }}</h2>
                <div v-if="standSelected===undefined">
                    <FormStand v-if="currentRole===ADMIN" @createStand="createStand"/>
                    <p v-else>Ce stand n'existe pas</p>
                </div>
                <div v-else>
                    <p v-for="(val,key,index) in standSelected" :key="index">
                        <span v-if="liste.includes(key)">{{ key }} : {{ val }}</span>
                    </p>
                    <p>Nom prestataire : {{ standSelected.libellePresta() }}</p>
                    <p>Type stand : {{ standSelected.libelleTypeStand() }}</p>
                    <v-btn color="blue" @click="voirStand">Voir Plus</v-btn>
                    <v-btn color="red" @click="supprimerStand" v-if="currentRole===ADMIN">Supprimer</v-btn>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import CarteSVG from "../components/CarteSVG.vue"
import FormStand from "@/components/formStand";
import axios from "axios";
import {mapGetters, mapMutations, mapState} from "vuex";
import {ADMIN} from "@/services/roles";
import {deleteStand, Stand} from "@/services/stands";

export default {
    name: "CarteView",
    data: () => {
        return {
            standSelected: undefined,
            idSelected: -1,
            modifSelection: {},
            ADMIN,
            liste: ["nomStand", "descriptionStand"]
        }
    },
    computed: {
        ...mapState(["stands"]),
        ...mapGetters(["listePresta", "currentRole", "currentTokenUser"])
    },
    components: {FormStand, CarteSVG},
    methods: {
        ...mapMutations(["addStand"]),
        selectionStand(event) {
            console.log(this.stands)
            if (event.id === this.idSelected)
                this.deselection()
            else {
                this.modifSelection = {selected: event.id, deselected: this.idSelected}
                this.standSelected = this.stands.find(s => s.id === event.id)
                this.idSelected = event.id
            }
        },
        survolStand(event) {
            if (event.id !== this.idSelected && this.stands.find(s => s.id === event.id) !== undefined)
                this.selectionStand(event)
        },
        deselection() {
            this.modifSelection = {deselected: this.idSelected}
            this.standSelected = undefined
            this.idSelected = -1
        },
        supprimerStand() {
            deleteStand(this.idSelected)
                .then(responce => {
                    if (responce.data.success === 1) {
                        console.log(this.idSelected)
                        this.$store.commit("removeStand", this.idSelected)
                        document.getElementById(this.idSelected).style.fill = "black"
                        console.log(document.getElementById(this.idSelected))
                        this.deselection()
                        console.log(this.stands)
                    }
                })
        },
        createStand(data) {
            console.log("creation stand")
            data.id = this.idSelected
            axios.post("http://localhost:3000/stands", data,
                {headers: {authorization: this.currentTokenUser}}
            ).then(responce => {
                console.log(responce.data)
                if (responce.data.success === 1) {
                    this.standSelected = Stand.fromAPI(responce.data.data)
                    this.addStand(this.standSelected)
                }
                // alert(responce.data.success)
            })
        },
        voirStand() {
            this.$router.push({name: "stand", params: {id: this.idSelected}})
        }
    }
}
</script>

<style scoped>

</style>