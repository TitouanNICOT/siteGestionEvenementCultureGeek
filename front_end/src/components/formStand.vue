<template>
    <div>
        <v-text-field label="NomStand" v-model="nomStand"></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
<!--        utilisation d'un slot pour afficher nom et prenom du prestataire-->
        <v-select label="Prestataire" :items="listePresta" item-value="idUser" v-model="presta">
            <template v-slot:item="{item}">
                <span>{{ item.nom }} {{item.prenom}}</span>
            </template>
        </v-select>
        <v-select label="Stand" :items="listeTypeStand" item-text="libelleTypeStand" item-value="idTypeStand" v-model="typeStand"></v-select>
            <v-btn color="grey" @click="createStand">Creer Stand</v-btn>
    </div>
</template>

<script>
import {mapState,mapGetters} from "vuex";

export default {
    name: "formStand",
    data: () => {
        return {
            nomStand: "",
            description: "",
            typeStand: "",
            presta: "",
        }
    },
    computed:{
        ...mapState(["listeTypeStand"]),
        ...mapGetters(["listePresta"])
    },
    methods:{
        createStand(){
            console.log("creation stand")
            const data={
                nomStand:this.nomStand,
                typeStand:this.typeStand,
                description:this.description,
                prestataire:this.presta
            }
            console.log(data)
            this.$emit("createStand",data)
        }
    }
}
</script>

<style scoped>

</style>