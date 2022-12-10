<template>
    <div>
        <v-text-field label="NomStand" v-model="nomStand"></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
        <v-select label="Prestataire" :items="listePresta.map(p=>p.nom+' '+p.prenom)" v-model="presta"></v-select>
        <v-select label="Stand" :items="listeTypeStand.map(t=>t.libelleTypeStand)" v-model="typeStand"></v-select>
            <v-btn color="grey" @click="createStand">Creer Stand</v-btn>
    </div>
</template>

<script>
import axios from "axios";
// import {mapState,mapGetters} from "vuex";

export default {
    name: "formStand",
    data: () => {
        return {
            nomStand: "",
            listeTypeStand: [],
            description: "",
            listePresta: [],
            typeStand: "",
            presta: "",
        }
    },
    // computed:{
    //     ...mapState(["listeTypeStands"]),
    //     ...mapGetters(["listePresta"])
    // },
    methods:{
        createStand(){
            console.log("creation stand")
            const data={
                nomStand:this.nomStand,
                typeStand:this.listeTypeStand.find(t=>t.libelleTypeStand===this.typeStand).idTypeStand,
                description:this.description,
                // nomPresta:this.presta,
                prestataire:this.listePresta.find(p=>p.nom+' '+p.prenom===this.presta).idUser,
            }
            this.$emit("createStand",data)
        }
    },
    created(){
        console.log("creation")
        axios.get("http://localhost:3000/stands/typeStand")
            .then(responce => {
                if (responce.data.success === 1)
                    this.listeTypeStand=responce.data.data
            })
        axios.get("http://localhost:3000/users?role=prestataire")
            .then(responce => {
                if (responce.data.success === 1)
                   this.listePresta=responce.data.data
            })
    }
}
</script>

<style scoped>

</style>