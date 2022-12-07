<template>
    <div>
        <v-text-field label="NomStand" v-model="nomStand"></v-text-field>
        <v-textarea label="Description" v-model="description"></v-textarea>
        <v-select label="Prestataire" :items="listePresta" v-model="presta"></v-select>
        <v-select label="Stand" :items="listeTypeStand" v-model="typeStand"></v-select>
<!--        <select style="border: black 1px solid">-->
<!--            <option v-for="(presta,index) in listePresta" :key="index" :value="index">{{presta}}</option>-->
<!--        </select><br>-->
            <v-btn color="grey" @click="createStand">Creer Stand</v-btn>
    </div>
</template>

<script>
export default {
    name: "formStand",
    data: () => {
        return {
            nomStand: "",
            typeStand: "",
            description: "",
            listePresta: ["Presta1", "Presta2", "Presta3"],
            listeTypeStand: ["boutique","exposition","autre","tournois","interview"],
            presta: "",
        }
    },
    methods:{
        createStand(){
            console.log("creation stand")
            const data={
                nomStand:this.nomStand,
                typeStand:this.typeStand,
                description:this.description,
                presta:this.presta,
            }
            this.$emit("createStand",data)
        }
    }
}
</script>

<style scoped>

</style>