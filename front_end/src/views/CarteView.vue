<template>
    <div>
        <h1 style="text-align: center">Carte</h1>
        <div style="display: flex">
            <div style="width: 210mm; margin: 20px">
                <CarteSVG @standSelected="action" :tabCouleur="data" :modif-etat="indexSelected"
                          style="border: black 1px solid"></CarteSVG>
            </div>
            <div v-if="standSelected!==undefined"
                 style="border: black 1px solid; min-width: 300px; margin: 20px; padding: 10px; height: 500px">
                <h2 style="text-align: center">Stand : {{ standSelected.id }}</h2>
                <div v-if="newStand">
                    ...<br>
                    ...<br>
                    <v-btn color="grey" @click="createStand">Creer Stand</v-btn>
                </div>
                <div v-else>
                    <p>Id : {{ standSelected.id }}</p>
                    <p>Etat : {{ standSelected.couleur }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CarteSVG from "../components/CarteSVG.vue"

export default {
    name: "CarteView",
    data: () => {
        return {
            standSelected: undefined,
            indexSelected: -1,
            data: [],
            newStand: false
        }
    },
    components: {CarteSVG},
    methods: {
        action(event) {
            console.log("newStand : " + this.newStand)
            if (this.newStand) {
                this.standSelected.couleur = "black"
            }

            let index = this.data.findIndex(stand => stand.id === event.id)
            if (index === -1) {
                this.newStand = true
                index = this.data.length
                this.data.push({id: event.id, couleur: ""})
            } else if (this.data[index].couleur === "black")
                this.newStand = true

            let couleur = this.newStand ? "green" : "red"
            this.data.splice(index, 1, {id: event.id, couleur: couleur})

            console.log("aa", this.data.map(stand => stand.id))
            // this.elemActu = {id: event.id, couleur: this.tabCouleur[event.id]}
            this.standSelected = this.data.find(s => s.id === event.id);
            this.indexSelected = index;
        },
        createStand() {
            console.log("createStand")
            this.newStand = false
            this.action({id: this.standSelected.id})
        }
    },
}
</script>

<style scoped>

</style>