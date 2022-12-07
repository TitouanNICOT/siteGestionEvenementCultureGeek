<template>
    <div>
        <h1 style="text-align: center">Carte</h1>
        <div style="display: flex">
                <CarteSVG @standSelected="selectionStand" :tab-couleur="datas" :selection="modifSelection"
                          style="border: black 1px solid; width: 210mm; margin: 20px"/>
            <div v-if="idSelected!==-1"
                 style="border: black 1px solid; min-width: 300px; margin: 20px; padding: 10px; height: 500px">
                <h2 style="text-align: center">Stand : {{ idSelected }}</h2>
                <div v-if="standSelected===undefined && role==='admin'">
                    <FormStand @createStand="createStand" />
                </div>
                <div v-else>
                    <p v-for="(val,key,index) in standSelected" :key="index">{{key}} : {{val}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CarteSVG from "../components/CarteSVG.vue"
import FormStand from "@/components/formStand";
import axios from "axios";

export default {
    name: "CarteView",
    data: () => {
        return {
            standSelected: undefined,
            idSelected: -1,
            datas: [],
            modifSelection: {},
            nomStand: "",
            role:"admin"
        }
    },
    components: {FormStand, CarteSVG},
    methods: {
        selectionStand(event) {
            this.modifSelection={selected:event.id,deselected:this.idSelected}
            this.standSelected=this.datas.find(s=>s.id===event.id)
            console.log(this.standSelected)
            this.idSelected=event.id
        },
        createStand(data) {
            console.log("creation stand")
            data=Object.assign(data,{id: this.idSelected, couleur: "red"})
            this.datas.push(data)
            this.standSelected=this.datas[this.datas.length-1]
            console.log(this.datas[0])
            axios.post("http://localhost:3000/stands", data)
                .then(responce => {
                    if (responce.data.success === 1)
                        this.data = responce.data.data
                    console.log(this.data)
                })
            // console.log(this.standSelected)
        }
    },
    created() {
        axios.get("http://localhost:3000/stands")
            .then(responce => {
                if (responce.data.success === 1)
                    this.data = responce.data.data
                console.log(this.data)
            })
    }
}
</script>

<style scoped>

</style>