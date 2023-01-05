<template>
    <div class="login-container my-5">
        <h1>Connexion</h1>
        <form @submit.prevent="login">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" v-model="username" id="username" name="username">
            <br>
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="password" id="password" name="password">
            <br>
            <input type="submit" value="Se connecter">
        </form>
        pas de compte ? <router-link to="/register">S'inscrire !</router-link>
    </div>
</template>

<script>
import axios from "axios";
import {mapMutations} from "vuex";
import {roles} from "@/services/roles";
// import {mapGetters, mapMutations, mapState} from "vuex";

export default {
    name: "LoginView",
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapMutations(['setCurrentUser']),
        login() {
            axios.post('http://localhost:3000/connection/login', {
                pseudo: this.username,
                password: this.password
            }).then(response => {
                if (response.data.success) {
                    response.data.data.role=roles.find(role=>role.id===response.data.data.idRole).name;
                    this.setCurrentUser(response.data.data);
                    this.$cookies.set("currentUser", response.data.data,"20min");
                    this.$router.push({name: 'Accueil'});
                } else {
                    alert(response.data.data);
                }
            }).catch(() => {
                alert('Mauvais identifiants');
            });
        },
        loginLocal(){ //independant de la bdd
            if (this.username === 'admin' && this.password === 'admin') {
                this.setCurrentUser({prenom: this.username, password: this.password,role: 'admin'});
                this.$router.push({name: 'Accueil'});
            } else {
                alert('Mauvais identifiants');
            }
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