<template>
    <div style="display: flex">
        <CarteSVG @standSelected="selectionStand" @deselection="deselection" :tab-couleur="stands" :selection="modifSelection"
                  style="border: black 1px solid; width: 210mm; margin: 20px"/>

        <div style="width: 100%; min-width: 300px">
            <h1 style="text-align: center">Carte</h1>
            <p v-if="idSelected===-1" style="margin: 20px; font-size: 30px">
                Cliquez sur une salle puis sur un stand pour voir les informations
            </p>
            <div v-else style="border: black 1px solid; margin: 20px; padding: 10px">
                <h2 style="text-align: center">Stand : {{ idSelected }}</h2>
                <div v-if="standSelected===undefined && role==='admin'">
                    <FormStand @createStand="createStand" />
                </div>
                <div v-else>
                    <p v-for="(val,key,index) in standSelected" :key="index">{{key}} : {{val}}</p>
                    <v-btn color="blue" @click="voirStand">Voir Plus</v-btn>
                    <v-btn color="red" @click="supprimerStand">Supprimer</v-btn>
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
import standsS from "@/services/stands";

export default {
    name: "CarteView",
    data: () => {
        return {
            standSelected: undefined,
            idSelected: -1,
            modifSelection: {},
            role:"admin",
        }
    },
    computed:{
        ...mapState(["stands"]),
        ...mapGetters(["listePresta"])
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
        deselection(){
            this.modifSelection={deselected:this.idSelected}
            this.standSelected=undefined
            this.idSelected=-1
        },
        supprimerStand(){
            standsS.deleteStand(this.idSelected)
                .then(responce=>{
                    if (responce.data.success===1){
                        this.$store.commit("removeStand",this.idSelected)
                        document.getElementById(this.idSelected).style.fill="black"
                        this.deselection()
                    }
                })
        },
        createStand(data) {
            console.log("creation stand")
            data=Object.assign(data,{id: this.idSelected, couleur: "red"})
            // data.prestataire=d.user.nom+" "+d.user.prenom
            axios.post("http://localhost:3000/stands", data)
                .then(responce => {
                    alert(responce.data.success)
                })
            const presta=this.listePresta.find(p=>p.idUser===data.prestataire)
            data.prestataire=presta.nom+" "+presta.prenom
            this.addStand(data)
            this.standSelected=data
            console.log(this.standSelected)
        },
        voirStand(){
            this.$router.push({name:"stand",params:{id:this.idSelected}})
        }
    }
}
</script>

<style scoped>

</style>