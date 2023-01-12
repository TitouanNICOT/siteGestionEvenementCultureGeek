<template>
    <div class="login-container my-5">
        <h1>Inscription</h1>
        <form @submit.prevent="registerUser">
            <label for="nom">Nom :<br>
                <input type="text" v-model="nom" id="nom" name="nom" required>
            </label>
            <label for="prenom">Prénom :
                <input type="text" v-model="prenom" id="prenom" name="prenom" required>
            </label>
            <label for="username">Nom d'utilisateur :
                <input type="text" v-model="username" id="username" name="username" required>
            </label>
            <label for="email">Email :<br>
                <input type="text" v-model="email" id="email" name="email" required>
            </label>
            <label for="password">Mot de passe :
                <input type="password" v-model="password" id="password" name="password" required>
            </label>
            <label for="confirmPassword">Confirmer le mot de passe :
                <input type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" required>
            </label>
            <label for="Notif">Recevoir des notifications :
                <input type="checkbox" v-model="isNotif" id="Notif" name="Notif">
            </label>
            <br><br>
            <input type="submit" value="S'inscrire">
        </form>
    </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex";
import {roles} from "@/services/roles";
// import {mapGetters, mapMutations, mapState} from "vuex";

export default {
    name: "RegisterView",
    data() {
        return {
            nom: '',
            prenom: '',
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            idRole: 3,
            isNotif: false
        }
    },
    methods: {
        ...mapMutations(['setCurrentUser']),
        registerUser() {
            if (this.validator()) {
                axios.post('http://localhost:3000/connection/register', {
                    nom: this.nom,
                    prenom: this.prenom,
                    pseudo: this.username,
                    password: this.password,
                    email: this.email,
                    idRole: this.idRole,
                    isNotif: this.isNotif
                }).then(response => {
                    if (response.data.success) {
                        response.data.data.role = roles[response.data.data.idRole]
                        response.data.data.token = response.data.token;
                        this.setCurrentUser(response.data.data);
                        this.$cookies.set("currentUser", response.data.data, "1h");
                        this.$router.push({name: 'Accueil'});
                    } else {
                        alert(response.data.data);
                    }
                }).catch(() => {
                    alert('Une erreur est survenue lors de l\'inscription.\n veuillez réessayer ultérieurement.');
                });
            }
        },
        validator() {
            let string = '';
            let valid = true;

            if (this.password !== this.confirmPassword) {
                valid = false;
                string += 'Les mots de passe ne correspondent pas';
            }

            if (this.password.length < 8) {
                valid = false;
                if (string !== '') {
                    string += '\n';
                }
                string += 'Le mot de passe doit contenir au moins 8 caractères.';
            }

            if ([...this.email.matchAll('@')].length !== 1 || (this.email.indexOf('.') === -1 && this.email.lastIndexOf('.') < this.email.indexOf('@'))) {
                if (string !== '') {
                    string += '\n';
                }
                valid = false;
                string += 'L\'adresse mail n\'est pas valide\n';
            }

            if (string !== '') {
                alert(string);
            }
            return valid;
        }
    }
}

</script>

<style scoped>

.login-container {
    width: 300px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input[type="text"], input[type="password"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

input[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #45a049;
}

</style>