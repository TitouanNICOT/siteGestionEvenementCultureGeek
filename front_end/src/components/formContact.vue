<template>
    <div>
        <v-card id="feedBack" style="display: none">
            <v-card-text id="feedBackText"></v-card-text>
        </v-card>
        <v-text-field label="Email" v-model="email" placeholder="exemple@exemple.com"></v-text-field>
        <v-text-field id="Sujet" label="Sujet" v-model="sujet" placeholder="Horaires et planning"></v-text-field>
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
            document.getElementById("feedBack").style.display = "none";
            document.getElementById("feedBack").classList.remove("error");
            document.getElementById("feedBack").classList.remove("success");
            setTimeout(async () => {
                if (this.checkForm()) {
                    await axios.post("http://localhost:3000/mail", {
                        email: this.email,
                        sujet: this.sujet,
                        message: this.message
                    }).then(response => {
                        console.log(response)
                        if (response.status === 200) {
                            this.email = "";
                            this.sujet = "";
                            this.message = "";
                            this.displayMessage("Votre message a bien été envoyé !", " success");
                        } else {
                            this.displayMessage("Une erreur est survenue lors de l'envoi du mail. Veuillez réessayer ultérieurement. Status :" + response.status + ".");
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                }
            }, 100);
        },
        updateEmail(){
            this.email = this.currentUser ? this.currentUser.email : "";
        },
        checkForm(){
            if(this.email === "" || this.sujet === "" || this.message === ""){
                this.displayMessage("Veuillez remplir tous les champs");
                return false;
            }

            if ([...this.email.matchAll('@')].length !== 1 || (this.email.indexOf('.') === -1 && this.email.lastIndexOf('.') < this.email.indexOf('@'))) {
                this.displayMessage("Veuillez entrer une adresse mail valide");
                return false;
            }

            if (this.sujet.length > 50 || this.sujet.length < 10) {
                this.displayMessage("Le sujet doit contenir entre 10 et 50 caractères");
                return false;
            }

            if (this.message.length > 1000 || this.message.length < 100) {
                this.displayMessage("Le message doit contenir entre 100 et 1000 caractères");
                return false;
            }

            return true;
        },
        displayMessage(message, className){
            if (!className) {
                className = " error";
            }
            if (className.at(0) !== " ") {
                className = " " + className;
            }

            document.getElementById("feedBackText").innerHTML = message;
            document.getElementById("feedBack").className += className;
            document.getElementById("feedBack").style.display = "block";
        }
    }
}
</script>

<style scoped>

</style>