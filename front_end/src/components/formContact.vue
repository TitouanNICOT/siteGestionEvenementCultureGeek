<template>
    <div>
        <v-text-field label="Email" v-model="email" placeholder="exemple@exemple.com"></v-text-field>
        <v-text-field label="Sujet" v-model="sujet" placeholder="Horaires et planning"></v-text-field>
        <v-textarea label="Message" v-model="message" :placeholder="phMessage"></v-textarea>
        <v-btn color="grey" @click="sendMail">Envoyer</v-btn>
    </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import axios from "axios";

export default {
    name: "formStand",
    props: {},
    data: () => {
        return {
            email: "",
            sujet: "",
            message: "",
            phMessage: "Bonjour, je souhaiterais avoir plus d'informations sur les horaires et le planning de l'événement."
        }
    },
    mounted() {
        this.updateEmail();
    },
    computed: {
        ...mapState(['currentUser']),
        ...mapGetters(['currentRole'])
    },
    methods: {
        sendMail() {
            axios.post("http://localhost:3000/mail", {
                email: this.email,
                sujet: this.sujet,
                message: this.message
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        },
        updateEmail(){
            this.email = this.currentUser ? this.currentUser.email : "";
        }
    }
}
</script>

<style scoped>

</style>